class AnimationObject {

    constructor(mapObject, currentMap, tileType, ctx, posX, posY, tileSize, referencedTile, indexID) {

        this.ID = `${posY}-${posX}`
        this.indexID = indexID
        this.mapObject = mapObject
        this.currentMap = currentMap
        this.tileType = tileType
        this.ctx = ctx
        this.posX = posX
        this.posY = posY

        this.tileSize = tileSize

        this.referencedTile = referencedTile

        this.tileIndex = 0
        this.tileModule = undefined
        this.tileCode = currentMap[posY][posX]

        this.animationMode = "forward"
        this.coinStatus = "active"
    }

    animateFrame() {

        switch (this.tileType) {

            case "Question Box":
        
                this.tileModule = 3

                if (this.tileCode !== "270" && this.animationMode === "forward") {
    
                    this.tileIndex += 0.086

                    if (this.tileIndex < 3) {

                        this.currentMap[this.posY][this.posX] = (parseInt(this.tileCode) + (Math.floor((this.tileIndex % this.tileModule)) * 10)).toString()
                        this.referencedTile.tileCode = this.currentMap[this.posY][this.posX]
                        this.referencedTile.updateTileCode()

                    } else {

                        this.animationMode = "backwards"
                    }

                } else if (this.tileCode !== "270" && this.animationMode === "backwards") {
                    
                    this.tileIndex -= 0.086

                    if (this.tileIndex > 0) {

                        this.currentMap[this.posY][this.posX] = (parseInt(this.tileCode) + (Math.floor((this.tileIndex % this.tileModule)) * 10)).toString()
                        this.referencedTile.tileCode = this.currentMap[this.posY][this.posX]
                        this.referencedTile.updateTileCode()

                    } else {

                        this.animationMode = "forward"
                    }     
                }
                break;
            
            case "Big Coin":

                this.tileModule = 3

                if (this.animationMode === "forward" && this.coinStatus === "active") {

                    this.tileIndex += 0.086

                    if (this.tileIndex < 3) {

                        this.currentMap[this.posY][this.posX] = (parseInt(this.tileCode) + (Math.floor((this.tileIndex % this.tileModule)) * 10)).toString()
                        this.referencedTile.tileCode = this.currentMap[this.posY][this.posX]
                        this.referencedTile.updateTileCode()

                    } else {

                        this.animationMode = "backwards"
                    }

                } else if (this.animationMode === "backwards" && this.coinStatus === "active") {

                    this.tileIndex -= 0.086

                    if (this.tileIndex > 0) {

                        this.currentMap[this.posY][this.posX] = (parseInt(this.tileCode) + (Math.floor((this.tileIndex % this.tileModule)) * 10)).toString()
                        this.referencedTile.tileCode = this.currentMap[this.posY][this.posX]
                        this.referencedTile.updateTileCode()

                    } else {

                        this.animationMode = "forward"
                    }
                }
                break;
            
            case "Super Star":
                
                this.tileModule = 3

                this.tileIndex += 0.086

                if (this.tileIndex < 3) {
                    this.currentMap[this.posY][this.posX] = (parseInt(this.tileCode) + (Math.floor((this.tileIndex % this.tileModule)) * 10)).toString()
                        this.referencedTile.tileCode = this.currentMap[this.posY][this.posX]
                        // this.referencedTile.updateTileCode()   
                }
                else {
                    this.tileIndex = 0
                }
                
                break
        
            default:
                break;
        }
    }
}