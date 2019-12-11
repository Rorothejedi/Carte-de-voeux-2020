/*Gère le changement d'écran et les transitions*/

const screens = [
    "#firstScreen", 
    "#secondScreen", 
    "#thirdScreen", 
    "#fourthScreen",
    "#fifthScreen", 
    "#sixthScreen", 
    "#lastScreen"
];
// const lowSpeed = 1300;
// const hightSpeed = 400;
const slowSpeed = "slow";
const hightSpeed = "fast";
let i = 0;

// if (i === 0)
//     $(screens[i++]).fadeIn(slowSpeed);


// // A changer en fonction

// $( "#nextTest" ).click(() => {
//     $(screens[i - 1]).fadeOut((i === 4) ? hightSpeed : slowSpeed, () => {
//         $(screens[i++]).fadeIn((i === 5) ? hightSpeed : slowSpeed);
//     });
// });

if (i === 0)
    $(screens[i++]).fadeIn(slowSpeed);


// A changer en fonction

$( "#nextTest" ).click(() => {
    setTimeout(() => {
        $(screens[i - 1]).fadeOut(slowSpeed,() => {
            $(screens[i++]).show();
        });
    }, 300);
});

