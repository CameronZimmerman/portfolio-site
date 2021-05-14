let viewWidth = window.innerWidth
let viewHeight = window.innerHeight
let sceneScale = viewHeight / 192

let PLAYER_HEIGHT = viewHeight/3
let playerScale = PLAYER_HEIGHT/32
let sceneWidth = 10000 * sceneScale

const cloudCount = 200;

let player
let cloudGroup
let signGroup
let largeSignGroup
let overlapTracker = 0;

const signObjectsArray = [{signText: 'Welcome', bigText: 'Thank you for taking the time to visit my portfolio.\n\r Maybe you\'re a fellow developer, recruiter, teacher, or hiring manager; regardless, it is my intention to open up a dialogue and generate discussion with you. I\'m inclined to not only show you what I have done, but learn and iterate based off of feedback.', xPos: 350}, {signText: 'About Me', bigText: 'I am an energetic and positive force for my next team. I love the human and explorative aspects of programming, and would classify my self as an intuitive learner; I\'m Failing and iterating always. It is my mission to bring the human and technological aspects of coding together.\n\r I have the ability to make or break someone\'s day, so I opt to bring my best day in and day out. In my free time I love to hike, go rock climbing, and do Parkour.', xPos: 700}]


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

window.addEventListener('resize', () => {
  console.log('resized')
  const canvas = document.querySelector('canvas')
  console.log(canvas)

  viewWidth = window.innerWidth
  viewHeight = window.innerHeight
  const windowRatio = viewWidth/viewHeight
  const gameRatio = game.config.width/game.config.height
  PLAYER_HEIGHT = viewHeight/3
  playerScale = PLAYER_HEIGHT/32
  sceneWidth = 10000 * sceneScale

  if(windowRatio < gameRatio){
    canvas.style.width = viewWidth + "px";
    canvas.style.height = (viewWidth / gameRatio) + "px";
}
else {
    canvas.style.width = (viewHeight * gameRatio) + "px";
    canvas.style.height = viewHeight + "px";
}
})

function preload() {
  this.load.setBaseURL("");

  this.load.image("mountains", "./media/portfolio-mountains.png");
  this.load.image("far-trees", "./media/portfolio-trees-3.png")
  this.load.image("mid-trees", "./media/portfolio-trees-2.png")
  this.load.image("close-trees", "./media/portfolio-trees-1.png")
  this.load.image("ground", "./media/portfolio-ground.png");

  this.load.image("sign", "./media/portfolio-sign.png")
  this.load.image("large-sign", './media/portfolio-sign-large.png')

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
  console.log(this.textures.get('ground').getSourceImage().height)
}

function update() {
  const speed = 1.5 * sceneScale
  if((this.cursors.right.isDown && this.cursors.left.isDown) || (!this.cursors.right.isDown && !this.cursors.left.isDown)) {
    player.play('idle', true)
  } else {
    player.play('walk', true)
  }
  if(this.cursors.right.isDown) player.x += speed

  if(this.cursors.left.isDown) player.x -= speed
  handleCloudOffscreen(cloudGroup.children.entries)

  largeSignGroup.children.entries.forEach(sign => {
    if (sign.overlapTime && sign.overlapTime < overlapTracker) {
      sign.visible = false;
    }
  })
  overlapTracker += overlapTracker > 100000? -overlapTracker : 1
}

function create() {
  
  createScrollingBg("mountains", 0.075);
  createClouds(cloudCount);
  createScrollingBg("far-trees", 0.2);
  createScrollingBg("mid-trees", 0.4);
  createScrollingBg("close-trees", 0.6);
  createScrollingBg("ground", 0.8);

  player = this.physics.add.sprite(PLAYER_HEIGHT, viewHeight - viewHeight/6, "player-idle")
  player.displayWidth = (PLAYER_HEIGHT);
  player.scaleY = player.scaleX;

  createSigns()

  this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers("player-walk", {frames: [1, 2, 3, 4, 5, 6]}),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("player-idle", {frames: [1, 2, 3, 4, 5, 6]}),
    frameRate: 1,
    repeat: -1
  })

  this.cameras.main.setBounds(0, 0, sceneWidth, viewHeight)
  this.cameras.main.startFollow(player)
}

const getScaledHeight = (texture) => {
  const scene = game.scene.scenes[0];
  return scene.textures.get(texture).getSourceImage().height * playerScale
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

    x += bg.width * sceneScale;
  }

}

const createClouds = (count) => {
  const scene = game.scene.scenes[0]
  const CLOUD_SCALING = 0.5;
  cloudGroup = scene.physics.add.group()
  for (let i = 0; i < count; i++) {
    const cloudId = Math.ceil(Math.random() * 15)

    const displayWidth = scene.textures.get(`cloud${cloudId}`).getSourceImage().width * sceneScale * CLOUD_SCALING;
    const displayHeight = scene.textures.get(`cloud${cloudId}`).getSourceImage().height * sceneScale * CLOUD_SCALING;

    const minHeight = (viewHeight/6) -50;
    const maxHeight = (viewHeight/6) +150
    const height = Math.floor(Math.random() * maxHeight) +  minHeight
    const width = Math.random() * sceneWidth
    const scrollFactor = Math.floor(Math.random() * 0.9) + 0.1;
    const velocity = Math.floor(Math.random() * -15) -2;

    const cloud = cloudGroup.create(width, height, `cloud${cloudId}`)
    .setScrollFactor(scrollFactor)
    .setDisplaySize(displayWidth, displayHeight)
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

const createSigns = () => {
  const scene = game.scene.scenes[0]
  signGroup = scene.physics.add.group()
  largeSignGroup = scene.add.group()


  for(let i = 0; i < signObjectsArray.length; i ++) {
    const signHeight = getScaledHeight("sign");
    const sign = signGroup.create(signObjectsArray[i].xPos * sceneScale , viewHeight - signHeight * 0.5, "sign")
    sign.displayHeight = (signHeight);
    sign.scaleX = sign.scaleY;

    scene.add.text(sign.x, sign.y, signObjectsArray[i].signText, {fontSize: `${viewHeight/20}px`, bold: true} )
      .setOrigin(0.5)

    const largeSignHeight = getScaledHeight("large-sign")
    const largeSign = scene.add.image(0, 0, "large-sign")
    largeSign.displayHeight = (largeSignHeight);
    largeSign.scaleX = sign.scaleY;
    const largeSignText = scene.add.text(0, 0, signObjectsArray[i].bigText, {wordWrap: {width: largeSign.displayWidth * 0.9}, fontSize: `${viewHeight/25}px`} )
      .setOrigin(0.5);

    const largeSignContainer = scene.add.container(sign.x, viewHeight/2)
    largeSignContainer.add(largeSign)
    largeSignContainer.add(largeSignText)
    largeSignContainer.visible = false;

    largeSignGroup.add(largeSignContainer)

    scene.physics.add.overlap(player, sign, (player, sign) => {
      largeSignContainer.overlapTime = overlapTracker;
      largeSignContainer.visible = true;
    })
  }
}
