/**
 * The Map Class
 * @param width
 * @param height
 * @constructor
 */
function Map(width, height) {
    var tileWidth = 100;
    var tileHeight = 100;
    var initialLocationX = Math.round(((window.innerWidth / 2)));
    var initialLocationY = Math.round(((window.innerHeight / 2)));
    var enemies = [];
    var player;

    for (var x = 0; x < width; x++)
        for (var y = 0; y < height; y++)
            addElementBackground(x, y);


    this.addPlayer = function (Player) {
        player = Player;
    };

    this.getPlayer = function () {
        return player
    };

    this.addEnemy = function (enemy) {
        enemies.push(enemy);
        return enemies.length - 1;
    };

    this.getEnemyIn = function (x, y) {
        for (var i = 0; i < enemies.length; i++) {

            if (enemies[i].getLocationX() == x && enemies[i].getLocationY() == y) {
                return enemies[i];
            }


        }
        return null;
    };
    this.removeEnemy = function (id) {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].getId() == id) {
                enemies.splice(i, 1);
            }
        }
    };
    this.getTileWidth = function () {
        return tileWidth;
    };
    this.getTileHeight = function () {
        return tileHeight;
    };

    this.setPlayerLocation = function (moveX, moveY) {
        var left = initialLocationX;
        var top = initialLocationY;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var elem = document.getElementById('img' + x + ';' + y);
                elem.style.left = (x * 100) + (moveX * -100) + left + "px";
                elem.style.top = (y * 100) + (moveY * -100) + top + "px";
            }
        }
        for (var i = 0; i < enemies.length; i++)
            enemies[i].updatePosition();

    };
    this.setPlayerTile = function (moveX, moveY) {
        var left = initialLocationX;
        var top = initialLocationY;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {


                var elem = document.getElementById('img' + x + ';' + y);
                elem.style.left = (x * 100) + (moveX * -100) + left - (tileWidth / 2) + "px";
                elem.style.top = (y * 100) + (moveY * -100) + top - (tileHeight / 2) + "px";

                //elem.style.top = top + "px";
                //elem.style.left = left + "px";
            }
        }
    };

    this.getPlayerLocationX = function () {
        var left = initialLocationX;
        var top = initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return Math.floor((Number(elem.style.left.substring(0, elem.style.left.indexOf('px'))) - left) / -100)
    };
    this.getPlayerOffsetX = function () {
        var left = initialLocationX;
        var top = initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return ((Number(elem.style.left.substring(0, elem.style.left.indexOf('px'))) - left) / -100) -
            Math.floor((Number(elem.style.left.substring(0, elem.style.left.indexOf('px'))) - left) / -100);
    };
    this.getPlayerLocationY = function () {
        var left = initialLocationX;
        var top = initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return Math.floor((Number(elem.style.top.substring(0, elem.style.top.indexOf('px'))) - top) / -100)
    };
    this.getPlayerOffsetY = function () {
        var left = initialLocationX;
        var top = initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return ((Number(elem.style.top.substring(0, elem.style.top.indexOf('px'))) - top) / -100) -
            Math.floor((Number(elem.style.top.substring(0, elem.style.top.indexOf('px'))) - top) / -100);
    }

}





