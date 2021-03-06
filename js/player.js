class Player {

    constructor(ctx, gameW, gameH, keys, gravity, scale) {

        this.ctx = ctx
        this.scale = scale

        this.gameWidth = gameW
        this.gameHeight = gameH

        this.spriteWidth = 16   // Important! 
        this.spriteHeight = 16  // This will change upon Mario States from 16x16 to 16x32 (only applies to height)
        this.boxSizeX = this.spriteWidth * this.scale
        this.boxSizeY = this.spriteHeight * this.scale

        this.image = new Image()
        this.image.src = "./img/mario-full3.png"

        this.image.frames = 4
        this.image.framesIndex = 0
        this.image.framesIndexY = 0
        this.image.sourceX = 527
        this.image.sourceY = 34

        this.posX = 600
        this.posY = 100
        this.posY0 = 700

        this.keys = keys

        this.movementProperty = {
            direction: "right",
            running: false,
            moving: false, // ??
            jumping: false,
            centered: false,
            jumpCounter: 0
        }

        this.velY = 1
        this.velX = 5
        this.gravity = gravity
        this.falling = false

        this.playerState = "small" // Controlling Mario's States
        this.starTimer = 0

        this.fireBalls = []

        this.gameOverAnimationStarted = false
        this.gameWonAnimationStarted = false
        this.winAnimationCastleStarted = false
    }

    draw() {

        if (this.movementProperty.centered) {
            this.ctx.drawImage(
                this.image,
                this.image.sourceX,
                this.image.sourceY,
                this.spriteWidth,
                this.spriteHeight,
                this.gameWidth / 2,
                this.posY,
                this.boxSizeX,
                this.boxSizeY
            )
        } else {
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
    }

    //Animacion
    walk() {
        //Falta añadir estado Mario Grande
        if (!this.movementProperty.jumping) {

                switch (this.movementProperty.direction) {
    
                    case "right":
                        this.movementProperty.moving = true
                        this.image.framesIndex += 0.5
                        this.image.framesIndex == 4 ? this.image.framesIndex = 0 : null
                        this.image.sourceX = 527 + this.spriteWidth * (Math.floor(this.image.framesIndex) % 4) + this.image.framesIndex
                        break
    
                    case "left":
                        this.movementProperty.moving = true
                        this.image.framesIndex -= 0.5
                        this.image.framesIndex == -4 ? this.image.framesIndex = 0 : null
                        this.image.sourceX = 508 + this.spriteWidth * (Math.floor(this.image.framesIndex % 4)) + this.image.framesIndex
                        break
                    
                    default:
                        break
                }
          
        }
    }

    jumpAnimation() {

        switch (this.movementProperty.direction) {
            case "right":
                this.image.sourceX = 612
                break;
        
            case "left":
                this.image.sourceX = 423
                break;
            default:
                break;
        }

    }

    starmanAnimation() {

        this.image.framesIndexY += 0.5
        this.image.framesIndexY == 5 ? this.image.framesIndexY = 0 : null
        this.image.sourceY = 34 + 64 * (Math.floor(this.image.framesIndexY % 5))

    }

    gameOverAnimation() {
        this.image.sourceX = 629
        this.image.sourceY = 34
        this.draw()
    }

    winAnimationFlag() {
        this.movementProperty.centered = false
    
        if (this.posY < 624) {
            this.image.sourceX = 646
            this.posY +=3
        }
        else {
            this.movementProperty.jumping = false
            // this.posX = 800 + 48
        }
    }

    winAnimationCastle() {

        if (this.posX < 1056) {
            this.posX += 4
            this.walk("right")
        }
    }
}