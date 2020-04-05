const game = {

    canvas: undefined,
    ctx: undefined,
    canvasSize: {
        width: undefined,
        height: undefined,
    },
    scale: 3, // LA ESCALA DEL JUEGO ESTÁ A 3X

    FPS: 60,
    framesCounter: 0,

    background: undefined,
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
        this.canvasSize.height = window.innerHeight -5    // He tenido que hacer una ñapa porque si pongo el innerHeigth se me pone una scrollbar a la derecha como que el canvan ocupa más del window.Heigth
        this.canvas.width = this.canvasSize.width
        this.canvas.height = this.canvasSize.height
    },

    start() {
        
        // Todo esto son pruebas que luego serán sustituidas por un "mapLoad() method, sobre todo la parte de enemies"

        this.map = new Map(this.ctx, this.scale, this.canvasSize, 1, 1)
        this.map.init()
        this.map.build()



        this.player = new Player(this.ctx, this.canvasSize.width, this.canvasSize.height, this.keys, this.gravity, this.scale)
        this.player.image.onload = () => this.player.draw()

        this.enemies.push(new Enemy(this.ctx, "Goompa", this.canvasSize, this.gravity, this.scale, 800, 100, 100))
        this.enemies[0].init()
        this.enemies[0].image.onload = () => this.enemies[0].draw()

        

        this.interval = setInterval(() => {
            this.clear()
            this.drawAll()
        }, 1000 / this.FPS)

    },

    drawAll() {
        this.map.draw()
        this.enemies.forEach(enemy => {
            enemy.draw()
            enemy.actions()
        });

        this.player.draw()
    },

    clear() {
        this.ctx.clearRect(0,0, this.canvasSize.width, this.canvasSize.height)
    }

}