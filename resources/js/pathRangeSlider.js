/* Gère l'input range */

const isChrome = (typeof window.chrome === "object" && navigator.appVersion.indexOf('Edge') === -1);
let modalTimer;
let fadeAfterTouchBall = false;

const pathRangeSlider = () => {
    let path;
    let circle;
    let countCaress = 0;
    let reverseDrag;
    
    if (actualScreen === 1) {
        path = $("#S1-path");
        circle = document.getElementById("S1-circle");
    } else if (actualScreen === 2) {
        path = $("#S2-path");
        circle = document.getElementById("S2-circle");
    } else if (actualScreen === 3) {
        path = $("#S3-path");
        circle = document.getElementById("S3-circle");
    } else if (actualScreen === 4) {
        path = $("#S4-path");
        circle = document.getElementById("S4-circle");
        reverseDrag = true;
    } else if (actualScreen === 5) {
        path = $("#S5-path");
        circle = document.getElementById("S5-circle");
    } else if (actualScreen === 6) {
        if (!fadeAfterTouchBall) {
            setTimeout(() => {
                dragBall();
                $( '#forground' ).addClass('ballAnimation');
            }, 2000);
            fadeAfterTouchBall = true;
        }
        path = $("#S6-path");
        circle = document.getElementById("S6-circle");
    }

    const W = path.get(0).getBoundingClientRect().width;
    const pathLength = path.get(0).getTotalLength();
    // Apparition modal au bout de 8 secondes
    modalTimer = setTimeout(toggleModal, 8000);
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
        

        clearTimeout(modalTimer);
        // console.log("P.x : ", P.x)  
        if (actualScreen === 4 && reverseDrag) {
            // Direction inverse
            TweenLite.set(drag[0].target, { x: 600, y: 100, onUpdate:drag[0].update, onUpdateScope:drag[0]});
            reverseDrag = false;
        } else {
            // Direction normal
            TweenLite.set(circle, { attr: { cx: P.x, cy: P.y } });

            if (actualScreen === 1) {
                if (P.x > 0)
                    $( ".S1-circle" ).removeClass("circleAnimation");
                if ((isChrome && P.x === 500) || (!isChrome && P.x >= 490)) {
                    $( "#S1-action" ).hide().css("visibility", "visible").fadeIn();
                    drag[0].disable();
                    nextScreen();
                }
            } else if (actualScreen === 2) {
                if (P.x > 0)
                    $( ".S2-circle" ).removeClass("circleAnimation");
                if (P.x >= 600) {
                    $( "#S2-action" ).hide().css("visibility", "visible").fadeIn(() => {
                        $("#S2-action").fadeOut();
                    });
                    drag[0].disable();
                    $( '.S2-rangeFade' ).toggleClass('delay-2s').toggleClass('fadeIn').toggleClass('fadeOut');
                    $( '#rrr' ).fadeIn();
                    $( '.S2-catTail ').addClass('S2-animCatTail');
                    setTimeout(() => {
                        nextScreen();
                    }, 3000);
                }
            } else if (actualScreen === 3) {
                if (P.x > 0)
                    $( ".S3-circle" ).removeClass("circleAnimation");
                if ((isChrome && P.x === 455) || (!isChrome && P.x >= 450)) {
                    drag[0].disable();
                    $( "#S3-action" ).css("visibility", "visible").fadeIn();
                    $( '.S3-range' ).removeClass('delay-2s').removeClass('fadeIn');
                    if (countCaress === 0) {
                        $( '#rrr2' ).show(() => {
                            $( '.S2-catTail ').removeClass('S2-animCatTail');
                            $( '.S3-catTail' ).addClass('S3-animCatTail');
                            $( '.rrrOne2' ).fadeIn(() => {
                                modalTimer = setTimeout(toggleModal, 7000);
                            });
                        });
                    } else if (countCaress === 1) {
                        $( '.rrrTwo2' ).fadeIn(() => {
                            modalTimer = setTimeout(toggleModal, 6000);
                        });
                    } else if (countCaress === 2) {
                        $( '.rrrThree2' ).fadeIn();
                    }
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
                        $( '.S3-range').toggleClass('fadeOut');
                        setTimeout(() => {
                            nextScreen();
                        }, 1000);
                    }
                }
            } else if (actualScreen === 4) {
                $( ".S4-circle" ).removeClass("circleAnimation");
                if (P.x === 50) {
                    drag[0].disable();
                    nextScreen();
                }
            } else if (actualScreen === 5) {
                $( ".S5-circle" ).removeClass("circleAnimation");
                if ((isChrome && P.x === 500) || (!isChrome && P.x >= 490)) {
                    $( "#S5-action" ).css("visibility", "visible").fadeIn();
                    drag[0].disable();
                    nextScreen();
                }
            } else if (actualScreen === 6) {
                $( ".S6-circle" ).removeClass("circleAnimation");
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
    let fadePaw = false;
    let touchBall = false;

    TweenLite.set('.ball',{ xPercent: -50, yPercent: -50 });
    Draggable.create('#forground',{
        bounds: window,
        onDrag: Update
    });

    function Update() {
        const X = this.x;
        const Y = this.y;
        const W = window.innerWidth;

        clearTimeout(modalTimer);
        if (!fadePaw) {
            $( '#S6-catTail' ).removeClass('S6-transitionFade');
            fadePaw = true;
        }
        if (!touchBall) {
            $( '#forground' ).removeClass('ballAnimation');
            $( '#S6-after' ).fadeIn();
            pathRangeSlider();
            touchBall = true;
        }
        if (X < W / 5)
            TweenLite.set('#S6-catTail',{ x: X * 0.03, y: Y * 0.05 });
        else
            TweenLite.set('#S6-catTail',{ y: Y * 0.05 });
    };
}