const game = {

    canvas: undefined,
    ctx: undefined,
    canvasSize: {
        width: undefined,
        height: undefined,
    },

    lifes: 3,

    gameOver: false,

    scale: 3, // LA ESCALA DEL JUEGO ESTÁ A 3X

    FPS: 60,
    framesCounter: 0, // Unused

    background: undefined, //Unused
    player: undefined,
    map: undefined,

    enemies: [],


    velX: 5,
    // gravity: 1.08, //Standard Gravity: Fishes and other flying enemies would have different gravity
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

    interval: undefined,

    playerRelativeX: undefined, //Possible Unnecessary after refactoring
    playerRelativeY: undefined,

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

        // Todo esto son pruebas que luego serán sustituidas por un "mapLoad() method, sobre todo la parte de enemies"
        this.player = new Player(this.ctx, this.canvasSize.width, this.canvasSize.height, this.keys, this.gravity, this.scale)
        this.player.image.onload = () => this.player.draw()

        this.map = new Map(this.ctx, this.scale, this.canvasSize, 1, 1, this.player)
        this.map.init()




        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 1100, 100, 200))
        this.enemies[0].init()
        this.enemies[0].image.onload = () => this.enemies[0].draw()



        this.interval = setInterval(() => {

            this.clear()
            this.drawAll()


            this.enemies.forEach(enemy => {

                if (this.isCollisionEnemy(this.player, enemy)) {

                    this.player.image.sourceX = 629
                    this.player.image.sourceY = 34
                    console.log("damn!")

                }
            })




        }, 1000 / this.FPS)

    },

    drawAll() {
        this.map.draw()
        this.enemies.forEach((enemy, index) => {
            enemy.applyPhysics()
            enemy.draw()
            enemy.actions()
            enemy.isOutOfCanvas() ? this.enemies.splice(index, 1) : null

        });
        this.player.applyPhysics()
        this.player.draw()

        // this.map.obstaclesMap.forEach(obstacle => (this.isFalling(this.player, obstacle)))

    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },



    isCollisionEnemy(element1, element2) {



        return (
            element1.posY + element1.boxSizeY >= element2.posY && // TOP
            element1.posX <= element2.posX + element2.boxSizeX && // RIGHT
            element1.posY <= element2.posY + element2.boxSizeY && // BOT
            element1.posX + element1.boxSizeX >= element2.posX // LEFT
        )


    },


    // Needs refactoring: La importancia de nombrar bien las variables
    isCollisionObstacle(element1, element2, posX) {


        return (
            element1.posY + element1.boxSizeY >= element2.posYMap && // TOP
            posX <= element2.posXMap + element2.boxSizeX && // RIGHT
            element1.posY <= element2.posYMap + element2.boxSizeY && // BOT
            posX + element1.boxSizeX >= element2.posXMap // LEFT
        )


    },

    collisionBot(element1, element2, typeOfElement2) {
        if (condition) {

        } else {

        }
    },

    // isFalling(element1, element2) {

    //     if (element1.posY + element1.boxSizeY >= element2.posYMap) {

    //        element1.posY0 = element2.posYMap

    //     }
    //     // if (element2 instanceof Obstacle) {
    //     //     return element1.posY + element1.boxSizeY >= element2.posYMap
    //     // } else {
    //     //     return element1.posY + element1.boxSizeY >= element2.posY
    //     // }

    // },

    applyPhysics(element) {

        if (isCollisionObstacle(element)) {

        }

    },


    // Esto se tiene que refactorizar a move(direction)
    moveRight() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {
            this.player.movementProperty.centered = false
            this.player.walk("right")
            // Obstacle Checker

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 1)).length === 0) {

                this.player.posX += this.velX * 1.5
            }
        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk("right")

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 1)).length === 0) {

                this.enemies.forEach(enemy => enemy.posX -= (this.velX * 2) + this.velX * 0.1)
                this.map.builtMap.forEach(tile => tile.posX -= (this.velX) * .04)
                this.map.obstaclesMap.forEach(obstacle => obstacle.posXMap = obstacle.posX * obstacle.boxSizeX)
            }
        }
    },

    moveLeft() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {

            this.player.movementProperty.centered = false
            this.player.walk("left")

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 5)).length === 0) {

                this.player.posX -= this.velX * 1.5
            }
        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk("left")

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 5)).length === 0) {

                this.player.posX -= this.velX
            }
        }
    },

    jump() {

        this.player.movementProperty.jumping = true
        this.player.posY -= this.player.jumpForce


        this.player.posY -= (- this.player.jumpForce) + this.gravity
        // this.player.vely -= 1

    },



    setListeners() {

        document.addEventListener("keydown", event => {

            switch (event.keyCode) {
                case this.keys.RIGHT:
                case this.keys.D:

                    this.moveRight() //Se puede refactorizar a move("direction")
                    break;

                case this.keys.LEFT:
                case this.keys.A:

                    this.moveLeft()
                    break

                case this.keys.UP:
                case this.keys.W:

                    this.jump()
                // this.player.velY -= 2

                default:
                    break;
            }
        })

        // Sobre todo para medir el salto
        document.addEventListener("keyup", event => {

            switch (event.keyCode) {
                case this.keys.RIGHT:
                case this.keys.D:

                    break;

                case this.keys.LEFT:
                case this.keys.A:

                    break

                default:
                    break;
            }
        })


    }

}