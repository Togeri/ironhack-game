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

            this.clear()
            this.drawAll()
            

            this.enemies.forEach(enemy => {

                // this.map.updateAvailableObstacles(enemy)
                this.applyPhysics(enemy)

                //Esto tiene que ir dentro de un condicional para chekear las collisiones en top y diferenciarlas del resto
                if (this.isCollisionEnemy(this.player, enemy)) {
                    this.player.image.sourceX = 629
                    this.player.image.sourceY = 34
                }
            })
            // this.map.updateAvailableObstacles(this.player)
            this.applyPhysics(this.player)
            this.move()

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

        console.log(this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY)))

        // this.map.availableObstacles = (this.map.obstaclesMap.filter(obstacle => obstacle.posYMap >= this.player.posY + this.player.boxSizeY))

        // console.log("AVAILABLE PLATFORMS: ", availablePlatforms)


        if (this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY + 1)).length != 0) {
            
            element.posY = this.map.obstaclesMap.filter(obstacle => this.isCollisionObstacle(element, obstacle, element.posX, element.posY + 1))[0].posYMap - 48
            element.posY0 = element.posY
            element.velY = 8
            // element.posY = element.posY
            // console.log(element, element.posY)
            element.failling = false
            
            
        } else {

            console.log("flying")
            element.falling = true
            element.posY += element.velY
            element.velY += this.gravity
            
        }

    },

    move() {

        if (this.keyState.keyRight) {
            this.moveRight()
        }
        if (this.keyState.keyLeft) { 
            this.moveLeft()
        }
    },

    // Esto se tiene que refactorizar a move(direction)
    moveRight() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {
            this.player.movementProperty.centered = false
            this.player.walk("right")
            // Obstacle Checker

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 1, this.player.posY)).length === 0) {

                this.player.posX += this.velX * 1.5
            }
        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk("right")
            console.log(this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 1, this.player.posY)))

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX + 1, this.player.posY)).length === 0) {

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

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 5, this.player.posY)).length === 0) {

                this.player.posX -= this.velX * 1.5
            }
        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk("left")

            if (this.map.obstaclesMap.filter(element => this.isCollisionObstacle(this.player, element, this.player.posX - 5, this.player.posY)).length === 0) {

                this.player.posX -= this.velX
            }
        }
    },

    jump() {


        if (this.player.posY == this.player.posY0) {
            this.player.posY -= 40
            this.player.velY -= 20
        }
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

                    this.jump()
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

                default:
                    break;
            }
        })


    }

}