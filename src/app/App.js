
/**
 * App Class
 * @constructor
 */
function App() {
    function constructor() {
        this.map = new Map(25,25);
        var characterSpriteSheet = new CharacterSpriteSheet(document.getElementById("character"));
        this.player = new Player(document.getElementById("character"), this.map, characterSpriteSheet);
        this.kbHandler = new KeyboardHandler(this.player, characterSpriteSheet );
        this.monsters = [];
        this.monsters.push(new Monster(1,3,3, this.map));
        //player.getAutomation().addJob(20,player.getLocationY(),1000);
        //player.getAutomation().addJob(-1,20,1000);
        //player.getAutomation().addJob(0,-1,1000);
        //player.getAutomation().addJob(-1,0,1000);
        disableDragging();
        document.getElementById("loading").style.display = "none";
        document.getElementById("game").style.display = "block";
        update();
    }

    function disableDragging() {
        $('img').on('dragstart', function(e) { e.preventDefault(); });
        document.addEventListener("selectstart", function() { return false; });
        document.addEventListener("mousedown", function() { return false; });
    }
    function update()
    {
        this.kbHandler.handleKeyCodes();
        this.player.update();
        for(var i =0; i < this.monsters.length; i++)
            if(this.monsters[i].update())
                this.monsters.splice(i,1);
        setTimeout(function(){ update(); }, 30);
    }
    constructor();
}
new App();