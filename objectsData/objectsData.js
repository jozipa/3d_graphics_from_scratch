import { cube } from "../objectsData/cube.js";
import { pyramid } from "../objectsData/pyramid.js";
import { house } from "../objectsData/house.js";

const Models = {
    cube: {
        data: cube,
        pivotType: "center",
    },
    pyramid: {
        data: pyramid,
        pivotType: "bottom"
    },
    house: {
        data: house,
        pivotType: "bottom",
    }
};

export default Models

