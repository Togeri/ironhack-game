const game = {

    canvas: undefined,
    ctx: undefined,
    canvasSize: {
        width: undefined,
        height: undefined,
    },
    scale: 3, // LA ESCALA DEL JUEGO ESTÁ A 3X

    FPS: 60,
    framesCounter: 0, // Unused

    background: undefined, //Unused
    player: undefined,
    map: undefined,

    enemies: [],

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

    playerRelativeX: undefined,
    playerRelativeY: undefined,

    init() {

        this.canvas = document.querySelector("#canvas")
        this.ctx = this.canvas.getContext("2d")
        this.setDimensions()
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




        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 1100, 100, 100))
        this.enemies[0].init()
        this.enemies[0].image.onload = () => this.enemies[0].draw()



        this.interval = setInterval(() => {
            this.clear()
            this.drawAll()
            this.collisions()
            this.updateMap()
        }, 1000 / this.FPS)

    },

    drawAll() {
        this.map.draw()
        this.enemies.forEach((enemy, index) => {
            enemy.applyPhysics()
            enemy.draw()
            enemy.actions()
            enemy.isOutOfCanvas() ? this.enemies.splice(index, 1) : null
            this.collisionObject(enemy)
        });
        this.player.applyPhysics()
        this.collisionObject(this.player)
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


    updateMap() {

        if (Math.floor(this.player.posX / this.player.boxSizeX) > 14) {
            // this.map.mapDrawIndexXStart = Math.floor(this.player.posX / this.player.boxSizeX) - 14
            // this.map.mapDrawIndexXEnd = Math.floor(this.canvasSize.width / this.player.boxSizeX) + this.map.mapDrawIndexXStart
            this.player.movementProperty.centered = true

        }
    }

}