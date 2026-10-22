import {Renderer} from "./renderer/Renderer.js"
import {Camera, defaultCamera} from "./Camera.js"
import { InputManager } from "./inputMenager/InputManager.js"
import Scene from "./sceneHandler/Scene.js"
import Assets from "./objectsHandler/Assets.js"
import {Object3d} from "./objectsHandler/Object3d.js"
import { GameConfig } from "./GameConfig.js"
import { MapManager } from "./sceneHandler/MapManager/MapManager.js"


export class Engine{
    constructor(config){
        this.gameConfig = new GameConfig(config)

        this.renderer = new Renderer({game: this.gameConfig.canvas, width: config.width, height: config.height})
        this.camera = new Camera(defaultCamera)
        this.input = new InputManager(this.gameConfig.canvas, this.camera)

        this.scene = new Scene()
        this.assets = new Assets(this.renderer.gl, this.renderer.positionAttributeLocation)
        this.assets.init()
        this.mapManager = new MapManager(this.scene.objects, this.assets)

        this.isRunning = false
    }
    init(loadDefaultObject=true){
        this.isRunning = true
        
        this.set_new_render_scene(loadDefaultObject)
        
        this.loop()
    }
    set_new_render_scene(loadDefaultObject){
        this.scene.clear()
        this.scene.set_scene(this.mapManager.getMap())

        if (loadDefaultObject){
            let focused_element = new Object3d(this.assets.models.cube,'#535353ff',0,0,0,0,0,0,1,1,1)
            this.scene.add_object(focused_element)
            this.input.mouse.setTargetElement(focused_element, true)
        }
        
        this.mapManager.mapChanged = false
    }
    update(dt){
        this.input.update(dt)
        //this.scene.update(dt) ?poruszanie przedmiotow w czasie czy cos?
    }
    loop = () => {
        if (!this.isRunning) return;

        let dt = 1/60

        if (this.mapManager.mapChanged){
            this.scene.set_scene(this.mapManager.getMap())
            this.scene.add_object(this.input.mouse.targetElement)
        }

        this.update(dt)
        this.render()

        requestAnimationFrame(this.loop)
    }
    
    render(){
        this.renderer.clear()

        let projection_matrix = this.camera.get_projection_matrix(this.gameConfig.width, this.gameConfig.height)
        let view_matrix = this.camera.get_view_matrix()

        this.renderer.render_scene(this.scene.objects,projection_matrix,view_matrix)
    }

}