export function objToVertexArrayParser(text) {
    let text_arr = text.split('\n');

    let vertexes_index_array = [[]]; // Index 0 pusty, bo OBJ indeksuje od 1
    let vertexArray = [];

    for (let i = 0; i < text_arr.length; i++) {
        let line = text_arr[i].trim();
        if (!line || line.startsWith('#')) continue;

        if (line.startsWith("v ")) {
            let verticeVec = line.split(/\s+/).slice(1);
            
            for (let j = 0; j < 3; j++) {
                verticeVec[j] = parseFloat(verticeVec[j]);
            }
            
            vertexes_index_array.push(verticeVec);
        }

        if (line.startsWith("f ")) {
            let strArray = line.split(/\s+/).slice(1);
            let faceVec = strArray.map((x) => parseInt(x.split('/')[0], 10));
            
            // Algorytm wachlarza (Triangle Fan):
            for (let j = 1; j < faceVec.length - 1; j++) {
                const p0 = vertexes_index_array[faceVec[0]];
                const p1 = vertexes_index_array[faceVec[j]];
                const p2 = vertexes_index_array[faceVec[j + 1]];

                vertexArray.push(...p0);
                vertexArray.push(...p1);
                vertexArray.push(...p2);
            }
        }
    }
    
    return new Float32Array(vertexArray);
}