import { mvp_m4 } from "../math/mvp_render.js";

let vertexShaderSource = `#version 300 es
    in vec4 a_position;

    uniform mat4 u_mvp;

    void main(){
        gl_Position = a_position*u_mvp;
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

export class Renderer{
    constructor(gameConfig){

        this.gl = gameConfig.game.getContext("webgl2")

        if (!this.gl){ 
            console.error('no webGl2 here :(');
        }

        let vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = createProgram(this.gl, vertexShader, fragmentShader);

        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.colorAttributeLocation = this.gl.getUniformLocation(this.program, "u_color");
        this.mvpLocation = this.gl.getUniformLocation(this.program, "u_mvp");

        this.gl.viewport(0, 0, gameConfig.width, gameConfig.height);

        this.gl.enable(this.gl.DEPTH_TEST);

        console.log("succesfull webgl inittialization")
    }
    render_object(model, mvp, color_vec){
        this.gl.useProgram(this.program)

        this.gl.uniformMatrix4fv(this.mvpLocation, false, mvp)
        this.gl.uniform4fv(this.colorAttributeLocation, color_vec)
        
        model.mesh.draw() 
    }
    render_scene(scene, projection_matrix, viev_matrix){
        
        scene.forEach(gameObject => {
            let module_matrix = gameObject.get_matrix()
            
            let mvp = mvp_m4(module_matrix,viev_matrix,projection_matrix)
            
            this.render_object(gameObject.model, mvp, gameObject.color)
        });
    }
    clear(){
        this.gl.clearColor(0, 0, 0, 1); 
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}
