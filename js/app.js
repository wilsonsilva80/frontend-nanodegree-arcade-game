// TODO: Enemy.prototype.checkCollisions

// Enemies our player must avoid
var Enemy = function(x = 0, y = 200, speed = 40) {

    this.x = x;
    this.startPos();

    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.startPos = function() {
    let randomY = Math.random() * (230 - 40 + 1) + 40;
    let randomSpeed = Math.random() * 50 + 5;
    this.y = randomY;
    this.speed = randomSpeed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    // console.log(`enemy y: ${this.y} \n enemy speed: ${this.speed}`);
    if( this.x >= 400) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function () {

    this.startPos();
    this.sprite = 'images/char-boy.png';
}

Player.prototype.startPos = function() {
    this.x = 200;
    this.y = 400;
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


allEnemies = [];
//Create between 1 to 6 enemies
const addEnemies = () => {
    randomEnemies = Math.random() * 5 + 1;
    for(let i = 0; i < randomEnemies; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);
    }
}
addEnemies();

player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
