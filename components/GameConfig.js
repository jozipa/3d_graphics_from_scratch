const defaultGameConfig = {
    width: 860,
    height: 480,
    FOREGROUND: '#50FF50',
    BACKGROUND: '#101010',
}

class GameConfig{
    constructor(config){
        this.canvas = document.getElementById(config.canvasId)
        this.canvas.width = config.width
        this.canvas.height = config.height
        this.width = config.width
        this.height = config.height
        this.BACKGROUND = '#101010'
        this.FOREGROUND = '#50FF50'

        this.forPicker = document.getElementById("foreground")
        this.backPicker = document.getElementById('background')

        this.forPicker.addEventListener('input', (e) => {
            this.FOREGROUND = e.target.value; 
        });

        this.backPicker.addEventListener('input', (e) => {
            this.BACKGROUND = e.target.value; 
        });
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