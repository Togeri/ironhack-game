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
    gravity: 0.4, //Standard Gravity: Fishes and other flying enemies would have different gravity

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
        // this.ctx.scale(this.scale, this.scale) // Either we scale this up or we play a mini Mario in a mini world
        this.start()

    },

    setDimensions() {


        this.canvasSize.width = window.innerWidth   //Esta linea y la 39 creo que sobran
        // this.canvasSize.height = window.innerHeight       // He tenido que hacer una ñapa porque si pongo el innerHeigth se me pone una scrollbar a la derecha como que el canvan ocupa más del window.Heigth
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
            this.collisions()

            this.enemies.forEach(enemy => {
                
                if (this.isCollision(this.player, enemy)) {
                    
                    this.player.image.sourceX = 629
                    this.player.image.sourceY = 34
                    
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
            // this.collisionObject(enemy)
        });
        this.player.applyPhysics()
        // this.collisionObject(this.player)
        this.player.draw()
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },



    

    collisionObject(agent) {

        // Sacamos la posición relativa del agente en cuestión (player or enemy)

        this.agentRelativeX = Math.floor(agent.posX / agent.boxSizeX)
        this.agentRelativeY = Math.floor(agent.posY / agent.boxSizeY)



        if (this.map.obstacleTiles.some(element => element == this.map.mapArray[this.agentRelativeY + 1][this.agentRelativeX] || element == this.map.mapArray[this.agentRelativeY + 1][this.agentRelativeX + 1])) {
            agent.falling = false
            agent.posY0 = agent.boxSizeY * this.agentRelativeY
        } else {
            agent.falling = true
        }





    },

    collisionEnemy(player, enemy) {

    },

    collisions() {



        //Esto tengo que cambiarlo si o si: es para hacer pruebas.
        // this.collisionObject(this.player, this.map.mapArray[this.playerRelativeY + 1][this.playerRelativeX])
        // this.map.mapArray.forEach(element => this.collisionObject(this.player, element))

        this.enemies.forEach(enemy => this.collisionEnemy(this.player, enemy))
    },


    // updateMap() {

    //     if (Math.floor(this.player.posX / this.player.boxSizeX) > 14) {
    //         // this.map.mapDrawIndexXStart = Math.floor(this.player.posX / this.player.boxSizeX) - 14
    //         // this.map.mapDrawIndexXEnd = Math.floor(this.canvasSize.width / this.player.boxSizeX) + this.map.mapDrawIndexXStart
    //         this.player.movementProperty.centered = true

    //     }
    // },



    isCollision(element1, element2) {

        return (
            element1.posY + element1.boxSizeY >= element2.posY && // TOP
            element1.posX <= element2.posX + element2.boxSizeX && // RIGHT
            element1.posY <= element2.posY + element2.boxSizeY && // BOT
            element1.posX + element1.boxSizeX >= element2.posX // LEFT
        )


    },


    // Esto se tiene que refactorizar a move(direction)
    moveRight() { 

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {
            this.player.movementProperty.centered = false
            this.player.posX += this.velX * 1.5
            this.player.walk("right")
            

            if (this.map.obstaclesMap.filter(element => {
                this.isCollision(this.player, element)
            }).length > 0) {
                console.log("YEPA CUIDADO!")
            }


        }
        else {
            this.player.movementProperty.centered = true
            this.player.walk("right")
            this.enemies.forEach(enemy => enemy.posX -= (this.velX * 2) + this.velX * 0.5)
            this.map.builtMap.forEach(tile => tile.posX -= (this.velX) * .05)
            this.map.obstaclesMap.forEach(obstacle => {
                // obstacle.posX -= (this.velX) * .05
                obstacle.posXMap = obstacle.posX * obstacle.boxSizeX
            })
            console.log(this.map.obstaclesMap[0].posX)

            if ((this.map.obstaclesMap.filter(element => this.isCollision(this.player, element)).length > 0)) {
                console.log("YEPA CUIDADO!")
            }
            
            let prueba1 = this.map.obstaclesMap.filter(element => this.isCollision(this.player, element))
            console.log(prueba1)
        }


    },

    moveLeft() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) <= 14) {
            this.player.movementProperty.centered = false
            this.player.posX -= this.velX
            this.player.walk("left")
        }
        else {
            this.player.movementProperty.centered = true
            this.player.posX -= this.velX
            this.player.walk("left")
        }

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
            
                default:
                    break;
            }
        })

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