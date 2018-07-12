// TODO: create a startPos to Player so that there's no need to instantiate it when creating it
// TODO: create a startPos to Enemy with a random start position on the y axis
// TODO: create a speed parameter to enemy and randomize it when instantiating it

// Enemies our player must avoid
var Enemy = function(x, y, speed = 20) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x *= dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    //bottom side
    if (this.y >= 400) {
        this.y = 400;
    }
    //right side
    if (this.x >= 420) {
        this.x = 420;
    }
    //upper side
    if (this.y <= -40) {
        this.y = -40;
    }
    //left side
    if (this.x <= -15) {
        this.x = -15;
    }
    //check if game Won
    gameWon();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left') {
        this.x -= 15;
    }

    if (keyPress == 'right') {
        this.x += 15;
    }

    if (keyPress == 'up') {
        this.y -= 15;
    }

    if (keyPress == 'down') {
        this.y += 15;
    }
    console.log(`x: ${this.x} \n y: ${this.y}`);

}

const gameWon = () => {
    if (player.y <= -25) {
        console.log('You won the game');
        player.x = 200;
        player.y = 400;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
var enemy = new Enemy(0, 200);

allEnemies.push(enemy);
player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
