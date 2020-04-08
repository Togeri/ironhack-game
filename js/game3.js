const game = {

    canvas: undefined,
    ctx: undefined,
    canvasSize: {
        width: undefined,
        height: undefined,
    },

    lifes: 3,

    score: 0,

    gameOver: false,

    scale: 3, // LA ESCALA DEL JUEGO ESTÁ A 3X

    FPS: 60,
    framesCounter: 0, // Unused

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
    },

    interval: undefined,

    playerRelativeX: 0, 
    playerRelativeY: undefined,

    sounds: {
        gameOverSound: new Audio("./sounds/music/08-you-re-dead.mp3"),
        coinSound: new Audio("./sounds/sfx/coin.wav"),

    },


    gameOverCounter: 0,

    init() {

        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")
        this.setDimensions()
        this.setListeners()
        this.start()
    },

    setDimensions() {

        this.canvasSize.width = window.innerWidth   //Esta linea y la 39 creo que sobran
        this.canvasSize.height = window.innerHeight - 5    // He tenido que hacer una ñapa porque si pongo el innerHeigth se me pone una scrollbar a la derecha como que el canvan ocupa más del window.Heigth
        this.canvas.width = this.canvasSize.width
        this.canvas.height = this.canvasSize.height
    },

    start() {

        // ---------------Todo esto son pruebas que luego serán sustituidas por un "mapLoad() method, sobre todo la parte de enemies"
        this.player = new Player(this.ctx, this.canvasSize.width, this.canvasSize.height, this.keys, this.gravity, this.scale)
        this.player.image.onload = () => this.player.draw()

        this.map = new Map(this.ctx, this.scale, this.canvasSize, 1, 1, this.player)
        this.map.init()

        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 1100, 100, 624))
        this.enemies[0].init()
        this.enemies[0].image.onload = () => this.enemies[0].draw()

        // ---------------Hasta aqui --- Todo son pruebas 

        this.interval = setInterval(() => {

            if (!this.gameOver) {
                if (this.playerRelativeX >= 1010) {
                    alert("WON!")

                } else {
                    this.clear()
                    this.drawAll()
                    this.enemies.forEach(enemy => {
                        this.applyPhysics(enemy)
                        this.isCollisionEnemy(this.player, enemy) ? this.gameOver = true : null
                    })
                    this.applyPhysics(this.player)
                    this.move()
                    console.log(this.map.itemsMap)
                    this.map.itemsMap.forEach((item, index) => {

                        if (this.isCollisionObstacle(this.player, item, this.player.posX, this.player.posY)) {
                            let itemID = `${item.posY}-${item.posX}`
                            this.map.animationObjects.forEach((animatedObject, index) => {
                                
                                if (animatedObject.ID == itemID) {

                                    switch (animatedObject.tileCode) {

                                        case "241":
                                        case "251":
                                        case "261":
                                            this.sounds.coinSound.play()
                                            this.score++
                                            break;
                                    
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
                if (this.gameOverCounter === 200) {
                    clearInterval(this.interval)
                }
                this.clear()
                this.map.draw()
                this.enemies.forEach(enemy => enemy.draw())
                this.player.gameOverAnimation()
                this.sounds.gameOverSound.play()
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

        return (
            posY + element1.boxSizeY > element2.posYMap && // TOP
            posX < element2.posXMap + element2.boxSizeX && // RIGHT
            posY < element2.posYMap + element2.boxSizeY && // BOT
            posX + element1.boxSizeX > element2.posXMap // LEFT
        )
    },

    applyPhysics(element) {

        

        if (this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY + 1)).length != 0 && !this.gameOver) {
            element.posY = this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY + 1))[0].posYMap - 48
            element.posY0 = element.posY
            element.velY = 8
            element.failling = false

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

    // Esto se tiene que refactorizar a move(direction)
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

                this.enemies.forEach(enemy => enemy.posX -= (this.velX * 2) + this.velX * 0.1)
                this.map.builtMap.forEach(tile => tile.posX -= (this.velX) * .04)
                this.map.obstaclesMap.forEach(obstacle => obstacle.posXMap = obstacle.posX * obstacle.boxSizeX)
                this.playerRelativeX++
            }
        }
    },

    moveLeft() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {

            this.player.movementProperty.centered = false
            this.player.walk()

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 10, this.player.posY)).length === 0) {

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


    setListeners() {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {

                case this.keys.RIGHT:
                case this.keys.D:

                    this.keyState.keyRight = true
                    break;

                case this.keys.LEFT:
                case this.keys.A:

                    this.keyState.keyLeft = true
                    break

                case this.keys.UP:
                case this.keys.W:

                    this.keyState.keyUp = true
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
                    break;

                case this.keys.LEFT:
                case this.keys.A:

                    this.keyState.keyLeft = false
                    break

                case this.keys.UP:
                case this.keys.W:

                    this.keyState.keyUp = false
                    break

                default:
                    break;
            }
        })
    },

}