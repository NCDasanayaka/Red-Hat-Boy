var jumpSound = new Audio("resources/jump.mp3");
var runSound = new Audio("resources/run.mp3");

runSound.loop = true;

function keyCheck(event) {

    var keyCode = event.which;

    if (keyCode == 32) {
        // space

        if (boyJumpAnimationId == 0) {

            clearInterval(boyRunAnimationId);

            runSound.pause();
            runSound.currentTime = 0;

            boyRunAnimationId = 0;
            boyRunImageNumber = 1;

            boyJumpAnimationId = setInterval(boyJumpAnimation, 100);
            jumpSound.play();
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }
    if (keyCode == 39) {
        // right arrow

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }

        if (boyRunAnimationId == 0) {
            boyRunAnimationId = setInterval(boyRunAnimation, 100);
            runSound.play();
        }

        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }
}
var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

function moveBackground() {

    backgroundImagePositionX = backgroundImagePositionX - 20;

    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
}

var boyRunImageNumber = 1;
var boyRunAnimationId = 0;

var score = 0;

function boyRunAnimation() {

    boyRunImageNumber = boyRunImageNumber + 1;

    score = score + 1;

    document.getElementById("score").innerHTML = score;

    if (boyRunImageNumber == 9) {
        boyRunImageNumber = 1;
    }

    document.getElementById("boy").src = "resources/Run (" + boyRunImageNumber + ").png"
}
var boyJumpImageNumber = 1;
var boyJumpAnimationId = 0;

var boyMarginTop = 605;

function boyJumpAnimation() {

    boyJumpImageNumber = boyJumpImageNumber + 1;

    if (boyJumpImageNumber <= 7) {

        boyMarginTop = boyMarginTop - 20;

        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (boyJumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 20;

        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (boyJumpImageNumber == 13) {

        clearInterval(boyJumpAnimationId);
        jumpSound.pause();
        jumpSound.currentTime = 0;

        boyJumpAnimationId = 0;
        boyJumpImageNumber = 1;

        boyRunAnimationId = setInterval(boyRunAnimation, 100);
        runSound.play();

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }
    }

    document.getElementById("boy").src = "resources/Jump (" + boyJumpImageNumber + ").png"

}
var boyDeadImageNumber = 1;
var boyDeadAnimationId = 0;

var deadSound = new Audio("resources/dead.mp3");

function boyDeadAnimation() {

    boyDeadImageNumber = boyDeadImageNumber + 1;
    if (boyDeadImageNumber == 11) {

        clearInterval(boyDeadAnimationId);
        boyDeadImageNumber = 10;
    }

    document.getElementById("boy").src = "resources/Dead (" + boyDeadImageNumber + ").png";
}

var boxMarginLeft = 1500;

function createBoxes() {

    for (var i = 0; i < 10; i++) {

        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        box.style.marginLeft = boxMarginLeft + "px";
        boxMarginLeft = boxMarginLeft + 500;

        document.getElementById("background").appendChild(box);
    }

}

var boxAnimationId = 0;

function boxAnimation() {

    for (var i = 0; i < 10; i++) {

        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;

        box.style.marginLeft = newMarginLeft + "px";

        // alert(newMarginLeft);

        if (newMarginLeft >= 300 & newMarginLeft <= 400) {

            if (boyMarginTop >= 595) {

                clearInterval(boxAnimationId);

                clearInterval(boyRunAnimationId);
                runSound.pause();
                boyRunAnimationId = -1;

                clearInterval(boyJumpAnimationId);
                jumpSound.pause();
                boyJumpAnimationId = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                boyDeadAnimationId = setInterval(boyDeadAnimation, 100);
                deadSound.play();
            }


        }

    }
}