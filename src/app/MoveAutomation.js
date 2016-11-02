/**
 * Created with JetBrains WebStorm.
 * User: Jason
 * Date: 1/6/15
 * Time: 7:25 PM
 * To change this template use File | Settings | File Templates.
 */
function MoveAutomation(Player, Map) {
    var destinationX = 0;
    var destinationY = 0;
    var automationOnX = false;
    var automationOnY = false;
    var jobs = [];
    var lastTime = getTime();
    var time = getTime();
    var preparingX = false;
    var preparingY = false;

    this.addJob = function (x, y, pause) {
        jobs.push(new AutomationJob(x, y, pause));
    };

    this.automate = function () {
        if (jobs.length > 0 && !preparingX && !preparingY && !automationOnX && !automationOnY) {
            if (jobs[0].getX() != (Player.getLocationX()) && jobs[0].getX() != -1) {
                destinationX = jobs[0].getX();
                preparingX = true;
                lastTime = getTime();
            }
            if (jobs[0].getY() != (Player.getLocationY()) && jobs[0].getY() != -1) {
                destinationY = jobs[0].getY();
                preparingY = true;
                lastTime = getTime();
            }
        }

        if (preparingX || preparingY) {
            time = getTime();
            if ((time - lastTime) > jobs[0].getPauseMilliseconds()) {
                if (preparingX) {
                    preparingX = false;
                    automationOnX = true;
                }
                if (preparingY) {
                    preparingY = false;
                    automationOnY = true;
                }
            }
        }
        var didJob = false;
        if (automationOnX) {
            if ((destinationX + 0.5) > (Player.getLocationX() + player.getOffsetX()))
                this.automateRight();
            else if ((destinationX + 0.5) < (Player.getLocationX() + player.getOffsetX()))
                this.automateLeft();
            didJob = true;
        }
        else if (automationOnY) {
            if ((destinationY + 0.5) > (Player.getLocationY() + player.getOffsetY()))
                this.automateDown();
            else if ((destinationY + 0.5) < (Player.getLocationY() + player.getOffsetY()))
                this.automateUp();
            didJob = true;
        }

        if (didJob && !automationOnY && !automationOnX) {
            jobs.splice(0, 1);
            return true;
        }
        else
            return false;


    };


    this.automateRight = function () {
        if ((Player.getLocationX() + Player.getOffsetX() + .1) >= (destinationX + 0.5)) {
            Player.setLocation((destinationX + 0.5), Player.getLocationY() + Player.getOffsetY());
            automationOnX = false;
            Player.getAnimation().ResetSprite();
            return true;
        }
        else {
            Player.moveRight();
            return false;
        }
    };

    this.automateLeft = function () {
        if ((Player.getLocationX() + Player.getOffsetX() - .1) <= (destinationX + 0.5)) {
            Player.setLocation((destinationX + 0.5), Player.getLocationY() + Player.getOffsetY());
            automationOnX = false;
            Player.getAnimation().ResetSprite();

            return true;
        }
        else {
            Player.moveLeft();
            return false;
        }

    };
    this.automateUp = function () {
        if ((Player.getLocationY() + Player.getOffsetY() - .1) <= (destinationY + 0.5)) {
            Player.setLocation(Player.getLocationX() + Player.getOffsetX(), (destinationY + 0.5));
            automationOnY = false;
            Player.getAnimation().ResetSprite();
            return true;
        }
        else {
            Player.moveUp();
            return false;
        }

    };

    this.automateDown = function () {
        if ((Player.getLocationY() + Player.getOffsetY() + .1) >= (destinationY + 0.5)) {
            Player.setLocation(Player.getLocationX() + Player.getOffsetX(), (destinationY + 0.5));
            automationOnY = false;
            Player.getAnimation().ResetSprite();
            return true;
        }
        else {
            Player.moveDown();
            return false;
        }
    }
}
