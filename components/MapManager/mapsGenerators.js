import { Object3d } from "../../objectsData/Object3d.js";

export function gen_flat_cubic_map(assets){
        let size = 0.5;
        let scale = 1;
        let r_size = size*scale;

        let start_x = -(24*size+size/2)
        let start_z = start_x

        let flat_map = []
        for (let i = 0; i<2500;i++){
            flat_map.push(new Object3d(assets.models.cube,'#33ce45ff',start_x+((i%50)*r_size),0,start_z+(Math.floor(i/50)*r_size),0,0,0,scale,0.1,scale))
        }
        return flat_map
    
}