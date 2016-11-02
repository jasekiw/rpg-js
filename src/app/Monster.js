/**
 * Created with JetBrains WebStorm.
 * User: Jason
 * Date: 1/1/15
 * Time: 11:39 PM
 * To change this template use File | Settings | File Templates.
 */
function Monster(levelParam, lx, ly, mapParam) {

    this.getXRelativeToScreen = function () {
        var realX = getLeftOfElement(document.getElementById("img" + locationX + ";" + locationY));
        realX = realX + offsetX;
        return realX;
    };
    this.getYRelativeToScreen = function () {
        var realY = getTopOfElement(document.getElementById("img" + locationX + ";" + locationY));
        realY += offsetY;
        return realY;
    };
    this.updatePosition = function () {
        element.style.left = (this.getXRelativeToScreen() - 50).toString() + 'px';
        element.style.top = (this.getYRelativeToScreen() - 100).toString() + 'px';
    };

    this.addToScreen = function () {

        var ni = document.getElementById('gameViewer');
        var newdiv = document.createElement('img');
        var divIdName = 'skeleton-' + id;
        newdiv.setAttribute('id', divIdName);
        newdiv.setAttribute('src', Resources.getSkeleton("01"));
        newdiv.setAttribute('width', '100px');
        newdiv.setAttribute('height', '100px');
        newdiv.style.position = 'absolute';
        newdiv.style.left = "" + this.getXRelativeToScreen().toString() + 'px';
        newdiv.style.top = "" + this.getYRelativeToScreen().toString() + 'px';
        ni.appendChild(newdiv);
        return newdiv;
    };

    var level = 1;
    var experience = 0;
    var hp = level * 100;
    var alive = true;
    var map = mapParam;
    var offsetX = (map.getTileWidth() / 2);
    var offsetY = (map.getTileHeight() / 2);
    var automationComplete = true;
    var automation = new MoveAutomation(this, map);
    var time = getTime();
    var lastTime = getTime();
    var status = "idle";
    var locationX = lx;
    var locationY = ly;
    var id = map.addEnemy(this);
    var element = this.addToScreen();
    var skeletonSpriteSheet = new SkeletonSpriteSheet(element);
    var attacking = false;

    this.getAlive = function() {
        return alive;
    };
    this.getId = function() {
        return id;
    };

    this.getAutomation = function() {
        return automation;
    };
    this.getAnimation = function() {
        return skeletonSpriteSheet;
    };

    this.update = function () {
        if (alive) {
            if ((map.getPlayerLocationX() - locationX <= 1 && map.getPlayerLocationX() - locationX >= -1) &&
                (map.getPlayerLocationY() - locationY <= 1 && map.getPlayerLocationY() - locationY >= -1)) {
                attacking = true;
            }
            if (attacking)
                this.attack();
            automationComplete = automation.automate();
        }
        else {
            var deathCompleted = !skeletonSpriteSheet.DeathSprite();
            if (deathCompleted) {
                map.removeEnemy(id);
                var elem = document.getElementById("skeleton-" + id);
                elem.parentNode.removeChild(elem);
            }
            return deathCompleted;
        }
        return false; // return true to dispose of object
    };
    this.getLevel = function() {
        return level;
    };

    this.healFull = function() {
        hp = level * 100;
    };

    this.heal = function (number) {
        hp += number;
    };
    this.takeDamage = function (number) {
        hp = hp - number < 0 ? 0 : hp - number;
        ChatConsole.LogThis("You hit the monster with " + number + " damage. Monster's health: " + hp);
        if (hp <= 0) {
            alive = false;
            ChatConsole.LogThis("You killed the monster!");
        }
    };

    this.attack = function () {
        var attackDone = !skeletonSpriteSheet.animateAttack();
        if (attackDone) {
            if ((map.getPlayerLocationX() - locationX <= 1 && map.getPlayerLocationX() - locationX >= -1) &&
                (map.getPlayerLocationY() - locationY <= 1 && map.getPlayerLocationY() - locationY >= -1)) {
                this.attackEnemy(map.getPlayer());
            }
            else {
                attacking = false;
                skeletonSpriteSheet.ResetSprite();
            }
        }
    };

    this.attackEnemy = function (Player) {
        if (Player.getAlive()) {
            var damage = Math.round(Math.random() * (level * 30));
            var blockChance = Player.getLevel() / (level * 2);
            if (!((blockChance * 100) > (Math.random() * 100)))
                Player.takeDamage(damage);
            else
                ChatConsole.LogThis("You blocked the attack!");
        }
    };

    this.setLocationOnScreen = function (x, y) {
        element.style.top = y + "px";
        element.style.left = x + "px";
    };

    this.setLocation = function (x, y) {
        locationX = x;
        locationY = y;
    };
    this.moveUp = function () {
        skeletonSpriteSheet.animateUp();
        map.setPlayerLocation(this.getLocationX() + this.getOffsetX(), this.getLocationY() + this.getOffsetY() - .1);
        status = "moving-up";
    };
    this.moveDown = function () {
        skeletonSpriteSheet.animateDown();
        map.setPlayerLocation(this.getLocationX() + this.getOffsetX(), this.getLocationY() + this.getOffsetY() + .1);
        status = "moving-down";
    };
    this.moveRight = function () {
        skeletonSpriteSheet.animateRight();
        map.setPlayerLocation(this.getLocationX() + this.getOffsetX() + .1, this.getLocationY() + this.getOffsetY());
        status = "moving-right";
    };
    this.moveLeft = function () {

        skeletonSpriteSheet.animateLeft();
        map.setPlayerLocation(this.getLocationX() + this.getOffsetX() - .1, this.getLocationY() + this.getOffsetY());
        status = "moving-left";
    };

    this.getLocationX = function () {
        return locationX;
    };
    this.getLocationY = function () {
        return locationY;
    };
    this.getOffsetX = function () {
        return offsetX;
    };
    this.getOffsetY = function () {
        return offsetY;
    };
}

