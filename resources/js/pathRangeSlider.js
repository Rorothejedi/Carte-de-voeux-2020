/* Gère l'input range */

// const D = document.createElement('div');
// TweenMax.set('svg', { overflow: "visible" });
// TweenMax.set('#circle', { x: 10, y: 80 });

// const tl = new TimelineMax({ paused: true })
//     .from("#path", 1, {
//         ease: "elastic"
//     })
//     .to('#circle', 1, {
//         bezier: {
//             type: "quadratic",
//             values: [{ x: 10, y: 80 }, { x: 150, y: 0 }, { x: 300, y: 80 }]
//         },
//         ease: Linear.easeNone
//     }, 0);

// Draggable.create(D, {
//     trigger: "#circle",
//     type: 'x',
//     bounds: { minX: 0, maxX: 300 },
//     onDrag: Update
// });

// function Update() {
//     tl.progress(Math.abs(this.x / 300));
// };

const path = document.getElementById("path");
const circle = document.getElementById("circle");
const W = path.getBoundingClientRect().width;
const pathLength = path.getTotalLength();

const drag = Draggable.create(document.createElement('div'), {
    type: 'x', 
    bounds: { minX: 0, maxX: pathLength },
    trigger: circle, 
    overshootTolerance: 5, 
    onDrag: update
});

function update() {
    const P = path.getPointAtLength(this.x / W * pathLength);

    // console.log("P.x : ",P.x)
    // console.log("pathLength : ", pathLength)
    // console.log(W)
    TweenLite.set(circle, { attr: { cx: P.x, cy: P.y } });
    if (P.x > 0)
        $( ".circle" ).removeClass("circleAnimation");
    if (P.x >= 500) {
        $( "#SX-action" ).hide().css("visibility", "visible").fadeIn();
        drag[0].disable();
        $( "#nextTest" ).click();
    }
};