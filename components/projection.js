import { point_transformation } from "../math/mvp_render.js";
import { fillPolygon, contourPolygon } from "./render.js";
import { gameConfig } from "./game.js";
import { mvp_m4 } from "../math/mvp_render.js";


export function toScreenSpace(p,width,height){ //translating [-1,1] scale to canvas 
    if (p==null)return null
    return {
        x: (p.x+1)/2*width,
        y: (1-((p.y+1)/2))*height
    }
}

export function sort_triangles_by_dist(arr, v, p){ // wersja z trojkatami i sprobowanym algorytmem malarza xd
    let render_arr = [] //tablica trojkatow posiadajacych wszelka wiedze o obie zeby posortowac odleglosciowo i zastosowac algorytm malarza
    for (let i = 0; i<arr.length; i++){
        let obj = arr[i];

        let m = obj.get_matrix();
        let mvp = mvp_m4(m,v,p)

        for (const f of obj.data.fs){
            render_arr.push(to_renderArr(f,obj.data.vs, mvp, obj.color, obj.contour))
        }
        
    }
    render_arr.sort((a,b)=>b.avgDist-a.avgDist)
    return render_arr
}

export function render_from_arr(arr){ // renders from array where each obj is triangle
    for (let i = 0; i<arr.length; i++){
        let obj = arr[i]
        
        fillPolygon(obj.faceArr,obj.color)
        if (obj.contour) contourPolygon(obj.faceArr, gameConfig.FOREGROUND)
    }
}

function to_renderArr(f,vs,mvp, color="#676767ff", contour=false){ //nowy pomysl w powrocie zeby to robic tak ze wyliczamy tak jak w render obj ale juz gotowe przeskalowane trojkaty wysylamy i sortujemy ze wzgledu na w [x,y to screen space przeskalowane, w czyli odleglosc od kamery (chyba albo to z jeszcze niewiem (do weryfikacji))]
        let triangleObj = {avgDist: 0, faceArr: [], color: color, contour: contour}
        for(let i = 0; i< f.length; i++){
            let a = vs[f[i]];

            let a_vector = [a.x,a.y,a.z,1]
            a_vector = point_transformation(mvp,a_vector);

            if (a_vector!=null){
                triangleObj.faceArr.push(toScreenSpace({x: a_vector[0], y: a_vector[1]},gameConfig.width,gameConfig.height))
                triangleObj.avgDist += a_vector[3] // dodaje w
            }
        }
        if (triangleObj.faceArr.length==3){ //sprawdzam czy jest caly trojkat w polu widzenia jak nie to w przyszlosci trzeba zrobic ze sprawdzam czy to tylko jeden rog nie wystaje czy po prostu go nie widac
            triangleObj.avgDist /= 3 // jesli jest to wyliczam srednia z dystansu dziele przez 3 w sumie to chyba opcjonalne (skoro potrzebne jedynie do storowania)
        }
        return triangleObj     
}
