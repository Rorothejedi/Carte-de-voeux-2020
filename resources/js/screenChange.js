/*Gère le changement d'écran et les transitions*/

const screens = [
    "#S1", 
    "#S2", 
    "#S3", 
    "#S4",
    "#S5", 
    "#S6", 
    "#S7"
];
// const lowSpeed = 1300;
// const hightSpeed = 400;
const slowSpeed = "slow";
const hightSpeed = "fast";
// let actualScreen = 0;
let actualScreen = 6;

if (actualScreen === 0)
    $(screens[actualScreen++]).fadeIn(slowSpeed);

const nextScreen = () => {
    setTimeout(() => {
        $(screens[actualScreen - 1]).fadeOut(slowSpeed,() => {
            $(screens[actualScreen++]).show();
            pathRangeSlider();
        });
    }, 300);
}

pathRangeSlider();

