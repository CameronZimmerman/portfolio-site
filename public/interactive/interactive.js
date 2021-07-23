
let viewWidth = window.innerWidth
let viewHeight = window.innerHeight
let sceneScale = viewHeight / 192

const FAST_SPEED = 2.75 * sceneScale
const NORMAL_SPEED = 1.35 * sceneScale

let PLAYER_HEIGHT = viewHeight / 3
let playerScale = PLAYER_HEIGHT / 32
let sceneWidth = 10000 * sceneScale

const cloudCount = 200

let scene
let spaceKey
let graphics
let bgGroup
let player
let cloudGroup
let signGroup
let techStackGroup
let techCircle
let cameronHead
let freelancer
let largeSignGroup
let overlapTracker = 0
let clearSkiesSign
let linkedInPortal
let nightTime = false
let speed = NORMAL_SPEED

const freelanceText = `import React from "react"; import "./App.css"; import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; import Home from "./Home/Home"; import Interactive from "./Interactive/Interactive"; export default function App() { return ( <Router> <h1 className="name-heading"> 🌳CAMERON ZIMMERMAN🌳 </h1> <div className="main-content"> <nav className="center"> <ul> <li> <Link to="/">Home</Link> </li> <li> <Link to="/bio">Bio</Link> </li> <li> <Link to="/projects">Projects</Link> </li> <li> <Link to="/experience">Experience</Link> </li> </ul> </nav> <Switch> <Route path="/about"> <About /> </Route> <Route path="/users"> <Users /> </Route> */} <Route exact path="/"> <Home /> </Route> <Route exact path="/interactive"> <Interactive /> </Route> </Switch> </div> </Router> ); }`
const signObjectsArray = [
  {
    signText: "Welcome",
    bigText:
      "Thank you for taking the time to visit my portfolio.\n\r Maybe you're a fellow developer, recruiter, teacher, or hiring manager; regardless, it is my intention to open a dialogue and generate discussion. I'm inclined to not only show you what I have done, but learn and iterate based off of feedback. This portfolio is still under construction!",
    xPos: 350,
  },
  {
    signText: "About Cameron",
    bigText:
      "Cameron is an energetic and positive force for your next team. He loves the human and explorative aspects of programming, and would classify himself as an intuitive learner; He is failing and iterating always. It is his mission to bring the human and technological aspects of coding together.\n\r everyone has the ability to make or break someone's day, so cameron opts to bring his best self day in and day out. You can find Cameron hiking, climbing or doing Parkour in his freetime.",
    xPos: 700,
  },
  {
    signText: "TechStack =>",
    bigText:
      "Through constant learning, Cameron has been able to gain experience in a variety of tools for Software Engineering",
    xPos: 1050,
  },
  {
    signText: "Current Employment =>",
    bigText:
      "May 2021 - Current",
    xPos: 1500,
  },
  {
    signText: "Projects =>",
    bigText:
      "Some team based projects that Cameron is proud to share! (this area is still under construction, more to be added soon!)",
    xPos: 2000,
  },
  {
    signText: "Thank you",
    bigText:
      "Thank you for taking a walk in my world. I'm excited to get to know more about you and what opportunities we can create together. The best place to contact me is through my LinkedIn profile! Keep walking forward to see it. This interactive portfolio is a constant work in progress, and I'm always excited to add more. Tell me about any ideas you have!",
    xPos: 4200,
  },
]

const config = {
  type: Phaser.WEBGL,
  width: viewWidth,
  height: viewHeight,
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
    update: update,
  },
}

const game = new Phaser.Game(config)


window.addEventListener("resize", () => {
  const canvas = document.querySelector("canvas")

  viewWidth = window.innerWidth
  viewHeight = window.innerHeight
  sceneScale = viewHeight / 192
  const windowRatio = viewWidth / viewHeight
  const gameRatio = game.config.width / game.config.height
  PLAYER_HEIGHT = viewHeight / 3
  playerScale = PLAYER_HEIGHT / 32
  sceneWidth = 10000 * sceneScale

  if (windowRatio < gameRatio) {
    canvas.style.width = viewWidth + "px"
    canvas.style.height = viewWidth / gameRatio + "px"
  } else {
    canvas.style.width = viewHeight * gameRatio + "px"
    canvas.style.height = viewHeight + "px"
  }
})

