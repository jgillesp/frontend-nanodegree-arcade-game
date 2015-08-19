// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    //x position for our enemy
    this.x = x;
    //y position for our enemy
    this.y = y;
    //speed for our enemy
    this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, speed) {
    // You should multiply any movement by the dt parameter
    if (this.x >= 505) {
        this.x = -101;
    }
    this.x = this.x + this.speed * dt;
//bounding box for collision detection
  if (this.x < player.x + 50 &&
    //left side of player
   this.x + 85 > player.x &&
   this.y < player.y + 50 &&
   //top to player
   85 + this.y > player.y) {
        //enemyCollision = true;
        this.collision();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Checks for enemy collision
Enemy.prototype.collision = function() {
    //reset player position
    player.x = 200;
    player.y = 400;
    //take away a heart
    var popHeart = allHearts.pop();
        //check if hearts = 0
    if (allHearts.length === 0) {
        //popup message that game is over
        alert("Gameover - Click okay to restart");
        //resets hearts
        createHearts();
    }
};

//Player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

//Keeps player on canvas
Player.prototype.update = function() {
    //x can't be less than 0 or more than 420/400
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    //y can't be more than 440/430
    if (this.y > 430) {
        this.y = 430;
    }
};

//Gets player image and starting point
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Receives user inputs
Player.prototype.handleInput = function(keyStroke) {
    //receive user input to move player
   if (keyStroke ==='up') {
        this.y -= 10;
    }
    else if (keyStroke === 'down') {
        this.y += 10;
    }
    else if (keyStroke === 'left') {
        this.x -= 20;
    }
    else if (keyStroke === 'right') {
        this.x += 20;
    }
//Reset player position if they make it to the water
   if (this.y < -10) {
    this.reset();
    }
};

//resets player position
Player.prototype.reset = function() {
    this.y = 400;
    this.x = 200;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Heart function that takes in x and y coordinates and gets the heart image
var Heart = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
};

//Gets heart image and position
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 68);
};

//hearts array
var allHearts = [];

//Creates hearts
var createHearts = function() {
    var heart1 = new Heart(350, 50);
    var heart2 = new Heart(400, 50);
    var heart3 = new Heart(450, 50);
    allHearts.push(heart1);
    allHearts.push(heart2);
    allHearts.push(heart3);
};

// Instantiates enemy objects and sets position and speed.
var enemy1 = new Enemy(-101, 65, 80);
var enemy2 = new Enemy(-101, 140, 100);
var enemy3 = new Enemy(-101, 220, 60);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Places the player object in a variable called player
var player = new Player(200, 400);

createHearts();