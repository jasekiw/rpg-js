/**
 * KeyboardHandler Class
 * @param playerParam
 * @param characterSpriteSheetParam
 * @constructor
 */
function KeyboardHandler(playerParam, characterSpriteSheetParam) {
    var keyUp = "";
    var keyCode = "";
    var lastKeyCode = "";
    var lastTime = getTime();
    var time = getTime();
    var yawn = false;
    var player = playerParam;
    var characterSpriteSheet = characterSpriteSheetParam;
    document.addEventListener("keydown", function (e) {
        keyCode += e.keyCode + ";";
        yawn = false;
    });

    document.addEventListener("keyup", function (e) {
        lastTime = time;
        keyUp += e.keyCode + ";";
    });

    this.handleKeyCodes = function () {
        if (keyCode.indexOf("87") > -1)
            player.moveUp();
        else if (keyCode.indexOf("83") > -1)
            player.moveDown();
        else if (keyCode.indexOf("68") > -1)
            player.moveRight();
        else if (keyCode.indexOf("65") > -1)
            player.moveLeft();
        else if (keyCode.indexOf("74") > -1)
            player.attack();

        if (keyCode.length == 0 && lastKeyCode.length > 0) {
            lastKeyCode = "";
            characterSpriteSheet.ResetSprite();
        }

        var keyCodesUp = keyUp.split(";");
        for (var i = 0; i < keyCodesUp.length; i++)
            if (keyCode.indexOf(keyCodesUp[i]) > -1 && keyCodesUp[i].length > 0) {
                lastKeyCode = keyCode;
                keyCode = replaceAll(keyCodesUp[i] + ";", "", keyCode);
                keyUp = replaceAll(keyCodesUp[i] + ";", "", keyUp);
            }
    };

    this.getkeycode = function () {
        return keyCode;
    };

    this.getkeyup = function () {
        return keyUp;
    }
}