function preload() {
  scene = game.scene.scenes[0]
  graphics = scene.make.graphics()
  spaceKey = scene.input.keyboard.addKey('Space')

  scene.load.setBaseURL("")

  scene.load.plugin('rexfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfadeplugin.min.js', true)


  scene.load.image("mountains", "./media/portfolio-mountains.png")
  scene.load.image("stars", "./media/portfolio-stars.png")
  scene.load.image("far-trees", "./media/portfolio-trees-3.png")
  scene.load.image("mid-trees", "./media/portfolio-trees-2.png")
  scene.load.image("close-trees", "./media/portfolio-trees-1.png")
  scene.load.image("ground", "./media/portfolio-ground.png")
  scene.load.image("sign", "./media/portfolio-sign.png")
  scene.load.image("cameron-head", "./media/portfolio-cameron-head.png")
  scene.load.image("cameron-head-open","./media/portfolio-cameron-head-open.png")
  scene.load.image("html5", "./media/portfolio-html5.png")
  scene.load.image("javascript", "./media/portfolio-javascript.png")
  scene.load.image("css", "./media/portfolio-css.png")
  scene.load.image("node", "./media/portfolio-node.png")
  scene.load.image("react", "./media/portfolio-react.png")
  scene.load.image("postgresql", "./media/portfolio-postgresql.png")
  scene.load.image("clear-skies-sign", "./media/portfolio-clearskies-sign.png")
  scene.load.image("telescope", "./media/portfolio-telescope.png")
  scene.load.image("stargazing", "./media/portfolio-stargazing.png")
  scene.load.image("large-sign", "./media/portfolio-sign-large.png")
  scene.load.image("clear-skies-homepage", "./media/portfolio-clear-skies-homepage.png")
  scene.load.image("clear-skies-about", "./media/portfolio-clear-skies-about.png")
  scene.load.image("clear-skies-starview", "./media/portfolio-clear-skies-starview.png")

  for (let i = 1; i < 16; i++) {
    scene.load.image(`cloud${i}`, `./media/clouds/portfolio-cloud-${i}.png`);
  }
  scene.load.spritesheet(
    "player-walk",
    "./media/portfolio-character-walk-spritesheet.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    }
  )
  scene.load.spritesheet(
    "player-idle",
    "./media/portfolio-character-idle-spritesheet.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    }
  )
  scene.load.spritesheet(
    "freelance",
    "./media/portfolio-freelance-spritesheet.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  )
  scene.load.spritesheet(
    "portal",
    "./media/portfolio-linkedin-portal-spritesheet.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  )
  
  scene.load.audio("forest-ambience", "./media/portfolio-ambience.mp3")
  scene.load.audio("footstep", "./media/portfolio-footstep.mp3")

  scene.cursors = scene.input.keyboard.createCursorKeys()
}

function update() {
  if (spaceKey.isDown) {
    speed = FAST_SPEED
  } else {
    speed = NORMAL_SPEED
  }
  if (scene.cursors.right.isDown) {
    moveBySpeed(player, 1)
    player.flipX = false
  }

  if (scene.cursors.left.isDown) {
    moveBySpeed(player, -1)
    player.flipX = true
  }
  if (
    (scene.cursors.right.isDown && scene.cursors.left.isDown) ||
    (!scene.cursors.right.isDown && !scene.cursors.left.isDown)
  ) {
    player.play("idle", true)
    player.flipX = false
  } else {
    player.play("walk", true)
  }

  if(player.anims.currentFrame.index === 2 && player.anims.currentAnim.key === "walk") {
    scene.footstep.play({
      mute: false,
      volume: 0.025,
      rate: 1 + Math.random(),
      detune: Math.random(),
      seek: 0,
      loop: false,
      delay: 0
    })
  }

  handleCloudOffscreen(cloudGroup.children.entries)

  largeSignGroup.children.entries.forEach((sign) => {
    if (sign.overlapTime && sign.overlapTime < overlapTracker) {
      sign.visible = false
    }
  })
  overlapTracker += overlapTracker > 100000 ? -overlapTracker : 1
  for (let i = 0; i < techStackGroup.children.entries.length; i++) {
    const child = techStackGroup.children.entries[i]
    child.circlePos += 0.00025 * sceneScale
    if (child.circlePos > 1) child.circlePos = 0
    techCircle.getPoint(child.circlePos, child)
  }
  freelancer.play('freelance-type', true)
  linkedInPortal.play('portal-spin', true)
}

function create() {
  bgGroup = createScrollingBg("mountains", 0.075)
  createClouds(cloudCount)
  createScrollingBg("far-trees", 0.2)
  createScrollingBg("mid-trees", 0.4)
  createScrollingBg("close-trees", 0.6)
  createScrollingBg("ground", 0.8)
  player = scene.physics.add.sprite(
    PLAYER_HEIGHT,
    viewHeight - viewHeight / 6,
    "player-idle"
  )
  player.displayWidth = PLAYER_HEIGHT
  player.scaleY = player.scaleX
  player.depth = 100

  createCameronHead()
  createSigns()
  freelancer = createFreelanceCameron(1750)
  createClearSkiesSign()
  createTelescope()
  createFloatingImageWithText("Clear Skies is an app that gathers resources, and displays the night sky to new stargazers. It was made in a one week sprint...", "clear-skies-homepage", 3200*sceneScale, viewHeight/2, )
  createFloatingImageWithText("with React, React-Bootstrap, and a Node.js Backend utilizing a Postgres database...", "clear-skies-starview", 3500*sceneScale, viewHeight/2, )
  createFloatingImageWithText("by a group of four remote developers who carried Clear Skies from concept to deployment", "clear-skies-about", 3800*sceneScale, viewHeight/2, )
    linkedInPortal = createLinkedInPortal()


  scene.anims.create({
    key: "walk",
    frames: scene.anims.generateFrameNumbers("player-walk", {
      frames: [1, 2, 3, 4, 5, 6],
    }),
    frameRate: 10,
    repeat: -1,
  })

  scene.anims.create({
    key: "idle",
    frames: scene.anims.generateFrameNumbers("player-idle", {
      frames: [1, 2, 3, 4, 5, 6],
    }),
    frameRate: 1,
    repeat: -1,
  })

  scene.anims.create({
    key: "freelance-type",
    frames: scene.anims.generateFrameNumbers("freelance", {
      frames: [1, 2, 3, 4, 5],
    }),
    frameRate: 5,
    repeat: -1,
  })
  scene.anims.create({
    key: "portal-spin",
    frames: scene.anims.generateFrameNumbers("portal", {
      frames: [1, 2, 3, 4],
    }),
    frameRate: 10,
    repeat: -1,
  })

  scene.ambience = scene.sound.add("forest-ambience")

  scene.ambience.play({
    mute: false,
    volume: 0.25,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
  })

  scene.footstep = scene.sound.add("footstep")

  scene.cameras.main.setBounds(0, 0, sceneWidth, viewHeight)
  scene.cameras.main.startFollow(player)
}

const getScaledHeight = (texture) => {
  return scene.textures.get(texture).getSourceImage().height * playerScale;
}

const createScrollingBg = (texture, scrollFactor) => {

  const count = Math.ceil((sceneWidth / viewHeight) * 6) * scrollFactor;
  const bgGroup = scene.add.group()

  let x = 0
  for (let i = 0; i < count; i++) {
    const bg = bgGroup
      .create(x, 0, texture)
      .setOrigin(0, 0)
      .setDisplaySize(viewHeight * 6, viewHeight)
      .setScrollFactor(scrollFactor)

    x += bg.width * sceneScale
  }

  return bgGroup
}

const createClouds = (count) => {
  const CLOUD_SCALING = 0.5
  cloudGroup = scene.physics.add.group()
  for (let i = 0; i < count; i++) {
    const cloudId = Math.ceil(Math.random() * 15)

    const displayWidth =
      scene.textures.get(`cloud${cloudId}`).getSourceImage().width *
      sceneScale *
      CLOUD_SCALING
    const displayHeight =
      scene.textures.get(`cloud${cloudId}`).getSourceImage().height *
      sceneScale *
      CLOUD_SCALING

    const minHeight = viewHeight / 6 - 50
    const maxHeight = viewHeight / 6 + 150
    const height = Math.floor(Math.random() * maxHeight) + minHeight
    const width = Math.random() * sceneWidth
    const scrollFactor = Math.floor(Math.random() * 0.9) + 0.1
    const velocity = Math.floor(Math.random() * -15) - 2

    const cloud = cloudGroup
      .create(width, height, `cloud${cloudId}`)
      .setScrollFactor(scrollFactor)
      .setDisplaySize(displayWidth, displayHeight)
    cloud.body.setVelocity(velocity, 0)
  }
}

const createSingleCloud = () => {
  const cloudId = Math.ceil(Math.random() * 15)
  const minHeight = viewHeight / 6 - 50
  const maxHeight = viewHeight / 6 + 150
  const height = Math.floor(Math.random() * maxHeight) + minHeight
  const width = sceneWidth + 50
  const scrollFactor = Math.floor(Math.random() * 0.9) + 0.1
  const velocity = Math.floor(Math.random() * -15) - 2

  const cloud = cloudGroup
    .create(width, height, `cloud${cloudId}`)
    .setScrollFactor(scrollFactor)
  cloud.body.setVelocity(velocity, 0)
};

const handleCloudOffscreen = (clouds) => {
  clouds.forEach((cloud) => {
    if (cloud.x < -50) {
      cloud.destroy()
      createSingleCloud()
    }
  })
}

const createSigns = () => {
  signGroup = scene.physics.add.group()
  largeSignGroup = scene.add.group()

  for (let i = 0; i < signObjectsArray.length; i++) {
    const signHeight = getScaledHeight("sign")
    const sign = signGroup.create(
      signObjectsArray[i].xPos * sceneScale,
      viewHeight - signHeight * 0.5,
      "sign"
    )
    sign.displayHeight = signHeight
    sign.scaleX = sign.scaleY

    scene.add
      .text(sign.x, sign.y, signObjectsArray[i].signText, {
        fontSize: `${viewHeight / 32}px`,
        bold: true,
        backgroundColor: "black",
        lineHeight: 5
      })
      .setOrigin(0.5)

    const largeSignHeight = getScaledHeight("large-sign")
    const largeSign = scene.add.image(0, 0, "large-sign")
    largeSign.displayHeight = largeSignHeight
    largeSign.scaleX = sign.scaleY
    const largeSignText = scene.add
      .text(0, 0, signObjectsArray[i].bigText, {
        wordWrap: { width: largeSign.displayWidth * 0.9 },
        fontSize: `${viewHeight / 25}px`,
        lineHeight: 5
      })
      .setOrigin(0.5)

    const largeSignContainer = scene.add.container(sign.x, viewHeight / 2)
    largeSignContainer.add(largeSign)
    largeSignContainer.add(largeSignText)
    largeSignContainer.visible = false
    largeSignContainer.depth = 105

    largeSignGroup.add(largeSignContainer)

    scene.physics.add.overlap(player, sign, (player, sign) => {
      largeSignContainer.overlapTime = overlapTracker
      largeSignContainer.visible = true
    })
  }
}

const createScaledPhysicsObj = (height, xPos, texture) => {
  const obj = scene.physics.add.sprite(
    xPos * sceneScale,
    viewHeight - height * 0.5,
    texture
  )
  obj.displayWidth = height
  obj.scaleY = obj.scaleX

  return obj
}

const createCameronHead = () => {

  const techHeight = getScaledHeight("html5")
  techStackGroup = scene.add.group()
  techStackGroup.create(1200, 0, "html5")
  techStackGroup.create(1200, 0, "css")
  techStackGroup.create(1200, 0, "react")
  techStackGroup.create(1200, 0, "javascript")
  techStackGroup.create(1200, 0, "postgresql")
  techStackGroup.create(1200, 0, "node")
  for (let i = 0; i < techStackGroup.children.entries.length; i++) {
    const child = techStackGroup.children.entries[i]
    child.displayWidth = techHeight
    child.scaleY = child.scaleX
    child.circlePos = (1 / techStackGroup.children.entries.length) * i
    child.visible = false
  }

  techCircle = new Phaser.Geom.Circle(
    1200 * sceneScale,
    viewHeight / 2,
    100 * sceneScale
  )
  Phaser.Actions.PlaceOnCircle(techStackGroup.getChildren(), techCircle)

  const cameronHeadHeight = getScaledHeight("cameron-head")
  cameronHead = createScaledPhysicsObj(cameronHeadHeight, 1200, "cameron-head")
  scene.physics.add.overlap(player, cameronHead, (player, cameronHead) => {
    cameronHead.setTexture("cameron-head-open")
    techStackGroup.children.entries.forEach((child) => {
      child.visible = true
    })
  })
}

const createClearSkiesSign = () => {
  scene.cameras.main.once("camerafadeincomplete", function (camera) {
      camera.fadeEffect.alpha = 0.25
  })
  const height = getScaledHeight("clear-skies-sign")
  clearSkiesSign = createScaledPhysicsObj(height, 2300, "clear-skies-sign")
  scene.physics.add.overlap(
    player,
    clearSkiesSign,
    (player, clearSkiesSign) => {
      if (player.x > clearSkiesSign.x && !nightTime) {
        scene.cameras.main.fadeOut(1500)
        scene.cameras.main.once("camerafadeoutcomplete", function (camera) {
          camera.fadeIn(1500)
          if(!nightTime){
            cloudGroup.getChildren().forEach((child) => {
              child.setVisible(false)
            })
          
            bgGroup.getChildren().forEach((child) => {
              child.setTexture("stars")
            })
            
            nightTime = true
          }
        })
      } else if(!scene.cameras.main.fadeEffect.isComplete) {
        scene.cameras.main.resetFX()
      }
    }
  )
}

const createTelescope = () => {
  const height = getScaledHeight("telescope")
  const telescope = createScaledPhysicsObj(height, 2800, "telescope")
  const image = scene.add.image(telescope.x, 0, "stargazing")
    .setOrigin(0.5, 0)
  image.displayHeight = viewHeight
  image.scaleX = image.scaleY
  graphics.fillStyle(0xffffff)
  const circleRadius = 50*sceneScale
  const circle = new Phaser.Geom.Circle(telescope.x, scene.input.mousePointer.worldY, circleRadius)
  graphics.fillCircleShape(circle)
  
  const mask = graphics.createGeometryMask()

  image.setMask(mask)
 
  scene.physics.add.overlap(player, telescope, (player, telescope) => {

    graphics.setX(scene.input.x - (0.5*viewWidth) - (circleRadius))
    graphics.setY(scene.input.y)

  })
}

const moveBySpeed = (obj, dir) => {
  obj.x += speed *dir
}
const createFloatingImageWithText = (description, texture, x, y) => {
  const image = scene.add.image(x, y, texture)
  image.displayHeight = viewHeight/2
  image.scaleX = image.scaleY
  const text = scene.add.text(x, y - viewHeight/4, description, {
    fontSize: `${viewHeight / 32}px`,
    bold: true,
    backgroundColor: "black",
    wordWrap: { width: image.displayWidth * 0.9 },
    boundsAlignW: "center",
    lineHeight: 5

  })
  text.setOrigin(0.5)

  const tween = scene.tweens.add({
    targets: [image],
    props: {
        y: {
            value: 100*sceneScale,
            delay: 1000
        }
    },
    ease: 'Power1',
    duration: 3000,
    yoyo: true,
    repeat: -1,
    paused: false,
  })

}
const createFreelanceCameron = (xPos) => {
  const freelanceHeight = getScaledHeight('freelance')
  const freelancer = createScaledPhysicsObj(freelanceHeight, xPos, 'freelance')
  const borderCircle = scene.add.circle(xPos*sceneScale, freelancer.y , 200, 0x2d2d2d)
  borderCircle.setStrokeStyle(4, 0x90ee90)
  borderCircle.setDepth(0)
  freelancer.setDepth(1)

  createLargeCharacters(freelanceText, freelancer.x, freelancer.y)

  return freelancer

}
const createLargeCharacters = (text, baseX, baseY) => {
  let words = text.split("\n").join(" ").split(" ")
  let currentWord = 0

  setInterval(() => {
    if (currentWord === words.length) {
      currentWord = 0
    }

    const word = scene.add.text(baseX, baseY, words[currentWord], {
      wordWrap: { width: 100},
      fontSize: `${viewHeight / 10}px`,
      lineHeight: 5
    })
    word.depth = 1
    scene.physics.world.enable(word)
    word.body.setVelocity(100, -10 + Math.random() * 20)

    scene.tweens.add({
      targets: word,
      alpha: 0,
      duration: 8000,
      ease: 'Power2'
    }, scene)

    setTimeout(function(){ word.destroy()}, 8000);

    currentWord += 1
  }, 1500)
}
const createLinkedInPortal = () => {
  let portalHeight = getScaledHeight('portal')
  const portal = createScaledPhysicsObj(portalHeight, 4350, 'portal')
  scene.physics.add.overlap(player, portal, (player, portal) => {
    if(player.x > portal.x) {
      window.open("https://www.linkedin.com/in/cameron-zimmerman/")
      window.location.reload()
    }
  });
  return portal
}