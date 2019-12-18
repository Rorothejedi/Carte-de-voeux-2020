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
let actualScreen = 3;

if (actualScreen === 0)
    $(screens[actualScreen++]).fadeIn(slowSpeed);


// // A changer en fonction

// $( "#nextTest" ).click(() => {
//     $(screens[i - 1]).fadeOut((i === 4) ? hightSpeed : slowSpeed, () => {
//         $(screens[i++]).fadeIn((i === 5) ? hightSpeed : slowSpeed);
//     });
// });

// 


// A changer en fonction

$( "#nextTest" ).click(() => {
    setTimeout(() => {
        $(screens[actualScreen - 1]).fadeOut(slowSpeed,() => {
            $(screens[actualScreen++]).show();
            pathRangeSlider();
        });
    }, 300);
});

pathRangeSlider();

