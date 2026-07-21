function matrix_multiplication4x4(a,b){
    let mat = new Float32Array(16);
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += a[r * 4 + k] * b[k * 4 + c];
            }
            mat[r * 4 + c] = sum;
        }
    }
    return mat
}


function matrix_multiplication3x3(a,b){
    let mat = new Float32Array(9);
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let sum = 0;
            for (let k = 0; k < 3; k++) {
                sum += a[r * 3 + k] * b[k * 3 + c];
            }
            mat[r * 3 + c] = sum;
        }
    }
    return mat
}

function vector_matrix4x4multiplication(a,b){
    let mat = new Float32Array(4);

    mat[0] = b[0]*a[0]+b[1]*a[1]+b[2]*a[2]+b[3]*a[3];
    mat[1] = b[0]*a[4]+b[1]*a[5]+b[2]*a[6]+b[3]*a[7];
    mat[2] = b[0]*a[8]+b[1]*a[9]+b[2]*a[10]+b[3]*a[11];
    mat[3] = b[0]*a[12]+b[1]*a[13]+b[2]*a[14]+b[3]*a[15];

    return mat
}

function vector_matrix3x3multiplication(a,b){
    let mat = new Float32Array(3);
    
    mat[0] = b[0]*a[0]+b[1]*a[1]+b[2]*a[2];
    mat[1] = b[0]*a[3]+b[1]*a[4]+b[2]*a[5];
    mat[2] = b[0]*a[6]+b[1]*a[7]+b[2]*a[8];

    return mat
}

export {matrix_multiplication4x4, matrix_multiplication3x3, vector_matrix4x4multiplication, vector_matrix3x3multiplication}