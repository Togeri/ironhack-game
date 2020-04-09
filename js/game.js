const game = {

    canvas: undefined,
    ctx: undefined,
    canvasSize: {
        width: undefined,
        height: undefined,
    },


    lifes: 3,
    score: 0,
    scorePainting: [],
    scoreImg: undefined,
    coins: 0,
    time: 110,
    gameOver: false,
    gameWon: false,
    gameOverCounter: 0,
    hurry: false,

    scale: 3, // LA ESCALA DEL JUEGO ESTÁ A 3X

    FPS: 60,
    framesCounter: 0,

    background: undefined, //Unused
    player: undefined,
    map: undefined,

    enemies: [],

    velX: 5,
    gravity: 0.6, //Standard Gravity: Fishes and other flying enemies would have different gravity

    keys: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        A: 65, //Left equivalent
        W: 87, // Up equivalent
        D: 68, // Right equivalent
        S: 83, // Down equivalent
        K: 75, // "B" in NES
        O: 79, // "A" in NES
        V: 86, // "Start" in NES
        N: 78 // "Select" in NES
    },

    keyState: {
        keyLeft: false,
        keyRight: false,
        keyUp: false,
        keyDown: false,
        keyJump: false,
        keyAttack: false,
    },

    interval: undefined,

    playerRelativeX: 0,
    playerRelativeY: undefined,

    ctxAUDIO: undefined,

    sounds: {
        gameOverSound: new Audio("./sounds/music/08-you-re-dead.mp3"),
        coinSound: new Audio("./sounds/sfx/coin.wav"),
        overWorldSound: new Audio("./sounds/music/01-main-theme-overworld.mp3"),
        hurryoverWorldSound: new Audio("./sounds/music/18-hurry-overworld-.mp3"),
        jump: new Audio("./sounds/sfx/jump-small.wav"),
        stomp: new Audio("./sounds/sfx/stomp.wav"),
        powerUp: new Audio("./sounds/sfx/powerup.wav"),
        starMan: new Audio("./sounds/music/05-starman.mp3"),
        flagPole: new Audio("./sounds/sfx/flagpole.wav"),
        levelComplete: new Audio("./sounds/music/06-level-complete.mp3"),

    },



    init() {

        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")
        this.setDimensions()
        this.setListeners()
        this.scoreImg = new Image()
        this.scoreImg.src = "./img/tileset2.png"
        this.start()
        this.sounds.overWorldSound.play()
    },

    setDimensions() {

        this.canvasSize.width = 1440   //Esta linea y la 39 creo que sobran
        // this.canvasSize.width = window.innerWidth   //Esta linea y la 39 creo que sobran
        this.canvasSize.height = 791   // He tenido que hacer una ñapa porque si pongo el innerHeigth se me pone una scrollbar a la derecha como que el canvan ocupa más del window.Heigth
        // this.canvasSize.height = window.innerHeight - 5    // He tenido que hacer una ñapa porque si pongo el innerHeigth se me pone una scrollbar a la derecha como que el canvan ocupa más del window.Heigth
        this.canvas.width = this.canvasSize.width
        this.canvas.height = this.canvasSize.height
    },

    
    start() {

        // ---------------Todo esto son pruebas que luego serán sustituidas por un "mapLoad() method, sobre todo la parte de enemies"
        this.player = new Player(this.ctx, this.canvasSize.width, this.canvasSize.height, this.keys, this.gravity, this.scale)
        this.player.image.onload = () => this.player.draw()

        this.map = new Map(this.ctx, this.scale, this.canvasSize, 1, 1, this.player)
        this.map.init()

        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 1000, 600, 624))
        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 5200, 400, 624))
        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 1200, 400, 624))
        this.enemies.push(new Enemy(this.ctx, "Turtle", this.canvasSize, this.gravity, this.scale, 800, 400, 624))
        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 2750, 600, 624))
        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 2650, 600, 624))

        this.enemies.push(new Enemy(this.ctx, "Turtle", this.canvasSize, this.gravity, this.scale, 1800, 400, 624))
        this.enemies.push(new Enemy(this.ctx, "Turtle", this.canvasSize, this.gravity, this.scale, 1900, 400, 624))


        for (let i = 57; i < 97; i++) {

            i % 2 === 0
                ? this.enemies.push(new Enemy(this.ctx, "Turtle", this.canvasSize, this.gravity, this.scale, (i * 100 + 21), 400, 624))
                : this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, (i * 100 + 27), 600, 624))
        }


        this.enemies.forEach(enemy => enemy.init())

        // ---------------Hasta aqui --- Todo son pruebas 

        this.interval = setInterval(() => {
            this.time === 0 ? this.gameOver = true : null
            this.time === 100 ? this.hurry = true : null

            if (this.hurry && this.time === 100) {
                this.sounds.overWorldSound.pause()
                this.sounds.hurryoverWorldSound.play()
            }

            if (!this.gameOver) {

                // Win Condition
                if (this.playerRelativeX >= 1070) {

                    this.sounds.overWorldSound.pause()
                    this.sounds.hurryoverWorldSound.pause()
                    this.sounds.starMan.pause()
                    this.sounds.gameOverSound.pause()

                    if (!this.player.gameWonAnimationStarted) {

                        this.sounds.flagPole.play()
                        setTimeout(() => {
                            this.sounds.levelComplete.play()
                        }, 2700)
                        this.player.gameWonAnimationStarted = true
                    }

                    setTimeout(() => {
                        this.player.winAnimationCastle()
                    }, 3500)

                    setTimeout(() => {
                        this.drawCongratulations()
                    }, 4500)

                    setTimeout(() => {
                        clearInterval(this.interval)
                    }, 6000)

                    this.clear()
                    this.player.winAnimationFlag()

                    this.map.draw()

                    if (this.player.posX < 1056) {
                        this.player.draw()
                    }

                } else {
                    this.player.posY > 700 ? this.gameOver = true : null
                    this.clear()
                    this.drawAll()
                    this.enemies.forEach(enemy => {
                        this.applyPhysics(enemy)
                        this.isCollisionEnemy(this.player, enemy) && this.player.playerState === "small" ? this.gameOver = true : null
                        this.isCollisionEnemy(this.player, enemy) && this.player.playerState === "starman" && enemy.enemyState != "air-death" ? this.deleteEnemyStar() : null

                        // To preven infinite loops while comparing enemies collisions
                        let finiteLoopArray = this.enemies.filter(enemy2 => enemy != enemy2)

                        // Enemy-Obstacle & Enemy-Enemy Collisions
                        if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(enemy, element, enemy.posX + 1, enemy.posY)).length != 0 && !enemy.falling ||
                            this.map.obstaclesMap.filter(element => this.isCollisionObstacle(enemy, element, enemy.posX - 1, enemy.posY)).length != 0 && !enemy.falling ||
                            finiteLoopArray.filter(element => this.isCollisionEnemy(enemy, element)).length != 0 && !enemy.falling) {
                            enemy.velX *= -1
                        }
                    })

                    this.applyPhysics(this.player)
                    if (this.player.playerState === "starman") {

                        this.sounds.overWorldSound.pause()
                        // this.sounds.powerUp.play() // Esto se tiene que activar únicamente cuando mario pilla la estrella
                        // Adenás, en esa collision, hay que añadir 15 segundos al starTimer de Mario
                        this.player.starmanAnimation()
                        this.framesCounter % 60 === 0 ? this.player.starTimer-- : null


                        this.player.starTimer <= 0 ? this.player.playerState = "small" : null
                        if (this.player.starTimer === 0) {
                            this.player.playerState = "small"
                            this.sounds.overWorldSound.play()
                            this.sounds.starMan.pause()
                        }
                    }
                    else {
                        // this.applyPhysics(this.player)
                        this.checkStomp()
                    }
                    // this.applyPhysics(this.player)
                    this.move()

                    this.map.itemsMap.forEach((item, index) => {

                        if (this.isCollisionObstacle(this.player, item, this.player.posX, this.player.posY)) {
                            this.map.animationObjects.forEach((animatedObject, index) => {

                                if (animatedObject.indexID == item.indexID) {

                                    switch (animatedObject.tileCode) {

                                        case "241":
                                        case "251":
                                        case "261":
                                            this.sounds.coinSound.play()
                                            this.score += 100
                                            this.coins++
                                            break;

                                        case "644":
                                        case "654":
                                        case "664":
                                        case "674":
                                            this.sounds.powerUp.play()
                                            this.player.starTimer = 12
                                            this.player.playerState = "starman"
                                            this.score += 500
                                            setTimeout(() => {
                                                this.sounds.starMan.play()
                                            }, 500)
                                            break


                                        default:
                                            break;
                                    }
                                    this.map.builtMap[item.indexID].tileCode = "1"
                                    this.map.builtMap[item.indexID].updateTileCode()
                                    this.map.animationObjects.splice(index, 1)
                                }
                            });
                            this.map.itemsMap.splice(index, 1)
                        }
                    })
                }

            } else {
                this.sounds.overWorldSound.pause()
                this.sounds.hurryoverWorldSound.pause()
                this.sounds.starMan.pause()
                this.sounds.gameOverSound.play()
                if (this.gameOverCounter === 200) {
                    clearInterval(this.interval)
                }
                this.clear()
                this.map.draw()
                this.enemies.forEach(enemy => enemy.draw())
                this.player.gameOverAnimation()
                this.gameOverCounter++
                setTimeout(() => {
                    if (!this.player.gameOverAnimationStarted) {
                        this.player.velY = 1
                        this.player.posY -= 30
                        this.player.velY -= 15
                        this.player.gameOverAnimationStarted = true
                    }
                    this.applyPhysics(this.player)
                }, 900)
            }

            this.framesCounter % 60 === 0 ? this.time-- : null
            this.framesCounter++

        }, 1000 / this.FPS)
    },

    drawAll() {
        this.map.draw()
        this.enemies.forEach((enemy, index) => {
            enemy.draw()
            enemy.actions()
            enemy.isOutOfCanvas() ? this.enemies.splice(index, 1) : null
        });
        this.player.draw()
        this.drawScore()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },

    isCollisionEnemy(element1, element2) {

        return (
            element1.posY + element1.boxSizeY > element2.posY && // TOP
            element1.posX < element2.posX + element2.boxSizeX && // RIGHT
            element1.posY < element2.posY + element2.boxSizeY && // BOT
            element1.posX + element1.boxSizeX > element2.posX // LEFT
        )
    },
    // Needs refactoring: La importancia de nombrar bien las variables
    isCollisionObstacle(element1, element2, posX, posY) {

        if (element1.enemyState != "air-death") {
            return (
                posY + element1.boxSizeY > element2.posYMap && // TOP
                posX < element2.posXMap + element2.boxSizeX && // RIGHT
                posY < element2.posYMap + element2.boxSizeY && // BOT
                posX + element1.boxSizeX > element2.posXMap // LEFT
            )
        }
    },

    applyPhysics(element) {

        if (this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY + 1)).length != 0 && !this.gameOver) {
            element.posY = this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY + 1))[0].posYMap - 48
            element.posY0 = element.posY
            element.velY = 8
            element.falling = false

            if (element == this.player) {
                element.movementProperty.jumping = false
                element.movementProperty.jumpCounter = 0

                if (element.image.sourceX != 527 && element.image.sourceY != 32) {
                    if (element.movementProperty.direction === "right") {
                        element.image.sourceX = 527
                        element.image.sourceY = 34
                    }
                    else {
                        element.image.sourceX = 508
                        element.image.sourceY = 34
                    }
                }
            }
        } else {
            element.falling = true
            element.posY += element.velY
            element.velY += this.gravity
        }
    },

    move() {

        if (this.keyState.keyRight) {
            this.player.movementProperty.direction = "right"
            this.moveRight()
        }

        if (this.keyState.keyLeft) {
            this.player.movementProperty.direction = "left"
            this.moveLeft()
        }

        if (this.keyState.keyUp && !this.player.movementProperty.jumping) {
            this.jump()
        }

        if (this.keyState.keyUp && this.player.movementProperty.jumping) {
            this.longerJump()
        }

        if (this.checkCollisionTop()) {
            this.player.velY *= -1
        }
    },

    moveRight() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {
            this.player.movementProperty.centered = false
            this.player.walk()

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 10, this.player.posY)).length === 0) {
                this.player.posX += this.velX * 1.5
                this.playerRelativeX++
            }
        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk()

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 10, this.player.posY)).length === 0) {

                this.enemies.forEach(enemy => enemy.posX -= (this.velX * 2))
                this.map.builtMap.forEach(tile => tile.posX -= (this.velX) * .04)
                this.map.obstaclesMap.forEach(obstacle => obstacle.posXMap = obstacle.posX * obstacle.boxSizeX)
                this.map.itemsMap.forEach(item => {
                    item.posXMap = item.posX * item.boxSizeX
                })
                this.scorePainting.forEach(score => score.posX -= (this.velX) * 2.15)
                this.playerRelativeX++
            }
        }
    },

    moveLeft() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {

            this.player.movementProperty.centered = false
            this.player.walk()

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 10, this.player.posY)).length === 0 &&
                this.player.posX > 0) {

                this.player.posX -= this.velX * 1.5
                this.playerRelativeX--
            }
        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk()

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 10, this.player.posY)).length === 0) {

                this.player.posX -= this.velX
                this.playerRelativeX--
            }
        }
    },

    jump() {


        if (this.player.posY == this.player.posY0 && !this.player.movementProperty.jumping) {

            this.player.posY -= 40
            this.player.velY -= 17
            this.player.movementProperty.jumping = true
        }
        this.player.jumpAnimation()
        this.sounds.jump.play()
    },

    longerJump() {
        if (this.player.movementProperty.jumping && this.player.movementProperty.jumpCounter < 100) {
            this.player.movementProperty.jumpCounter++
            this.player.velY -= 0.35
        }
    },

    checkCollisionTop() {

        return this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(this.player, obstacle, this.player.posX, this.player.posY - 10)).length != 0
    },

    checkStomp() {
        // Stomping Enemies
        if (this.enemies.filter(enemy => this.isCollisionEnemy(this.player, enemy, this.player.posX, this.player.posY + 1)).length != 0 &&
            this.player.falling === true && !this.gameOver) {
            this.deleteEnemy()
        }
    },

    deleteEnemy() {
        let currentEnemies = this.enemies.filter(enemy => this.isCollisionEnemy(this.player, enemy, this.player.posX, this.player.posY + 1))
        let erasedEnemyArray
        let clearEnemy = false
        currentEnemies.forEach(enemy => {
            enemy.receiveDamage(this.player.playerState)
            this.addScore(100, enemy.posX, enemy.posY)
            this.score += 100
            if (enemy.enemyState === "dead") {
                clearEnemy = true
                erasedEnemyArray = this.enemies.filter(enemy2 => enemy != enemy2)
            }

        })
        this.player.velY = 12
        this.player.posY -= 20
        this.player.velY -= 20
        this.sounds.stomp.play()
        if (clearEnemy) {
            setTimeout(() => {
                this.enemies = erasedEnemyArray
            }, 400)
        }

    },

    deleteEnemyStar() {
        let currentEnemies = this.enemies.filter(enemy => this.isCollisionEnemy(this.player, enemy, this.player.posX, this.player.posY + 1))
        let erasedEnemyArray
        let clearEnemy = false
        currentEnemies.forEach(enemy => {
            enemy.receiveDamage(this.player.playerState)
            this.addScore(100, enemy.posX, enemy.posY)
            this.score += 100
            if (enemy.enemyState === "dead") {
                clearEnemy = true
                erasedEnemyArray = this.enemies.filter(enemy2 => enemy != enemy2)
            }

        })
        this.sounds.stomp.play()
        if (clearEnemy) {
            setTimeout(() => {
                this.enemies = erasedEnemyArray
            }, 1400)
        }
    },

    setListeners() {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {

                case this.keys.RIGHT:
                case this.keys.D:
                    this.keyState.keyRight = true
                    pressButton(buttons[1])
                    break;

                case this.keys.LEFT:
                case this.keys.A:
                    this.keyState.keyLeft = true
                    pressButton(buttons[3])
                    break

                case this.keys.UP:
                case this.keys.W:
                    this.keyState.keyUp = true
                    pressButton(buttons[0])
                    break

                case this.keys.O:
                    this.keyState.keyUp = true
                    pressButton(buttons[4])
                    break
                
                case this.keys.DOWN:
                case this.keys.S:
                    this.keyState.keyDown = true
                    pressButton(buttons[2])
                    break
                
                case this.keys.K:
                    pressButton(buttons[5])
                    break

                default:
                    break;
            }
        })

        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case this.keys.RIGHT:
                case this.keys.D:
                    this.keyState.keyRight = false
                    releaseButton(buttons[1])
                    break;

                case this.keys.LEFT:
                case this.keys.A:
                    this.keyState.keyLeft = false
                    releaseButton(buttons[3])
                    break

                case this.keys.UP:
                case this.keys.W:
                    this.keyState.keyUp = false
                    releaseButton(buttons[0])
                    break

                case this.keys.O:
                    this.keyState.keyUp = false
                    releaseButton(buttons[4])
                    break
                
                case this.keys.DOWN:
                case this.keys.S:
                    this.keyState.keyDown = false
                    releaseButton(buttons[2])
                    break
                
                case this.keys.K:
                    this.keyState.keyAttack = false
                    releaseButton(buttons[5])
                    break

                default:
                    break;
            }
        })
    },

    addScore(points, posX, posY) {

        let score = {
            points: points,
            posX: posX,
            posY: posY - this.scorePainting.length * 20,
            timer: 30,
        }

        this.scorePainting.push(score)

    },

    drawScore() {

        // Mario Score
        this.ctx.fillStyle = "white"
        this.ctx.font = "30px 'Press Start 2P'"
        this.ctx.fillText("MARIO", 50, 50)
        this.ctx.fillText("x", 50, 80)
        this.ctx.fillText(this.score, 100, 80)

        // Mario Coins
        this.ctx.drawImage(
            this.scoreImg,
            384,
            16,
            16,
            16,
            400,
            25,
            38,
            38
        )
        this.ctx.fillText("x", 450, 60)
        this.ctx.fillText(this.coins, 490, 62)

        // Mario World & Level
        this.ctx.fillText("WORLD", 750, 50)
        this.ctx.fillText(`${this.map.world}-${this.map.level}`, 775, 80)

        // Mario time
        this.ctx.fillText("TIME", 1200, 50)
        this.ctx.fillText(`${this.time}`, 1220, 80)

        // Stomp & Coins Score
        this.scorePainting.forEach(score => {
            this.ctx.font = "15px 'Press Start 2P'"
            this.ctx.fillText(score.points, score.posX, score.posY)
            score.timer--
        })
        this.scorePainting = this.scorePainting.filter(score => score.timer > 0)

    },

    drawCongratulations() {

        this.ctx.fillStyle = "white"
        this.ctx.font = "90px 'Press Start 2P'"
        this.ctx.fillText("CONGRATULATIONS!", 25, 250)

    },


}




