/**
 * CharacterSpriteSheet Class
 * @param element
 * @constructor
 */
function CharacterSpriteSheet(element) {
    var lastTime = getTime();
    var time = getTime();
    var frame = 131;
    var lastDirection = "down";
    var speed = 100;

    this.animateUp = function () {
        var low = 105;
        this.animateSprite(low, 8);
        lastDirection = "up"
    };
    this.animateDown = function () {
        var low = 131;
        this.animateSprite(low, 8);
        lastDirection = "down"
    };
    this.animateLeft = function () {
        var low = 118;
        this.animateSprite(low, 8);
        lastDirection = "left"
    };
    this.animateRight = function () {

        var low = 144;
        this.animateSprite(low, 8);
        lastDirection = "right"
    };
    this.animateYawn = function () {
        var response = true;
        if (lastDirection.indexOf("up") > -1)
            response = this.animateSprite(1, 6);
        else if (lastDirection.indexOf("down") > -1)
            response = this.animateSprite(27, 6);
        else if (lastDirection.indexOf("left") > -1)
            response = this.animateSprite(14, 6);
        else if (lastDirection.indexOf("right") > -1)
            response = this.animateSprite(40, 6);
        return response;
    };
    this.animateAttack = function () {
        var response = false;
        if (lastDirection.indexOf("up") > -1)
            response = this.animateSprite(157, 5);
        else if (lastDirection.indexOf("down") > -1)
            response = this.animateSprite(183, 5);
        else if (lastDirection.indexOf("left") > -1)
            response = this.animateSprite(170, 5);
        else if (lastDirection.indexOf("right") > -1)
            response = this.animateSprite(196, 5);

        return response;
    };
    this.animateSprite = function (number, length) {
        time = getTime();
        var low = number;
        var high = low + length;
        var base = low + 1;
        if ((frame < low) || (frame > high)) {
            lastTime = time;
            this.changeSprite(base);
        }

        if ((time - lastTime) > speed) {
            lastTime = time;
            frame++;
            this.changeSprite(frame);
            if (!(frame < high)) {
                this.changeSprite(base);
                return false;
            }
        }
        return true;
    };
    this.changeSprite = function (number) {
        frame = number;
        var numerator = number < 10 ? "0" + number.toString() : number.toString();
        element.src = Resources.getCharacter(numerator);
    };
    this.ResetSprite = function () {
        if (lastDirection.indexOf("up") > -1)
            this.changeSprite(106);
        else if (lastDirection.indexOf("down") > -1)
            this.changeSprite(131);
        else if (lastDirection.indexOf("left") > -1)
            this.changeSprite(118);
        else if (lastDirection.indexOf("right") > -1)
            this.changeSprite(144);
    };
    this.getLastDirection = function () {
        return lastDirection;
    }

}


