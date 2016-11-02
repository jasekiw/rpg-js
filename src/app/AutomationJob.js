/**
 * Created with JetBrains WebStorm.
 * User: Jason
 * Date: 1/6/15
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
function AutomationJob(xParam, yParam, pauseMillisecondsParam) {
    var pauseMilliseconds = pauseMillisecondsParam;
    var x = xParam;
    var y = yParam;
    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };
    this.getPauseMilliseconds = function () {
        return pauseMilliseconds;
    }
}
