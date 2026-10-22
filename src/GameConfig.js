const defaultGameConfig = {
    width: 860,
    height: 480,
}

class GameConfig{
    constructor(config){
        this.canvas = document.getElementById(config.canvasId)
        this.canvas.width = config.width
        this.canvas.height = config.height
        this.width = config.width
        this.height = config.height
    }
    setCanvas(canvasId){
        let htmlCanvas = document.getElementById(canvasId)
        if (htmlCanvas==null){
            console.log(`cannot set new canvas with id ${canvasId}, got null`);
            return
        }
        this.canvas = htmlCanvas
    }
    setWidth(width){
        this.width = width
        this.canvas.width = width
    }
    setHeight(height){
        this.height = height
        this.canvas.height = height
    }

}

export {GameConfig, defaultGameConfig}