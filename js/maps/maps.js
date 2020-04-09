class Map {

    constructor(ctx, scale, canvasSize, world, level, player) {

        this.ctx = ctx
        this.scale = scale
        this.canvasSize = {
            width: canvasSize.width,
            height: canvasSize.height
        }

        this.world = world
        this.level = level

        this.mapIdentifier = undefined
        this.image = undefined

        this.tileSize = 16

        this.boxSizeX = this.tileSize * this.scale
        this.boxSizeY = this.tileSize * this.scale

        this.mapArray = undefined

        this.player = player

        // Tiles the Player Can't Interact with 
        this.backgroundTiles = ["1", "410", "420", "430", "411", "421", "431", "441", "451", "461", "850", "860", "870", "851", "861", "871"]
        // Tiles the Player Can Interact with 
        this.obstacleTiles = ["00", "10", "20", "30", "240", "250", "260", "270", "330", "340", "331", "341", "350", "360", "370", "351", "361", "371", ]
        // Tiles that need individual animations
        this.animatedTiles = ["240", "250", "260"]
        // Tiles that Mario can Collect
        this.itemTiles = ["241", "251", "261", "644", "654", "664", "674"]

        // Animation Class made for Objects
        this.animationObjects = []

        this.mapDrawIndexXStart = 0
        this.mapDrawIndexXEnd = Math.floor(this.canvasSize.width / this.boxSizeX)
        this.mapDrawIndexYStart = 0
        this.mapDrawIndexYEnd = Math.floor(this.canvasSize.height / this.boxSizeY)

        this.posXmap = 0
        this.posYmap = 0

        this.builtMap = []
        this.obstaclesMap = []
        this.itemsMap = []
    }

    init() {

        this.mapIdentifier = `map-${this.world}-${this.level}`
        this.image = new Image()
        this.image.src = `img/tileset3.png`
        this.mapArray = map_1_1
        let index = 0;

        for (let posY = 0; posY < this.mapArray.length; posY++) {
            for (let posX = 0; posX < this.mapArray[posY].length; posX++) {
                
                this.builtMap.push(new Tile(this.ctx, this.scale, this.canvasSize, this.image, this.tileSize, this.boxSizeX, this.boxSizeY, this.mapArray, posX, posY, this.player, index))
                this.animatedTiles.includes(this.builtMap[index].tileCode) ? this.createAnimationObjects(this.builtMap[index]) : null
                this.obstacleTiles.includes(this.builtMap[index].tileCode) ? this.obstaclesMap.push(this.builtMap[index]) : null

                if (this.itemTiles.includes(this.builtMap[index].tileCode)) {
                    this.createAnimationObjects(this.builtMap[index])
                    this.itemsMap.push(this.builtMap[index])
                }
                index++
            }        
        }    
    }

    draw() {
       
        this.animationObjects.forEach(tileObject => tileObject.animateFrame())
        this.builtMap.forEach(tileObject => tileObject.build())     
    }

    createAnimationObjects(referencedTile) {

        switch (referencedTile.tileCode) {
            
            case "240":
                this.animationObjects.push(new AnimationObject(this, map_1_1, "Question Box", this.ctx, referencedTile.posX, referencedTile.posY, this.tileSize, referencedTile, referencedTile.indexID))
                break;
            
            case "241":
                this.animationObjects.push(new AnimationObject(this, map_1_1, "Big Coin", this.ctx, referencedTile.posX, referencedTile.posY, this.tileSize, referencedTile, referencedTile.indexID))
            
            case "644":
                this.animationObjects.push(new AnimationObject(this, map_1_1, "Super Star", this.ctx, referencedTile.posX, referencedTile.posY, this.tileSize, referencedTile, referencedTile.indexID))

                
            default:
                break;
        }
    }
}