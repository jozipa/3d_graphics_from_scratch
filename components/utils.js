let hex_toDecimal = (hex) => parseInt(hex, 16);

function isObject(obj){
    if(typeof obj=="object" && obj != null){
        return true
    }
    return false
}

function hasMethod(obj, method){
    if (!isObject(obj)){
        console.warn(`${obj} is not an object`);
        return false
    }
    if (typeof obj?.[method] == "function"){
        return true
    }
    return false
}

function hasMethods(obj, ...methods){
    for (let method_name in methods){
        if (!hasMethod(obj, method_name)){
            return false
        }
    }
    return true
}

export {hex_toDecimal, hasMethods}