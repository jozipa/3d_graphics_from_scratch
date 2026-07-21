

export class Polygon{ //koncept generowac tu polygony zeby ujednolicic
   constructor(f,vs,mvp, color="#676767ff", contour=false){
      for(let i = 0; i< f.length; i++){
            let a = vs[f[i]];

            let a_vector = [a.x,a.y,a.z,1]
            a_vector = point_transformation(mvp,a_vector);

            if (a_vector!=null){
                this.faceArr.push(toScreenSpace({x: a_vector[0], y: a_vector[1]},gameConfig.width,gameConfig.height))
                this.avgDist += a_vector[3] // dodaje w
            }
        }
        if (this.faceArr.length==3){ //sprawdzam czy jest caly trojkat w polu widzenia jak nie to w przyszlosci trzeba zrobic ze sprawdzam czy to tylko jeden rog nie wystaje czy po prostu go nie widac
            this.avgDist /= 3 // jesli jest to wyliczam srednia z dystansu dziele przez 3 w sumie to chyba opcjonalne (skoro potrzebne jedynie do storowania)
        }
   }
}