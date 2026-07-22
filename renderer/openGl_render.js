import {game, gameConfig} from '../components/game.js'

let gl = game.getContext("webgl2");

if (!gl){ 
    console.log('no webGl2 here :(');
}

// 1. SHADERY
let vertexShaderSource = `#version 300 es
in vec4 a_position;

uniform mat4 u_mvp;

void main(){

    gl_Position = u_mvp * a_position;
}`;

let fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec4 u_color;

void main(){
    outColor = u_color;
}`;

function createShader(gl, type, source){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;
    
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
let program = createProgram(gl, vertexShader, fragmentShader);

let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
let colorAttributeLocation = gl.getUniformLocation(program, "u_color");
let mvpLocation = gl.getUniformLocation(program, "u_mvp");

let positionBuffer = gl.createBuffer();
let vao = gl.createVertexArray();



gl.enable(gl.DEPTH_TEST);

export function render_OpenGl2(positions, size, type, normalize, stride, offset, mvp, color_arr){
    //buffer
    console.log(color_arr, 'color_arr')

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.viewport(0, 0, gameConfig.width, gameConfig.height);

    //vao
    
    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.vertexAttribPointer(
        positionAttributeLocation, size, gl.FLOAT, normalize, stride, offset
    );

    

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.uniformMatrix4fv(mvpLocation, false, mvp);
    gl.uniform4fv(colorAttributeLocation, color_arr);

    let primitiveType = gl.TRIANGLES;
    offset = 0;
    let count = positions.length /size;
    gl.drawArrays(primitiveType, offset, count);
}

export function clear_OpenGl2(){
    gl.clearColor(0, 0, 0, 1); // Zmieniłem na czarne tło (ostatnia jedynka to Alpha), żeby fioletowy trójkąt był dobrze widoczny
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}