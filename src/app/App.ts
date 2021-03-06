import {CharacterSpriteSheet} from "./CharacterSpriteSheet";
import {Player} from "./Player";
import {Monster} from "./Monster";
import {KeyboardHandler} from "./KeyboardHandler";
import {Map} from "./Map";

class App {
    private map : Map;
    private player : Player;
    private kbHandler : KeyboardHandler;
    private monsters : Monster[] = [];
     constructor() {
        this.map = new Map(15, 15);
        var characterSpriteSheet = new CharacterSpriteSheet(document.getElementById("character"));
        this.player = new Player(document.getElementById("character"), this.map, characterSpriteSheet);
        this.kbHandler = new KeyboardHandler(this.player, characterSpriteSheet);
        for(let i = 0; i < this.map.getWidth() / 2; i++)
        {
            let xLocation = Math.floor(Math.random() * (this.map.getWidth() - 1));
            let yLocation = Math.floor(Math.random() * (this.map.getHeight() - 1));
            this.monsters.push(new Monster(1, xLocation, yLocation, this.map));
        }
        // this.player.getAutomation().addJob(20,this.player.getLocationY(),1000);
        // this.player.getAutomation().addJob(-1,20,1000);
        // this.player.getAutomation().addJob(0,-1,1000);
        // this.player.getAutomation().addJob(-1,0,1000);
        this.disableDragging();
        document.getElementById("loading").style.display = "none";
        document.getElementById("game").style.display = "block";
        this.update();
    }

    disableDragging() {
        $('img').on('dragstart', e => e.preventDefault());
        document.addEventListener("selectstart",  () => false);
        document.addEventListener("mousedown", () => false);
    }


    update() {
        this.kbHandler.handleKeyCodes();
        this.player.update();
        for (var i = 0; i < this.monsters.length; i++)
            if (this.monsters[i].update())
                this.monsters.splice(i, 1);
        setTimeout(() => this.update(), 30);
    }
}
new App();