/**
 * Player Class
 * @param element
 * @param mapParam
 * @param characterSpriteSheet
 * @constructor
 */
function Player(element, mapParam, characterSpriteSheet)
{
    var imglocation = Resources.getCharacter("131");
    var element = element;
    var level= 1;
    var experience = 0;
    var hp = level * 100;
    var alive = true;
    var map = mapParam;
    var automationComplete = true;
    map.setPlayerTile(0,0);
    var automation = new MoveAutomation(this, map);
    var time = getTime();
    var lastTime = getTime();
    var yawn = false;
    var status = "idle";
    map.addPlayer(this);

    element.style.left = Math.round(((window.innerWidth / 2)) - 50) + 'px';
    element.style.top = Math.round(((window.innerHeight / 2))) - 100 + 'px';
    element.setAttribute('src',imglocation);

    this.getLevel = function()
    {
        return level;
    };
    this.giveXp = function(xpToAdd)
    {
        this.experience += xpToAdd;
        if(this.experience > (((level + 1) * (level + 1)) * 10))
        {
            level = Math.floor(Math.sqrt(this.experience / 10));
            ChatConsole.LogThis("congratulations, you've leveled up to " + level + "!");
        }
    };
    this.getAutomation = function()
    {
        return automation;
    };
    this.getAnimation = function()
    {
        return characterSpriteSheet;
    };

    this.update = function()
    {
       var healthBar =  $(".progress-bar span");
        healthBar.css("width", ((hp / (level * 100)) * 100) + "%");
        if(!yawn)
        {
            time = getTime();
        }
        if((time - lastTime) > Math.round(Math.random() * 10000) + 20000 )
        {
            yawn = true;
            this.resetYawnTimer();
        }
        if(yawn)
        {
            yawn = characterSpriteSheet.animateYawn();

            if(!yawn)
            {
                characterSpriteSheet.ResetSprite();
                this.resetYawnTimer();
            }
        }
        automationComplete = automation.automate()

    };

    this.healFull = function()
    {
        hp = level * 100;
    };

    this.heal = function(number)
    {
        hp += number;
    };
    this.getAlive = function()
    {
        return alive;
    };
    this.takeDamage = function(number)
    {
        hp -= number;
        ChatConsole.LogThis("You took " + number + " damage. Your hp is: " + hp);
        if(hp <= 0)
        {
            ChatConsole.LogThis("Oh Dear, You are dead!");
            this.alive = false;
            var elem = document.getElementById("character");
            elem.parentNode.removeChild(elem);
        }
    };
    this.attack = function()
    {
        var attackDone = !characterSpriteSheet.animateAttack();
        if(attackDone)
        {
            var lastDirection = characterSpriteSheet.getLastDirection();

            if(lastDirection.indexOf("up") > -1)
            {

                var enemy = map.getEnemyIn(this.getLocationX(), this.getLocationY() - 1);
                ChatConsole.LogThis(enemy);

                if ( enemy != null )
                {

                    this.attackEnemy(enemy);
                }

            }
            else if(lastDirection.indexOf("down") > -1)
            {
                var enemy = map.getEnemyIn(this.getLocationX(), this.getLocationY() + 1);
                if ( enemy != null )
                    this.attackEnemy(enemy);

            }
            else if(lastDirection.indexOf("left") > -1)
            {
                var enemy = map.getEnemyIn(this.getLocationX() - 1, this.getLocationY());
                if ( enemy != null )
                    this.attackEnemy(enemy);

            }
            else if(lastDirection.indexOf("right") > -1)
            {
                var enemy = map.getEnemyIn(this.getLocationX() + 1, this.getLocationY());
                if ( enemy != null )
                    this.attackEnemy(enemy);

            }

        }
    };
    this.attackEnemy = function(Monster)
    {

        var damage = Math.round(Math.random() * (level * 30));
        var blockChance = Monster.getLevel() / (level * 2);
        if(!((blockChance * 100) > (Math.random() * 100)))
            Monster.takeDamage(damage);
        else
            ChatConsole.LogThis("The monster blocked your attack!");



    };

    this.setLocationOnScreen = function(x,y)
    {
        element.style.top = y + "px";
        element.style.left = x + "px";
    };
    this.setLocation= function(x,y)
    {
       map.setPlayerLocation(x,y);
    };
    this.moveUp = function()
    {
        characterSpriteSheet.animateUp();
        map.setPlayerLocation(this.getLocationX() + this.getoffsetX() , this.getLocationY() +this.getoffsetY() - .1);
        this.resetYawnTimer();
        yawn = false;
        status = "moving-up";
    };
    this.moveDown = function()
    {
        characterSpriteSheet.animateDown();
        map.setPlayerLocation(this.getLocationX() + this.getoffsetX() , this.getLocationY() +this.getoffsetY() +.1);
        this.resetYawnTimer();
        yawn = false;
        status = "moving-down";
    };
    this.moveRight = function()
    {
        characterSpriteSheet.animateRight();
        map.setPlayerLocation(this.getLocationX() + this.getoffsetX() +.1 , this.getLocationY() +this.getoffsetY() );
        this.resetYawnTimer();
        yawn = false;
        status = "moving-right";
    };
    this.moveLeft = function()
    {

        characterSpriteSheet.animateLeft();
        map.setPlayerLocation(this.getLocationX() + this.getoffsetX() - .1 , this.getLocationY() +this.getoffsetY() );
        this.resetYawnTimer();
        yawn = false;
        status = "moving-left";
    };

    this.getLocationX = function()
    {
        return map.getPlayerLocationX();
    };
    this.getLocationY = function()
    {
        return map.getPlayerLocationY();
    };
    this.getoffsetX = function()
    {
        return map.getPlayerOffsetX();
    };
    this.getoffsetY = function()
    {
        return map.getPlayerOffsetY();
    };


    this.resetYawnTimer = function()
    {
        time = getTime();
        lastTime = time;
    }
}

