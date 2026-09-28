
export default class Mesh{
    constructor(gl, positionAttributeLocation, vertexArray){

        this.bounds = this.initBounds(vertexArray)


        ///
        this.gl = gl
        this.vertexCount = vertexArray.length/3

        this.vao = this.gl.createVertexArray()
        this.gl.bindVertexArray(this.vao)

        // transfering poly mesh data to vram
        this.vbo = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo) //all changes in ARRAY_BUFFER are now binded to vboBuffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexArray), this.gl.STATIC_DRAW)

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
    dispose(){
        if (this.vbo){
            this.gl.deleteBuffer(this.vbo)
        }
    }

        

    //init functions
    initBounds(vertexArray){
        let bounds = {
            min: [0,0,0],
            max: [0,0,0]
        }
        for (let index = 0; index < vertexArray.length; index++) {
            const el = vertexArray[index]
            switch (index%3) {
                case 0:
                    bounds.min[0] = Math.min(bounds.min[0], el)
                    bounds.max[0] = Math.max(bounds.max[0], el)
                    break;
                case 1:
                    bounds.min[1] = Math.min(bounds.min[1], el)
                    bounds.max[1] = Math.max(bounds.max[1], el)
                    break;
                case 2:
                    bounds.min[2] = Math.min(bounds.min[2], el)
                    bounds.max[2] = Math.max(bounds.max[2], el)
                    break;
            }
        }
        return bounds
    }
}