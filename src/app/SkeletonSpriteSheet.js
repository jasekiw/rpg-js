/**
 * SkeletonSpriteSheet Class
 * @param element
 * @constructor
 */
function SkeletonSpriteSheet(element)
{
    var lastTime = getTime();
    var time = getTime();
    var frame = 131;
    var lastDirection = "down";
    var speed = 100;

    this.animateUp = function()
    {
        var low = 37;
        this.animateSprite(low,6);
        lastDirection = "up"
    };

    this.animateDown = function()
    {
        var low = 1;
        this.animateSprite(low,6);
        lastDirection = "down"
    };

    this.animateLeft = function()
    {
        var low = 19;
        this.animateSprite(low,6);
        lastDirection = "left"
    };
    this.animateRight = function()
    {
        var low = 55;
        this.animateSprite(low,6);
        lastDirection = "right"
    };

    this.animateAttack = function()
    {
        var response = true;
        if(lastDirection.indexOf("up") > -1)
            response = this.animateSprite(46,8);
        else if(lastDirection.indexOf("down") > -1)
            response = this.animateSprite(10,8);
        else if(lastDirection.indexOf("left") > -1)
            response = this.animateSprite(28,8);
        else if(lastDirection.indexOf("right") > -1)
            response = this.animateSprite(64,8);
        return response;
    };
    this.animateSprite = function(number, length)
    {
        time = getTime();
        var low = number;
        var high = low + length;
        var base = low + 1;
        if((frame < low) || (frame > high)) {
            lastTime = time;
            this.changeSprite(base);
        }

        if((time - lastTime) > speed)
        {
            lastTime = time;
            frame++;
            this.changeSprite(frame);
            if(!(frame < high)) {
                this.changeSprite(base);
                return false;
            }
        }
        return true;
    };
    this.changeSprite = function(number)
    {
        frame = number;
        var numerator = number < 10 ?  "0" + number.toString() : number.toString();
        element.src = Resources.getSkeleton(numerator);
    };
    this.ResetSprite = function()
    {
        if(lastDirection.indexOf("up") > -1)
            this.changeSprite(37);
        else if(lastDirection.indexOf("down") > -1)
            this.changeSprite(1);
        else if(lastDirection.indexOf("left") > -1)
            this.changeSprite(19);
        else if(lastDirection.indexOf("right") > -1)
            this.changeSprite(55);
    };
    /**
     *
     * @returns {boolean}
     */
    this.DeathSprite = function()
    {
        var response = true;
        speed = 300;
        if(lastDirection.indexOf("up") > -1)
            response = this.animateSprite(44,1);
        else if(lastDirection.indexOf("down") > -1)
            response = this.animateSprite(8,1);
        else if(lastDirection.indexOf("left") > -1)
            response = this.animateSprite(26,1);
        else if(lastDirection.indexOf("right") > -1)
            response = this.animateSprite(62,1);
        speed = 100;
        return response;
    };

    this.getLastDirection = function()
    {
        return lastDirection;
    }
}
