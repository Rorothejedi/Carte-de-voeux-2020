/* Gère l'input range */

const pathRangeSlider = () => {
    let path;
    let circle;
    let countCaress = 0;
    
    if (actualScreen === 1) {
        path = document.getElementById("S1-path");
        circle = document.getElementById("S1-circle");
    } else if (actualScreen === 2) {
        path = document.getElementById("S2-path");
        circle = document.getElementById("S2-circle");
    } else if (actualScreen === 3) {
        path = document.getElementById("S3-path");
        circle = document.getElementById("S3-circle");
    }
    
    const W = path.getBoundingClientRect().width;
    const pathLength = path.getTotalLength();
    // Apparition modal au bout de 7 secondes
    // const modalTimer = setTimeout(toggleModal, 7000);
    let div = document.createElement('div')
    const drag = Draggable.create(div, {
        type: 'x,y', 
        bounds: { minX: 0, maxX: pathLength },
        trigger: circle, 
        overshootTolerance: 5, 
        onDrag: update
    });
    
    function update() {
        let P = path.getPointAtLength(this.x / W * pathLength);

        // clearTimeout(modalTimer);

        // console.log("P.x : ",P.x)
        // console.log("P.y : ",P.y)
        // console.log("pathLength : ", pathLength)
        // console.log(W)
        TweenLite.set(circle, { attr: { cx: P.x, cy: P.y } });
        if (P.x > 0)
            $( ".S1-circle" ).removeClass("circleAnimation");
        if (actualScreen === 1 && P.x >= 500) {
            $( "#S1-action" ).hide().css("visibility", "visible").fadeIn();
            drag[0].disable();
            $( "#nextTest" ).click();
        } else if (actualScreen === 2 && P.x >= 600) {
            $( "#S2-action" ).hide().css("visibility", "visible").fadeIn();
            drag[0].disable();
            $( "#nextTest" ).click();
        } else if (actualScreen === 3 && P.x === 455) {
            // ou === 455 A tester
            drag[0].disable();
            $( "#S3-action" ).css("visibility", "visible").fadeIn();
            if (countCaress < 2) {
                $('.S3-range').fadeOut(('slow'), () => {
                    $( "#S3-action" ).hide();
                    TweenLite.set(div, {x: 0, y: 0 });
                    TweenLite.set(circle, { attr: { cx: 150, cy: 275 } });
                    $('.S3-range').fadeIn();
                    drag[0].enable('slow');
                    countCaress++;
                });
            } else {
                $( "#nextTest" ).click();
            }
        }
    };

}
