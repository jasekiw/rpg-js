import {replaceAll, getTime} from "./Util";
import {Player} from "./Player";
import {CharacterSpriteSheet} from "./CharacterSpriteSheet";
/**
 * KeyboardHandler Class
 * @param playerParam
 * @param characterSpriteSheetParam
 * @constructor
 */
export class KeyboardHandler {
    private keyUp = "";
    private keyCode = "";
    private lastKeyCode = "";
    private lastTime = getTime();
    private time = getTime();
    private yawn = false;
    private player : Player;
    private characterSpriteSheet : CharacterSpriteSheet;

    constructor(player : Player, characterSpriteSheet : CharacterSpriteSheet) {
        this.player = player;
        this.characterSpriteSheet = characterSpriteSheet;
        document.addEventListener("keydown",  (e) => {
            this.keyCode += e.keyCode + ";";
            this.yawn = false;
        });

        document.addEventListener("keyup", (e) => {
            this.lastTime = this.time;
            this.keyUp += e.keyCode + ";";
        });
    }

    handleKeyCodes() {
        if (this.keyCode.indexOf("87") > -1)
            this.player.moveUp();
        else if (this.keyCode.indexOf("83") > -1)
            this.player.moveDown();
        else if (this.keyCode.indexOf("68") > -1)
            this.player.moveRight();
        else if (this.keyCode.indexOf("65") > -1)
            this.player.moveLeft();
        else if (this.keyCode.indexOf("74") > -1)
            this.player.attack();

        if (this.keyCode.length == 0 && this.lastKeyCode.length > 0) {
            this.lastKeyCode = "";
            this.characterSpriteSheet.ResetSprite();
        }

        var keyCodesUp = this.keyUp.split(";");
        for (var i = 0; i < keyCodesUp.length; i++)
            if (this.keyCode.indexOf(keyCodesUp[i]) > -1 && keyCodesUp[i].length > 0) {
                this.lastKeyCode = this.keyCode;
                this.keyCode = replaceAll(keyCodesUp[i] + ";", "", this.keyCode);
                this.keyUp = replaceAll(keyCodesUp[i] + ";", "", this.keyUp);
            }
    }

    getkeycode() {
        return this.keyCode;
    }

    getkeyup() {
        return this.keyUp;
    }
}

