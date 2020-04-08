// Esto debería estar separado por enemigos. Goompa debería tener un archivo, Turtle otro, y así


class Enemy {

    constructor(ctx, enemyClass, canvasSize, gravity, scale, posX, posY, posY0, velX) {

        this.ctx = ctx
        this.scale = scale

        this.canvasSize = {
            width: canvasSize.width,
            height: canvasSize.height
        }

        this.enemyClass = enemyClass
        this.enemyState = "alive"

        this.spriteWidth = undefined
        this.spriteHeight = undefined
        this.boxSizeX = undefined
        this.boxSizeY = undefined

        this.image = new Image()
        this.image.src = "./img/enemies.png"
        this.image.framesIndex = 0
        this.image.sourceX = undefined
        this.image.sourceY = undefined

        this.posX = posX
        this.posY = posY
        this.posY0 = posY0

        this.velY = 8
        this.velX = velX
        this.gravity = gravity
        this.falling = false

    }

    // Esto podría ser un class Gompa extends Enemy ??? 
    init() {

        switch (this.enemyClass) {
            case "Goompa":
                this.velX = 1
                this.spriteWidth = 16
                this.spriteHeight = 16
                this.boxSizeX = this.spriteWidth * this.scale
                this.boxSizeY = this.spriteHeight * this.scale
                this.image.frames = 2
                this.image.sourceX = 0
                this.image.sourceY = 16
                break;

            default:
                break;
        }
    }

    actions() {

        switch (this.enemyClass) {
            case "Goompa":
                this.enemyState === "alive" ? this.walk() : null
                // this.receiveDamage() // This method should be called upon Collision
                break;

            default:
                break;
        }

    }

    walk() {

        if (this.enemyState === "alive") {

            switch (this.enemyClass) {
                case "Goompa":
                    this.posX -= this.velX
                    this.image.framesIndex += 0.1
                    this.image.framesIndex === 2 ? this.image.framesIndex = 0 : null
                    this.image.sourceX = 0 + this.spriteWidth * Math.floor((this.image.framesIndex % 2))
                    break;

                default:
                    break;
            }
        }

    }

    jump() {


    }

    attack() {

    }

    receiveDamage() {

        switch (this.enemyClass) {
            case "Goompa":
                this.enemyState = "dead"
                this.image.sourceX = 32
                break;

            default:
                break;
        }

    }

    // Esto habrá que revisarlo cuando se mueva la cámara
    isOutOfCanvas() {

        return this.posX + this.boxSizeX < 0 || this.posX > this.canvasSize.width
    }


    draw() {
        this.ctx.drawImage(
            this.image,
            this.image.sourceX,
            this.image.sourceY,
            this.spriteWidth,
            this.spriteHeight,
            this.posX,
            this.posY,
            this.boxSizeX,
            this.boxSizeY
        )
    }

    // applyPhysics() {

    //     // if (this.posY < 624) {
    //     //     this.posY += this.velY
    //     //     this.velY += this.gravity
    //     // }
    //     // else {
    //     //     this.posY0 = 624
    //     //     this.posY = 624
    //     // }

    //     if (this.posY < 624) {
    //         this.falling = true
    //         this.posY += this.velY
    //         this.velY += this.gravity
    //     }
    //     else {
    //         this.falling = false
    //         this.posY = 624
    //         this.velY = 1
    //     }

    // }
}