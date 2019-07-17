// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  game.load.image("playerImg","../assets/flappy_frog.png");
  game.load.audio("sound","../assets/sound.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("background1","../assets/lake1.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  background1 = game.add.sprite(0,0,"background1");
  background1.height = 400;
  background1.width = 790;

  game.physics.startSystem(Phaser.Physics.ARCADE);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);

    labelScore = game.add.text(0, 0, "0");

    player = game.add.sprite(50,50, "playerImg");

    game.physics.arcade.enable(player);

    player.body.gravity.y = 500;


      var pipeInterval = 2 * Phaser.Timer.SECOND;
      game.time.events.loop(
        pipeInterval,
        generatePipe
);


}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);

}

function spaceHandler() {

  game.sound.play("sound");
  changeScore();

}

function changeScore() {

  score = score + 1;
  labelScore.setText(score.toString());

}

function addPipeBlock(x,y) {

  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;

}

function generatePipe() {

  var gapStart = game.rnd.integerInRange(1,5);

  for(var count=0; count < 8; count = count + 1) {
    if(count != gapStart && count != gapStart + 1) {
    addPipeBlock(800, count * 50);
  }
}
  changeScore();
}

function playerJump() {

  player.body.velocity.y=-340;
  game.sound.play("sound");
}

function gameOver() {
  registerScore(score);
  score = -2;
  game.state.restart();

}
