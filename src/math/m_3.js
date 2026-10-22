export function rotationX_matrix(angle){//pitch
    let sinus = Math.sin(angle)
    let cosinus = Math.cos(angle)

    let matrix = [
        1,0,0,
        0,0,0,
        0,0,0
    ]

    matrix[4] = cosinus
    matrix[8] = cosinus
    matrix[5] = -sinus
    matrix[7] = sinus

    return matrix
}

export function rotationY_matrix(angle){//yaw
    let sinus = Math.sin(angle)
    let cosinus = Math.cos(angle)

    let matrix = [
        0,0,0,
        0,1,0,
        0,0,0
    ]

    matrix[0] = cosinus
    matrix[8] = cosinus
    matrix[2] = sinus
    matrix[6] = -sinus

    return matrix
}

export function rotationZ_matrix(angle){//roll
    let sinus = Math.sin(angle)
    let cosinus = Math.cos(angle)

    let matrix = [
        0,0,0,
        0,0,0,
        0,0,1
    ]

    matrix[0] = cosinus
    matrix[4] = cosinus
    matrix[1] = -sinus
    matrix[3] = sinus

    return matrix
}