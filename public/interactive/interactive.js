const width = window.innerWidth;
const height = window.innerHeight;
const config = {
  type: Phaser.CANVAS,
  width,
  height,
  zoom: 4,
  antialias: false,
  pixleArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.setBaseURL("");

  this.load.image("mountains", "./media/portfolio-mountains.png");
  this.load.image("clouds-1", "./media/portfolio-clouds-1.png");
  this.load.image("clouds-2", "./media/portfolio-clouds-2.png");
  this.load.image("ground", "./media/portfolio-ground.png");
  this.load.spritesheet('player-walk', './media/portfolio-character-walk-spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32
  })
  this.load.spritesheet('player-idle', './media/portfolio-character-idle-spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32
  })
}

function create() {
  this.add
    .image(0, 0, "mountains")
    .setOrigin(0, 0)
    .setDisplaySize(height * 6, height)
  this.add
    .image(0, 0, "clouds-1")
    .setOrigin(0, 0)
    .setDisplaySize(height * 6, height);
  this.add
    .image(0, 0, "clouds-2")
    .setOrigin(0, 0)
    .setDisplaySize(height * 6, height);
  this.add
    .image(0, 0, "ground")
    .setOrigin(0, 0)
    .setDisplaySize(height * 6, height);

  const player = this.add.sprite(height/3, height - height/6, 'player-idle')
  player.displayWidth = (height/3);
  player.scaleY = player.scaleX;

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('player-walk', {frames: [1, 2, 3, 4, 5, 6]}),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('player-idle', {frames: [1, 2, 3, 4, 5, 6]}),
    frameRate: 1,
    repeat: -1
  })
  player.play('idle');
}
