import { hasMethods } from "../components/utils.js"

class Mouse{
    constructor(game, camera){
        this.x = 0
        this.y = 0
        this.lastX = 0
        this.lastY = 0
        
        this.isDownL = false
        this.isDownR = false
        this.dx = 0
        this.dy= 0
        this.targetElement = camera
        this.invertAxis = -1

        game.addEventListener("contextmenu", (e) => {
            this.contextMenu(e)
        });

        game.addEventListener('mousedown', (e) => {
            this.mouseDown(e)
        })

        window.addEventListener('mouseup', () => {
            this.mouseUp()
        })

        window.addEventListener('mousemove', (e) => {
            this.mouseMove(e)
        });

        game.addEventListener('wheel', (e)=>{
            this.wheel(e, camera)
        }, { passive: false })

    }
    //setters
    setInvertAxis(value){
        this.invertAxis = value
    }
    setTargetElement(element, changeAxis=false){
        
        if (hasMethods(element, "rotate", "move")) {
            console.warn("Element cannot be set as mouse target object:", element);
            return;
        }
        if (changeAxis){
            this.changeInvertAxis()
        }
        this.targetElement = element
    }

    //updaters
    changeInvertAxis(){
        this.setInvertAxis(this.invertAxis*(-1))
    }
    mouseObjRotation(dt){
        this.targetElement.rotate(this.dy*dt*this.invertAxis,this.dx*dt*this.invertAxis,0)
    }
    mouseObjMove(dt){
        this.targetElement.move(this.dx*dt,-this.dy*dt,0)
    }
    update(dt){
        this.dx = this.x-this.lastX
        this.dy = this.y-this.lastY

        this.lastX = this.x
        this.lastY = this.y

        if (this.isDownL){this.mouseObjRotation(dt)}
        if (this.isDownR){this.mouseObjMove(dt)}
    }


    //action functions
    contextMenu(e){
        e.preventDefault();
    }
    mouseDown(e){
        if (e.button==0){this.isDownL=true}
        else {this.isDownR=true}
    }
    mouseUp(){
        this.isDownL = false
        this.isDownR = false
    }
    mouseMove(e){
        this.x = e.clientX;
        this.y = e.clientY;
    }
    wheel(e, camera){
        e.preventDefault();
        if (!this.isDownL && !this.isDownR){
            camera.z +=e.deltaY*0.01
        }
    }
}

export {Mouse}