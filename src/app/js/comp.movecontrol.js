AFRAME.registerComponent('move-control', {
    init: function () {
        this.moveSpeed = 1;
        this.clock = new THREE.Clock();
        this.cameraDirection = new THREE.Vector3();
        this.x = 0;
        this.y = 0;
        this.el.addEventListener('thumbstickmoved', (evt) => {
            this.x = evt.detail.x;
            this.y = evt.detail.y;
        });
        this.el.addEventListener('abuttondown', (evt) => {
           
            this.turnReady = true;
            this.tunrLeft = true;
        });
        this.el.addEventListener('bbuttondown', (evt) => {
            this.turnReady = true;
            this.tunrLeft = false
        });
        this.el.addEventListener('xbuttondown', (evt) => {
            this.turnReady = true;
            this.tunrLeft = true;
        });
        this.el.addEventListener('ybuttondown', (evt) => {
            this.turnReady = true;
            this.tunrLeft = false
        });
        // giro
        this.turnReady = true;
        this.startAngle = 0;
        this.endAngle = 0;
        this.turnInProgress = false;
        this.turnAngle = 15;
        this.turnDuration = 0.05;
        this.turnTime = 0;
        this.tunrLeft = false;

    },
    lerp: function (startValue, endValue, percent) {
        return startValue + (endValue - startValue) * percent;
    },
    tick: function () {

        // movimieno
        this.deltaTime = this.clock.getDelta();
        this.leftJoystickLength = Math.sqrt(this.x * this.x + this.y * this.y);

        if(this.leftJoystickLength > 0.1){
            this.el.sceneEl.camera.getWorldDirection(this.cameraDirection);
            this.cameraAngle = Math.atan2(this.cameraDirection.z, this.cameraDirection.x);
    
            this.leftJoystickAngle = Math.atan2(this.y, this.x);
            this.moveDistance = this.moveSpeed * this.deltaTime;
            this.moveAngle = this.cameraAngle + this.leftJoystickAngle;
    
            this.moveRight = -this.leftJoystickLength * Math.sin(this.moveAngle) * this.moveDistance;
            this.moveForward = this.leftJoystickLength * Math.cos(this.moveAngle) * this.moveDistance;
          
            this.el.object3D.position.x = this.el.object3D.position.x + this.moveRight;
            this.el.object3D.position.z = this.el.object3D.position.z + this.moveForward;
        }
      
        if (this.turnReady) {
            this.startAngle = this.el.getAttribute("rotation").y;
            if(this.tunrLeft){
                this.endAngle = this.startAngle - this.turnAngle;
            }else{
                this.endAngle = this.startAngle + this.turnAngle;
            }
            this.turnInProgress = true;
            this.turnTime = 0;
            this.turnReady = false;
        }

        if (this.turnInProgress) {
            this.turnTime += this.deltaTime;
            this.rot = this.el.getAttribute("rotation");
            this.rot.y = this.lerp(this.startAngle, this.endAngle, this.turnTime / this.turnDuration);
            this.el.setAttribute("rotation", this.rot);
            if (this.turnTime >= this.turnDuration) this.turnInProgress = false;
        }
    }
})