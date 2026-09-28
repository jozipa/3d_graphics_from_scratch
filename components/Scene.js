
export default class Scene{
    constructor(){
        this.objects = []
    }
    get_scene(){
        return this.objects
    }
    add_object(object){
        this.objects.push(object)
    }
    set_scene(scene_array){
        this.objects = scene_array
    }
    delete_object(object){
        let index = this.objects.indexOf(object)
        if (index>-1){
            this.objects.splice(index, 1)
        } else {
            console.log("object doesnt exists or was already deleted")
        }
    }
    clear(){
        this.objects = []
    }
}