
export default class Mesh{
    constructor(gl, positionAttributeLocation, polyArray){
        this.gl = gl
        this.vertexCount = polyArray.length/3

        this.vao = this.gl.createVertexArray()
        this.gl.bindVertexArray(this.vao)

        // transfering poly mesh data to vram
        let vboBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vboBuffer) //all changes in ARRAY_BUFFER are now binded to vboBuffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(polyArray), this.gl.STATIC_DRAW)

        // specifying vao (intructions how to read mesh data)
        
        this.gl.enableVertexAttribArray(positionAttributeLocation)
        this.gl.vertexAttribPointer(
            positionAttributeLocation, 3, this.gl.FLOAT, false, 0, 0 //data pointer, size, type, normalize, stride, offset
        );

        this.gl.bindVertexArray(null)
    }
    draw(){
        this.gl.bindVertexArray(this.vao)

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount)

        this.gl.bindVertexArray(null)
        
    }
}