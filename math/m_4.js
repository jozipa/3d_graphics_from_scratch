import { matrix_multiplication3x3 } from "./m_utils.js"
import { rotationX_matrix, rotationY_matrix, rotationZ_matrix } from "./m_3.js";

export function projection_matrix(fov, width, height, near_plane, far_plane){
    let matrix = new Float32Array(16);
    let d = 1/Math.tan(fov/2);
    let a = width/height;
    
    matrix[0] = d/a;
    matrix[5] = d;
    matrix[10] = (far_plane+near_plane)/(near_plane-far_plane);
    matrix[11] = (2*far_plane*near_plane)/(near_plane-far_plane);
    matrix[14] = -1;
    
    return matrix;
}

export function module_matrix(p_vector,rotation_x,rotation_y,rotation_z,scale){
    let matrix = new Float32Array(16);

    matrix[3] = p_vector[0];  // |
    matrix[7] = p_vector[1];  // |_____ last column
    matrix[11] = p_vector[2]; // |
    matrix[15] = p_vector[3]; // |

    let matrix3x3 = matrix_multiplication3x3(
        rotationY_matrix(rotation_y),
        matrix_multiplication3x3(
            rotationX_matrix(rotation_x),
            rotationZ_matrix(rotation_z))
    )

    for (let i = 0; i<3; i++){
        for (let j=0;j<3;j++){
            matrix[i*4+j] = matrix3x3[i*3+j]*scale[j];
        }
    }

    return matrix
}

export function view_matrix(x,y,z,rotation_x,rotation_y){
    let matrix = new Float32Array(16);

    let matrix3x3 = matrix_multiplication3x3(
        rotationY_matrix(rotation_y),
        rotationX_matrix(rotation_x)     
    )

    matrix[3] = -(x*matrix3x3[0*3]+y*matrix3x3[1*3]+z*matrix3x3[2*3]);        // |
    matrix[7] = -(x*matrix3x3[0*3+1]+y*matrix3x3[1*3+1]+z*matrix3x3[2*3+1]);  // |_____ last column
    matrix[11] = -(x*matrix3x3[0*3+2]+y*matrix3x3[1*3+2]+z*matrix3x3[2*3+2]); // |      multiplied by rotation matrix and negated
    matrix[15] = 1;                                                           // |

    for (let i = 0; i<3; i++){
        for (let j=0;j<3;j++){
            matrix[i*4+j] = matrix3x3[j*3+i];      // matrix is being transposed 
        }
    }

    return matrix
}

export function transposeMatrix4(m) {
    return new Float32Array([
        m[0], m[4], m[8],  m[12],
        m[1], m[5], m[9],  m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
    ]);
}
