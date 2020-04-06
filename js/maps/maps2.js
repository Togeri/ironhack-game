// import { map_1 } from "./map-1-1.js"; //Me da error CORS


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
        this.backgroundTiles = [1, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
        // Tiles the Player Can Interact with 
        this.obstacleTiles = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31]

        // Animation Class made for Objects
        this.animationObjects = []

        this.mapDrawIndexXStart = 0
        this.mapDrawIndexXEnd = Math.floor(this.canvasSize.width / this.boxSizeX)
        this.mapDrawIndexYStart = 0
        this.mapDrawIndexYEnd = Math.floor(this.canvasSize.height / this.boxSizeY)


        this.posXmap = 0
        this.posYmap = 0




    }

    init() {
        this.mapIdentifier = `map-${this.world}-${this.level}`
        this.image = new Image()
        this.image.src = `img/tileset.png`
        this.mapArray = map_1_1
        this.createAnimationObjects()
    }




    draw() {

        this.posXmap = 0
        this.posYmap = 1

        switch (this.mapIdentifier) {


            case "map-1-1":
                // for (let posY = this.mapDrawIndexYStart; posY < this.mapDrawIndexYEnd; posY++) {
                //     for (let posX = this.mapDrawIndexXStart; posX < this.mapDrawIndexXEnd; posX++) {


                for (let posY = 0; posY < map_1_1.length; posY++) {
                    for (let posX = 0; posX < map_1_1[posY].length; posX++) {

                        switch (map_1_1[posY][posX]) {
                            case 1:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 2:
                                this.build("Floor", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 3:
                                this.build("Brick 1", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)

                                break;
                            case 4:
                                this.build("Brick 2", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)

                                break;

                            case 6:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Tube Up Top Left", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 7:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Tube Up Top Right", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 8:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Tube Up Bot Left", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 9:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Tube Up Bot Right", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 16:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Hill 1", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 17:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Hill 2", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 18:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Hill 3", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 19:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Hill 4", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 20:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Hill 5", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 21:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Hill 6", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 22:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Grass 1", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 23:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Grass 2", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 24:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Grass 3", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            // case 25:
                            //     this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                            //     this.build("Cloud 1", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                            //     break;
                            // case 26:
                            //     this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                            //     this.build("Cloud 2", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                            //     break;
                            // case 27:
                            //     this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                            //     this.build("Cloud 3", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                            //     break;

                            case 28:
                                this.build("Question Box 1", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.animationObjects.filter(element => element.ID === `${posY}-${posX}`)[0].animateFrame()
                                break;
                            case 29:
                                this.build("Question Box 2", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.animationObjects.filter(element => element.ID === `${posY}-${posX}`)[0].animateFrame()

                                break;
                            case 30:
                                this.build("Question Box 3", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.animationObjects.filter(element => element.ID === `${posY}-${posX}`)[0].animateFrame()

                                break;
                            case 31:
                                this.build("Question Box 4", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;

                            case 32:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Cloud Top Left", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 33:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Cloud Top Center", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 34:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Cloud Top Right", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 35:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Cloud Bot Left", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 36:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Cloud Bot Center", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;
                            case 37:
                                this.build("Sky", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                this.build("Cloud Bot Right", posX, posY, this.mapDrawIndexXStart, this.mapDrawIndexYStart)
                                break;


                            default:
                                break;
                        }

                        this.posXmap++
                    }


                    this.posYmap++
                }
                break;

            default:
                break;
        }
    }

    build(element, posX, posY, positionXSetOff, positionYSetOff) {

        switch (element) {

            case "Sky":
                this.ctx.fillStyle = "#5c94fc"
                this.ctx.fillRect(
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    (this.tileSize * this.scale),
                    (this.tileSize * this.scale),
                )
                break

            case "Floor":
                this.ctx.drawImage(
                    this.image,
                    0,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Brick 1":
                this.ctx.drawImage(
                    this.image,
                    16,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Brick 2":
                this.ctx.drawImage(
                    this.image,
                    32,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Hill 1":
                this.ctx.drawImage(
                    this.image,
                    128,
                    128,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Hill 2":
                this.ctx.drawImage(
                    this.image,
                    144,
                    128,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Hill 3":
                this.ctx.drawImage(
                    this.image,
                    160,
                    128,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Hill 4":
                this.ctx.drawImage(
                    this.image,
                    128,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Hill 5":
                this.ctx.drawImage(
                    this.image,
                    144,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Hill 6":
                this.ctx.drawImage(
                    this.image,
                    160,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Grass 1":
                this.ctx.drawImage(
                    this.image,
                    176,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break


            case "Grass 2":
                this.ctx.drawImage(
                    this.image,
                    192,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Grass 3":
                this.ctx.drawImage(
                    this.image,
                    208,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Tube Up Top Left":
                this.ctx.drawImage(
                    this.image,
                    0,
                    128,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Tube Up Top Right":
                this.ctx.drawImage(
                    this.image,
                    16,
                    128,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Tube Up Bot Left":
                this.ctx.drawImage(
                    this.image,
                    0,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Tube Up Bot Right":
                this.ctx.drawImage(
                    this.image,
                    16,
                    144,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Question Box 1":
                this.ctx.drawImage(
                    this.image,
                    384,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Question Box 2":
                this.ctx.drawImage(
                    this.image,
                    400,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Question Box 3":
                this.ctx.drawImage(
                    this.image,
                    416,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Question Box 4":
                this.ctx.drawImage(
                    this.image,
                    432,
                    0,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Cloud Top Left":
                this.ctx.drawImage(
                    this.image,
                    0,
                    320,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Cloud Top Center":
                this.ctx.drawImage(
                    this.image,
                    16,
                    320,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Cloud Top Right":
                this.ctx.drawImage(
                    this.image,
                    32,
                    320,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Cloud Bot Left":
                this.ctx.drawImage(
                    this.image,
                    0,
                    336,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Cloud Bot Center":
                this.ctx.drawImage(
                    this.image,
                    16,
                    336,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break

            case "Cloud Bot Right":
                this.ctx.drawImage(
                    this.image,
                    32,
                    336,
                    this.tileSize,
                    this.tileSize,
                    (this.tileSize * this.scale) * (posX - positionXSetOff),
                    (this.tileSize * this.scale) * (posY - positionYSetOff),
                    this.boxSizeX,
                    this.boxSizeY
                )
                break


            default:
                break
        }
    }

    createAnimationObjects() {
        switch (this.mapIdentifier) {
            case "map-1-1":
                for (let posY = 0; posY < map_1_1.length; posY++) {
                    for (let posX = 0; posX < map_1_1[posY].length; posX++) {
                        switch (map_1_1[posY][posX]) {
                            case 1:
                                break;
                            case 2:
                                break;
                            case 3:

                                break;
                            case 4:

                                break;

                            case 6:
                                break;
                            case 7:
                                break;
                            case 8:
                                break;
                            case 9:
                                break;
                            case 16:
                                break;
                            case 17:
                                break;
                            case 18:
                                break;
                            case 19:
                                break;
                            case 20:
                                break;
                            case 21:
                                break;
                            case 22:
                                break;
                            case 23:
                                break;
                            case 24:
                                break;

                            case 28:
                                this.animationObjects.push(new AnimationObject(this, map_1_1, "Question Box", this.ctx, posX, posY, this.tileSize))
                                break;
                            case 29:
                                break;
                            case 30:
                                break;
                            case 31:
                                break;


                            default:
                                break;
                        }
                    }
                }
                break;

            default:
                break;
        }
    }

}