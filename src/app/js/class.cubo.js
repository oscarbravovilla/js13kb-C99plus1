
import "./lib-shader";


export class Cubo {
    constructor(x, y, z, settings, rotation, isBase, id,debug=false) {
        // estado
        this.estado = 0;
        // entity
        this.el = document.createElement('a-box');
        // colliders
        var col = document.createElement('a-plane');
        col.setAttribute("id",id)
        col.setAttribute("visible","false");
        col.setAttribute("class","boxCollider");
        col.setAttribute("position","0 -0.53 0");
        col.setAttribute("rotation","90 0 0");
        col.setAttribute("scale","1 1 1");
        col.setAttribute('shader-frog', 'name:cuboShader'); // hay que poner un shaderfrog no sirve un material estantard
        this.el.appendChild(col);
        this.el.setAttribute('geometry',
            {
                width: settings.width,
                height: settings.width,
                depth: settings.depth
            });
        this.el.setAttribute("class","stage");
        // material
        this.el.setAttribute('shader-frog', 'name:cubo-rojo');
        // posicion
        this.el.object3D.position.set(x,y,z);
        // id
        this.el.setAttribute('id', id);
        
    }
}