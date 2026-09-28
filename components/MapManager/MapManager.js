import { gen_flat_cubic_map } from "./mapsGenerators.js"

export class MapManager {
    constructor(scene, assets){
        this.scene = scene
        this.assets = assets

        this.maps = {
            empty: [],
            flat: gen_flat_cubic_map(assets)
        }

        this.currentMap = this.maps.flat
        this.mapChanged = false
    }
    changeMap(mapName){
        if (!Object.hasOwn(this.maps,mapName)){
            console.warn(`No map named ${mapName}`);
            return
        }
        this.currentMap = this.maps[mapName]
        this.mapChanged = true
    }
    newMap(mapName, gameObjectsArray){
        if (Object.hasOwn(this.maps, mapName)){
            console.warn(`Map with name ${mapName} already exists`);
            return;
        }
        this.maps[mapName] = gameObjectsArray;
    }
    getMap(){
        return this.currentMap
    }
    
}