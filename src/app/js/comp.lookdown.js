AFRAME.registerComponent('look-down', {
    init:function(){
        this.campos = new THREE.Vector3(0, 0, 0);
        this.cam = document.getElementById('camera');
        this.el.sceneEl.addEventListener("loaded", () => {
            this.cam.object3D.getWorldPosition(this.campos);
		});
       
    },
    tick:function(){
        this.cam.object3D.getWorldPosition(this.campos);
        // dont work .object3D.position.set()
        this.el.setAttribute("position",`${this.campos.x} ${this.campos.y}  ${this.campos.z} `);
    }
})