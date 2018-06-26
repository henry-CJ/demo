var mainState = {
  preload() {
    game.load.image('paddle', 'assets/paddle.jpg');
    game.load.image('brick', 'assets/brick.jpg');
    game.load.image('ball', 'assets/ball.png');
  },
  create() {
    game.stage.backgroundColor = '#3598db';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.paddle = game.add.sprite(window.innerWidth/2-40,window.innerHeight-10, 'paddle');
    this.paddle.body.immovable = true;

    this.bricks = game.add.group();
    for(var i=0; i<5; i++) {
      for(var j=0; j<5; j++) {
        var brick = game.add.sprite(55+i*60, 55+j*35, 'brick');
        brick.body.immovable = true;
        this.bricks.add(brick);
      }
    }

    this.ball = game.add.sprite(window.innerWidth/2-5, window.innerHeight-10-10, 'ball');
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 200;
    this.ball.body.bounce.setTo(1);
    this.ball.body.collideWorldBounds = true;
  },
  update() {
    if (this.left.isDown) {
      this.paddle.body.velocity.x = -300;
    } else if (this.right.isDown) {
      this.paddle.body.velocity.x = +300;
    } else {
      this.paddle.body.velocity.x = 0;
    }
    
    if (this.paddle.body.x <= 0) {
      this.paddle.x = 0;
    } else if (this.paddle.body.x+80>=window.innerWidth) {
      this.paddle.x = window.innerWidth-80;
    }
    
    game.physics.arcade.collide(this.paddle, this.ball);
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

    if (this.ball.y >= this.paddle.y) {
      game.state.start('main');
    }
  },
  hit(ball, brick) {
    brick.kill();
  }
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight);
game.state.add('main', mainState);
game.state.start('main');