
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
        // animaciones
        // this.el.setAttribute('animation__a1', `startEvents: ${Events.CUBEDOWN};property: position;from: ${x} 0 ${z} ; to: ${x} 40 ${z};easing: easeInCubic;delay: ${Math.random() * 600}`)
        // this.el.setAttribute('animation__a2', `startEvents: ${Events.CUBEUP};property: position;from: ${x} 40 ${z} ; to: ${x} 0 ${z};easing: easeOutCubic;delay: ${Math.random() * 600}`)
        // sound
        //this.el.setAttribute('animation-sound', '');
        // id
        this.el.setAttribute('id', id);
        
    }
}