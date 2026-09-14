

class Mouse{
    constructor(game, camera){
        this.x = 0
        this.y = 0
        this.isDownL = false
        this.isDownR = false
        this.prevX = 0
        this.prevY=0

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
    contextMenu(e){
        e.preventDefault();
    }
    mouseDown(e){
        if (e.button==0){this.isDownL=true}
        else {this.isDownR=true}
        this.prevX=e.clientX
        this.prevY=e.clientY
    }
    mouseUp(){
        this.isDownL = false
        this.isDownR = false
        console.log('uppin');
        
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
    mouseObjRotation(dt, gameObject_fucusElement){
        gameObject_fucusElement.rotate(((this.y-this.prevY)*dt),(this.x-this.prevX)*dt,0)
        this.prevX=this.x
        this.prevY=this.y
    }
    mouseObjMove(dt, gameObject_focusElement){
        gameObject_focusElement.move((this.x-this.prevX)*dt,-(this.y-this.prevY)*dt,0)
        this.prevX=this.x
        this.prevY=this.y
    }
}


export {Mouse}