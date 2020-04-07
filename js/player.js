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
        this.image.src = "./img/mario-full.png"

        this.image.frames = 4
        this.image.framesIndex = 0
        this.image.sourceX = 527
        this.image.sourceY = 34

        this.posX = this.spriteWidth * 3 * this.scale - this.spriteWidth
        // this.posY = this.gameHeight - 168
        this.posY = 100
        this.posY0 = 700

        this.keys = keys

        this.movementProperty = {
            direction: "right",
            running: false,
            moving: false, // ??
            jumping: false,
            centered: false
        }

        this.velY = 1
        this.velX = 5
        this.gravity = gravity

        this.playerState = undefined // Controlling Mario's States

        this.fireBalls = []


        this.setListeners()

    }

    draw() {
        // Si no pongo el onload la imagen no me carga (linea 59 de game.js)
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
    walk(direction) { //Faltaría añadir derrape
        //El error tiene que estar aqui
        
        switch (direction) {
            case "right":
                this.movementProperty.moving = true
                this.image.framesIndex++
                this.image.framesIndex == 4 ? this.image.framesIndex = 0 : null
                this.image.sourceX = 527 + this.spriteWidth * (this.image.framesIndex % 4) + this.image.framesIndex

                break
        
            case "left":
                this.movementProperty.moving = true
                this.image.framesIndex--
                this.image.framesIndex == -4 ? this.image.framesIndex = 0 : null
                this.image.sourceX = 508 + this.spriteWidth * (this.image.framesIndex % 4) + this.image.framesIndex
                break
            default:
                break
        }

    }

    applyPhysics() {

        if (this.posY < 624) {
            this.posY += this.velY
            this.velY += this.gravity
        }
        else {
            this.posY0 = 624
            this.posY = 624
        }
    }




    setListeners() {

        //Mario Moving Listener
        // document.addEventListener("keydown", event => {

        //     switch (event.keyCode) {

        //         case this.keys.RIGHT:
        //         case this.keys.D:
        //             this.posX += this.velX
        //             this.movementProperty.direction = "right"
        //             this.movementProperty.moving = true
        //             // console.log(this.movementProperty.direction)
        //             // this.movementProperty.running = false // For later
        //             this.walk(this.movementProperty.direction)
        //             break
                
        //         case this.keys.LEFT:
        //         case this.keys.A:
        //             this.posX -= this.velX
        //             this.movementProperty.direction = "left"
        //             this.movementProperty.moving = true
        //             console.log(this.movementProperty.direction)
        //             // this.movementProperty.running = false
        //             this.walk(this.movementProperty.direction)
        //             break
            
        //         default:
        //             break
        //     }
        // })

        // document.addEventListener("keyup", event => {

        //     switch (event.keyCode) {
                
        //         case this.keys.RIGHT:
        //         case this.keys.D:
        //             this.movementProperty.moving = false
                    
        //             break;
            
        //         default:
        //             break;
        //     }
        // })
    }

    //     // Mario Still Listener
    //     document.addEventListener("keyup", event => {

    //         switch (event.keyCode) {
    //             case this.keys.D:
    //             case this.keys.RIGHT:
                    
    //                 // if (this.movementProperty.moving && this.movementProperty.direction === "right") {
    //                 //     this.movementProperty.moving = false
    //                 //     this.image.sourceX = 527
    //                 // }
                    
    //                 if (
    //                     this.movementProperty.direction === "right" &&
    //                     !this.movementProperty.running &&
    //                     !this.movementProperty.moving &&
    //                     !this.movementProperty.jumping
    //                 ) {
    //                     this.movementProperty.moving = false
    //                     this.image.sourceX = 527

    //                 } 



    //                 break

    //             case this.keys.LEFT:
    //             case this.keys.A:

    //                 // if (this.movementProperty.moving && this.movementProperty.direction === "left") {
    //                 //     this.movementProperty.moving = false
    //                 //     this.image.sourceX = 508
    //                 // }

    //                 if (
    //                     this.movementProperty.direction === "left" &&
    //                     !this.movementProperty.running &&
    //                     !this.movementProperty.moving &&
    //                     !this.movementProperty.jumping
    //                 ) {
    //                     this.image.sourceX = 508
    //                 }
                    
    //                 break

    //             default:
    //                 break
    //         }

    //         // this.marioStill()
    //     })

    // }


    // marioStill() {
        
    //     if (
    //         this.movementProperty.direction === "right" &&
    //         !this.movementProperty.running &&
    //         !this.movementProperty.moving &&
    //         !this.movementProperty.jumping
    //     ) {
    //         this.movementProperty.moving = false
    //         this.image.sourceX = 527
            
    //     } else if (
    //         this.movementProperty.direction === "left" &&
    //         !this.movementProperty.running &&
    //         !this.movementProperty.moving &&
    //         !this.movementProperty.jumping
    //     ) {
    //         this.image.sourceX = 508
    //     }
    // }

}