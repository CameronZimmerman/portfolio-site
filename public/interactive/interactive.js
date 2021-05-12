const viewWidth = window.innerWidth
const viewHeight = window.innerHeight
const sceneWidth = 10000;

const cloudCount = 75;

const config = {
  type: Phaser.CANVAS,
  width: viewWidth,
  height: viewHeight,
  zoom: 4,
  antialias: false,
  pixleArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

const game = new Phaser.Game(config)
console.log(game);

let player;
let cloudGroup;

function preload() {
  this.load.setBaseURL("");

  this.load.image("mountains", "./media/portfolio-mountains.png");
  this.load.image("far-trees", "./media/portfolio-trees-3.png")
  this.load.image("mid-trees", "./media/portfolio-trees-2.png")
  this.load.image("close-trees", "./media/portfolio-trees-1.png")
  this.load.image("ground", "./media/portfolio-ground.png");

  for (let i = 1; i < 16; i++) {
    this.load.image(`cloud${i}`, `./media/clouds/portfolio-cloud-${i}.png`)
  }

  this.load.spritesheet('player-walk', './media/portfolio-character-walk-spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32
  })
  this.load.spritesheet('player-idle', './media/portfolio-character-idle-spritesheet.png', {
    frameWidth: 32,
    frameHeight: 32
  })

  this.cursors = this.input.keyboard.createCursorKeys()
}

function update() {
  const speed = 2.5
  if((this.cursors.right.isDown && this.cursors.left.isDown) || (!this.cursors.right.isDown && !this.cursors.left.isDown)) {
    player.play('idle', true)
  } else {
    player.play('walk', true)
  }
  if(this.cursors.right.isDown) player.x += speed

  if(this.cursors.left.isDown) player.x -= speed
  handleCloudOffscreen(cloudGroup.children.entries)
}

function create() {
  
  createScrollingBg("mountains", 0.075);
  createClouds(cloudCount);
  createScrollingBg("far-trees", 0.2);
  createScrollingBg("mid-trees", 0.4);
  createScrollingBg("close-trees", 0.6);
  createScrollingBg("ground", 0.8);

  player = this.add.sprite(viewHeight/3, viewHeight - viewHeight/6, 'player-idle')
  player.displayWidth = (viewHeight/3);
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
  this.cameras.main.setBounds(0, 0, sceneWidth, viewHeight)
  this.cameras.main.startFollow(player)
}

const createScrollingBg = (texture, scrollFactor) => {
  const count = Math.ceil(sceneWidth /viewHeight * 6) * scrollFactor
  let x = 0;
  for(let i = 0; i < count; i++) {
    const bg = game.scene.scenes[0].add
    .image(x, 0, texture)
    .setOrigin(0, 0)
    .setDisplaySize(viewHeight * 6, viewHeight)
    .setScrollFactor(scrollFactor)

    x += bg.width;
  }

}

const createClouds = (count) => {
  const scene = game.scene.scenes[0]
  cloudGroup = scene.physics.add.group()
  for (let i = 0; i < count; i++) {
    const cloudId = Math.ceil(Math.random() * 15)
    const minHeight = (viewHeight/6) -50;
    const maxHeight = (viewHeight/6) +150
    const height = Math.floor(Math.random() * maxHeight) +  minHeight
    const width = Math.random() * sceneWidth
    const scrollFactor = Math.floor(Math.random() * 0.9) + 0.1;
    const velocity = Math.floor(Math.random() * -15) -2;

    const cloud = cloudGroup.create(width, height, `cloud${cloudId}`)
    .setScrollFactor(scrollFactor)
    cloud.body.setVelocity(velocity, 0)

  }
}

const createSingleCloud = () => {
  const cloudId = Math.ceil(Math.random() * 15)
    const minHeight = (viewHeight/6) -50;
    const maxHeight = (viewHeight/6) +150
    const height = Math.floor(Math.random() * maxHeight) +  minHeight
    const width = sceneWidth + 50;
    const scrollFactor = Math.floor(Math.random() * 0.9) + 0.1;
    const velocity = Math.floor(Math.random() * -15) -2;

    const cloud = cloudGroup.create(width, height, `cloud${cloudId}`)
    .setScrollFactor(scrollFactor)
    cloud.body.setVelocity(velocity, 0)
}

const handleCloudOffscreen = (clouds) => {
  clouds.forEach(cloud => {
    if (cloud.x < -50) {
      cloud.destroy()
      createSingleCloud()
    }
  });
}
