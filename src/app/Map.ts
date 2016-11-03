import {addElementBackground} from "./GlobalFunctions";
/**
 * The Map Class
 * @param width
 * @param height
 * @constructor
 */
export class Map {
    private tileWidth = 100;
    private tileHeight = 100;
    private initialLocationX : number;
    private initialLocationY : number;
    private enemies = [];
    private player;
    private width: number;
    private height: number;
    constructor(width, height) {
        this.initialLocationX = Math.round(((window.innerWidth / 2)));
        this.initialLocationY = Math.round(((window.innerHeight / 2)));
        this.width = width;
        this.height = height;
        for (var x = 0; x < width; x++)
            for (var y = 0; y < height; y++)
                addElementBackground(x, y);
    }

    addPlayer(player) {
        this.player = player;
    }

    getPlayer() {
        return this.player
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
        return this.enemies.length - 1;
    }

    getEnemyIn(x, y) {
        for (var i = 0; i < this.enemies.length; i++)
            if (this.enemies[i].getLocationX() == x && this.enemies[i].getLocationY() == y)
                return this.enemies[i];
        return null;
    }
    removeEnemy(id) {
        for (var i = 0; i < this.enemies.length; i++)
            if (this.enemies[i].getId() == id)
                this.enemies.splice(i, 1);
    }

    getTileWidth() {
        return this.tileWidth;
    }

    getTileHeight() {
        return this.tileHeight;
    }

    setPlayerLocation(moveX, moveY) {
        var left = this.initialLocationX;
        var top = this.initialLocationY;

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var elem = document.getElementById('img' + x + ';' + y);
                elem.style.left = (x * 100) + (moveX * -100) + left + "px";
                elem.style.top = (y * 100) + (moveY * -100) + top + "px";
            }
        }
        for (var i = 0; i < this.enemies.length; i++)
            this.enemies[i].updatePosition();
    }
    setPlayerTile(moveX, moveY) {
        var left = this.initialLocationX;
        var top = this.initialLocationY;

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var elem = document.getElementById('img' + x + ';' + y);
                elem.style.left = (x * 100) + (moveX * -100) + left - (this.tileWidth / 2) + "px";
                elem.style.top = (y * 100) + (moveY * -100) + top - (this.tileHeight / 2) + "px";
            }
        }
    };

    getPlayerLocationX() {
        var left = this.initialLocationX;
        var top = this.initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return Math.floor((Number(elem.style.left.substring(0, elem.style.left.indexOf('px'))) - left) / -100)
    }
    getPlayerOffsetX() {
        var left = this.initialLocationX;
        var top = this.initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return ((Number(elem.style.left.substring(0, elem.style.left.indexOf('px'))) - left) / -100) -
            Math.floor((Number(elem.style.left.substring(0, elem.style.left.indexOf('px'))) - left) / -100);
    }
    getPlayerLocationY() {
        var left = this.initialLocationX;
        var top = this.initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return Math.floor((Number(elem.style.top.substring(0, elem.style.top.indexOf('px'))) - top) / -100)
    };
    getPlayerOffsetY() {
        var left = this.initialLocationX;
        var top = this.initialLocationY;
        var elem = document.getElementById('img' + 0 + ';' + 0);
        return ((Number(elem.style.top.substring(0, elem.style.top.indexOf('px'))) - top) / -100) -
            Math.floor((Number(elem.style.top.substring(0, elem.style.top.indexOf('px'))) - top) / -100);
    }

}





