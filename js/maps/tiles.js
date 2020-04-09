
class Tile {

    constructor(ctx, scale, canvasSize, image, tileSize, boxSizeX, boxSizeY, mapArray, posX, posY, player, index) {

        this.indexID = index

        this.ctx = ctx
        this.scale = scale
        this.canvasSize = {
            width: canvasSize.width,
            heigth: canvasSize.heigth
        }

        this.image = image
        this.tileSize = tileSize
        this.boxSizeX = boxSizeX
        this.boxSizeY = boxSizeY
        
        this.mapArray = mapArray

        this.posX = posX //Referred to the Array
        this.posY = posY // Referred to the Array

        this.posXMap = this.posX * this.boxSizeX // Referred to the Actual Position 
        this.posYMap = this.posY * this.boxSizeY // Referred to the Actual Position

        this.tileCode = this.mapArray[this.posY][this.posX]

        if (this.tileCode.length <= 2) {

            this.tileCodeX = parseInt(this.tileCode[0])
            this.tileCodeY = parseInt(this.tileCode[1])

        } else {
            this.tileCodeX = parseInt(this.tileCode.slice(0, 2))
            this.tileCodeY = parseInt(this.tileCode.split('')[2])
        }

        this.player = player
    }

    updateTilePosition() {
        if (this.player.movementProperty.moving &&
            this.player.movementProperty.centered && 
            !this.player.movementProperty.running &&
            this.player.movementProperty.direction === "right" ) {
            this.posX -= this.player.velX
            console.log("BEFORE")
            console.log(this.posXMap)
            this.posXMap = this.posX * this.boxSizeX
            console.log("AFTER")
            console.log(this.posXMap)
        }
    }

    updateTileCode() {
        
        if (this.tileCode.length <= 2) {
            this.tileCodeX = parseInt(this.tileCode[0])
            this.tileCodeY = parseInt(this.tileCode[1])

        } else {
            this.tileCodeX = parseInt(this.tileCode.slice(0, 2))
            this.tileCodeY = parseInt(this.tileCode.split('')[2])
        }
    }

    build() {
        
            this.ctx.fillStyle = "#5c94fc"
            this.ctx.fillRect(
                (this.tileSize * this.scale) * this.posX,
                (this.tileSize * this.scale) * this.posY,
                (this.tileSize * this.scale) + 1,
                (this.tileSize * this.scale) + 1,
            )
        
            this.ctx.drawImage(
                this.image,
                this.tileCodeX * this.tileSize,
                this.tileCodeY * this.tileSize,
                this.tileSize,
                this.tileSize,
                (this.tileSize * this.scale) * this.posX,
                (this.tileSize * this.scale) * this.posY,
                this.boxSizeX,
                this.boxSizeY
            )
    }

}