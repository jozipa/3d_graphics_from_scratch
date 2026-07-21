import { matrix_multiplication4x4, vector_matrix4x4multiplication } from "./m_utils.js";
import { camera } from "../components/camera.js";

export function mvp_m4(m, v,p){
    return matrix_multiplication4x4(p,matrix_multiplication4x4(v,m));
}

export function point_transformation(mat_trans, point){
    let p_transformed = vector_matrix4x4multiplication(mat_trans, point);
    let w = p_transformed[3];

    if (w<=0) return null;
    if (w>camera.farPlane) return null;

    p_transformed[0] /= w;
    p_transformed[1] /= w;
    p_transformed[2] /= w;

    return p_transformed;
}

