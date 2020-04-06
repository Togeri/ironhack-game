class AnimationObject {

    constructor(mapObject, currentMap, tileType, ctx, posX, posY) {

        this.ID = `${posY}-${posX}`
        this.mapObject = mapObject
        this.currentMap = currentMap
        this.tileType = tileType
        this.ctx = ctx
        this.posX = posX
        this.posY = posY

        this.tileIndex = 0
        this.tileModule = undefined
        this.tileCode = currentMap[posY][posX]

        this.animationMode = "forward"
    }

    animateFrame() {

        switch (this.tileType) {
            case "Question Box":

                this.tileModule = 3
                
                if (this.tileCode !== 31 && this.animationMode === "forward") {
                    this.tileIndex += 0.102
                    this.tileIndex < 3 ? this.currentMap[this.posY][this.posX] = (this.tileCode + Math.floor((this.tileIndex % this.tileModule))) : this.animationMode = "backwards"
                } else if (this.tileCode !== 31 && this.animationMode === "backwards") {
                    this.tileIndex -= 0.102
                    this.tileIndex > 0 ? this.currentMap[this.posY][this.posX] = (this.tileCode + Math.floor((this.tileIndex % this.tileModule))) : this.animationMode = "forward"
                } else {

                }
                break;
        
            
            
            default:
                break;
        }

    }

}






// const tileAnimation = (mapObject, currentMap, tileType, ctx, posX, posY) => {

//     let tileIndex = 0
//     let tileModule = undefined
//     let tileCode = currentMap[posY][posX]

//    switch (tileType) {
//        case "Question Box":
//            if (tileCode !== 31) {
//                console.log(tileIndex)
//                tileModule = 3
//                tileIndex += 1
//             //    if (tileIndex > tileModule) {
//             //        tileIndex = 0
//             //    }
//                console.log(tileIndex)

//            } else {
//                console.log("Blocked Tile")
//            }
//            break;
   
//        default:
//            break;
//    }

// }