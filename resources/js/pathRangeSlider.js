/* Gère l'input range */

const isChrome = (typeof window.chrome === "object" && navigator.appVersion.indexOf('Edge') === -1);

const pathRangeSlider = () => {
    let path;
    let circle;
    let countCaress = 0;
    let reverseDrag;
    
    if (actualScreen === 1) {
        console.log('S1 ok')
        path = $("#S1-path");
        circle = document.getElementById("S1-circle");
    } else if (actualScreen === 2) {
        console.log('S2 ok')
        path = $("#S2-path");
        circle = document.getElementById("S2-circle");
    } else if (actualScreen === 3) {
        console.log('S3 ok')
        path = $("#S3-path");
        circle = document.getElementById("S3-circle");
    } else if (actualScreen === 4) {
        console.log('S4 ok')
        path = $("#S4-path");
        circle = document.getElementById("S4-circle");
        reverseDrag = true;
    } else if (actualScreen === 5) {
        console.log('S5 ok')
        path = $("#S5-path");
        circle = document.getElementById("S5-circle");
    } else if (actualScreen === 6) {
        console.log('S6 ok')
        dragBall();
        path = $("#S6-path");
        circle = document.getElementById("S6-circle");
    }

    const W = path.get(0).getBoundingClientRect().width;
    console.log('cible', W)

    const pathLength = path.get(0).getTotalLength();
    // Apparition modal au bout de 7 secondes
    // const modalTimer = setTimeout(toggleModal, 7000);
    let div = document.createElement('div');
    const drag = Draggable.create(div, {
        type: 'x,y', 
        bounds: { minX: 0, maxX: pathLength },
        trigger: circle, 
        overshootTolerance: 5, 
        onDrag: update
    });
    
    function update() {
        let P = path.get(0).getPointAtLength(this.x / W * pathLength);
        
        // clearTimeout(modalTimer);

        // console.log("P.x : ",P.x)
        // console.log("P.y : ",P.y)
        // console.log("pathLength : ", pathLength)
        // console.log(W)

        console.log(P.x)
        
        if (actualScreen === 4 && reverseDrag) {
            // Direction inverse
            TweenLite.set(drag[0].target, { x: 600, y: 100, onUpdate:drag[0].update, onUpdateScope:drag[0]});
            reverseDrag = false;
        } else {
            // Direction normal
            TweenLite.set(circle, { attr: { cx: P.x, cy: P.y } });

            if (P.x > 0)
                $( ".S1-circle" ).removeClass("circleAnimation");
            if (actualScreen === 1) {
                if ((isChrome && P.x === 500) || (!isChrome && P.x >= 490)) {
                    $( "#S1-action" ).hide().css("visibility", "visible").fadeIn();
                    drag[0].disable();
                    nextScreen();
                }
            } else if (actualScreen === 2 && P.x >= 600) {
                $( "#S2-action" ).hide().css("visibility", "visible").fadeIn();
                drag[0].disable();
                nextScreen();
            } else if (actualScreen === 3) {
                if ((isChrome && P.x === 455) || (!isChrome && P.x >= 450)) {
                    drag[0].disable();
                    $( "#S3-action" ).css("visibility", "visible").fadeIn();
                    if (countCaress < 2) {
                        $('.S3-range').fadeOut(('slow'), () => {
                            $( "#S3-action" ).hide();
                            TweenLite.set(div, {x: 0, y: 0 });
                            TweenLite.set(circle, { attr: { cx: 150, cy: 275 } });
                            $('.S3-range').fadeIn('slow');
                            drag[0].enable();
                            countCaress++;
                        });
                    } else {
                        nextScreen();
                    }
                }
            } else if (actualScreen === 4 && P.x === 50) {
                drag[0].disable();
                nextScreen();
            } else if (actualScreen === 5) {
                if ((isChrome && P.x === 500) || (!isChrome && P.x >= 490)) {
                    $( "#S5-action" ).css("visibility", "visible").fadeIn();
                    drag[0].disable();
                    nextScreen();
                }
            } else if (actualScreen === 6) {
                if ((isChrome && P.x === 500) || (!isChrome && P.x >= 490)) {
                    $( "#S6-action" ).css("visibility", "visible").fadeIn();
                    drag[0].disable();
                    nextScreen();
                }
            }
        }
    };
}

const dragBall = () => {

    TweenLite.set('.ball',{ xPercent:-50, yPercent:-50 });
    Draggable.create('#forground',{
        bounds: window,
        onDrag: Update
    });

    function Update() {
        const X = this.x;
        const Y = this.y;
        const W = window.innerWidth;

        if (X < W / 5) {
            TweenLite.set('#S6-catTail',{ x: X * 0.03, y: Y * 0.05 });
        } else {
            TweenLite.set('#S6-catTail',{ y: Y * 0.05 });

        }
    };
}


function GetBox (div) {

    if (div.getBoundingClientRect) {        // Internet Explorer, Firefox 3+, Google Chrome, Opera 9.5+, Safari 4+
        var rect = div.outerWith;
        x = rect.left;
        y = rect.top;
        w = rect.right - rect.left;
        h = rect.bottom - rect.top;

        console.log(" Left: " + x + "\n Top: " + y + "\n Width: " + w + "\n Height: " + h);
    }
    else {
        alert ("Your browser does not support this example!");
    }
}