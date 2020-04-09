// Esto debería estar separado por enemigos. Goompa debería tener un archivo que fuera class Goompa extends Enemy, Turtle otro, y así
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
        this.direction = "left"

        this.spriteWidth = undefined
        this.spriteHeight = undefined
        this.boxSizeX = undefined
        this.boxSizeY = undefined

        this.image = new Image()
        this.image.src = "./img/enemies2.png"
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

            case "Turtle":
                this.velX = 1
                this.spriteWidth = 16
                this.spriteHeight = 24
                this.boxSizeX = this.spriteWidth * this.scale
                this.boxSizeY = this.spriteWidth * this.scale // Esto hay que arreglarlo
                this.image.frames = 2
                this.image.sourceX = 96
                this.image.sourceY = 8
                break;

            default:
                break;
        }
}

    actions() {

        switch (this.enemyClass) {

            case "Goompa":
                this.enemyState === "alive" ? this.walk() : null
                break;
            
            case "Turtle":
                this.enemyState === "alive" ? this.walk() : null
                this.velX > 0 ? this.direction = "left" : this.direction = "right"
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
                
                case "Turtle":
                    if (this.direction === "left") {
                        this.posX -= this.velX
                        this.image.framesIndex += 0.1
                        this.image.framesIndex === 2 ? this.image.framesIndex = 0 : null
                        this.image.sourceX = 96 + this.spriteWidth * Math.floor((this.image.framesIndex % 2))
                        
                    } else {
                        this.posX -= this.velX
                        this.image.framesIndex += 0.1
                        this.image.framesIndex === 2 ? this.image.framesIndex = 0 : null
                        this.image.sourceX = 1488 + this.spriteWidth * Math.floor((this.image.framesIndex % 2))
                    }
                    break
                
                default:
                    break;
            }
        }

    }

    jump() {

    }

    attack() {

    }

    receiveDamage(playerState) {

        if (playerState === "small") {
            switch (this.enemyClass) {
                case "Goompa":
                    this.enemyState = "dead"
                    this.image.sourceX = 32
                    break;

                case "Turtle":
                    if (this.enemyState === "alive") {
                        this.enemyState = "dead"
                        this.image.sourceX = 160
                    }
                    else {
                        this.enemyState = "kicked"
                    }
                    break;

                default:
                    break;
            }
        }
        else if (playerState === "starman") {
            this.velY = 1
            this.posY -= 30
            this.velY -= 15
            this.enemyState = "air-death"
        }

    }

    receiveStarDamage() {

        this.image.sourceX = 629
        this.image.sourceY = 34        

    }

    // Esto habrá que revisarlo cuando se mueva la cámara
    isOutOfCanvas() {

        return this.posX + this.boxSizeX < 0 || this.posY > 750
    }

    draw() {

        switch (this.enemyClass) {
            
            case "Goompa":
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
                break;
            
            case "Turtle":
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
                break;
        
            default:
                break;
        }
    }
}