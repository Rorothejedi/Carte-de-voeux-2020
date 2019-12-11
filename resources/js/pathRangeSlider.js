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
const W = path.getBBox().width;
const pathLength = path.getTotalLength();

const drag = Draggable.create(document.createElement('div'), {
    type: 'x', 
    bounds: { minX: 0, maxX: W },
    trigger: circle, 
    overshootTolerance: 50, 
    onDrag: update
});

function update() {
    const P = path.getPointAtLength(this.x / W * pathLength);

    TweenLite.set(circle, { attr: { cx: P.x, cy: P.y } });
    if (P.x > 0)
        $( ".circle" ).removeClass("circleAnimation");
    if (P.x === 450) {
        $( "#actionOk" ).hide().css("visibility", "visible").fadeIn();
        drag[0].disable();
        $( "#nextTest" ).click();
    }
};