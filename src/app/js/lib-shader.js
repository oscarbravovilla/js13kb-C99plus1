import { cuboShader } from "../shaders/cubo";
import { rejilla } from "../shaders/rejilla";

export var colors = [
    ["rojo", [0.9137254901960784, 0.027450980392156862, 0.027450980392156862, 1], [50], [6]],
    ["violeta", [0.8980392156862745, 0.027450980392156862, 0.9137254901960784, 1], [50], [6]],
    ["azul", [0.027450980392156862, 0.615686274509804, 0.9137254901960784, 1], [50], [6]],
    ["verde", [0.027450980392156862, 0.9137254901960784, 0.29411764705882354, 1], [50], [6]],
    ["amarillo", [0.9137254901960784, 0.8823529411764706, 0.027450980392156862, 1], [50], [6]],
    ["naranja", [0.9137254901960784, 0.33725490196078434, 0.027450980392156862, 1], [50], [6]],
    ["negro", [0.9137254901960784, 0.027450980392156862, 0.027450980392156862, 1], [50], [6]],
    ["gris", [0.3, 0.3, 0.3, 1], [40], [4.3]],
    ["pared", [0.25, 0.25, 0.25, -0.5], [80], [8]],
    ["debug", [0.85, 0.85, 0.85, -1], [50], [7]]
]
var shaders = {};
// shaders base
shaders['cuboShader'] = cuboShader;
shaders['rejilla'] = rejilla;

// color shaders
colors.map((col) => {
    const rgb = { "r": col[1][0], "g": col[1][1], "b": col[1][2] };
    const newShader = JSON.parse(JSON.stringify(cuboShader));
    newShader.uniforms.color.value = { "r": col[1][3], "g": col[1][3], "b": col[1][3] };
    newShader.uniforms.brightness.value = col[2];
    newShader.uniforms.falloff.value = col[3];
    newShader.uniforms.colorFront1.value = rgb;
    newShader.uniforms.colorFront2.value = rgb;
    shaders[`cubo-${col[0]}`] = newShader;

    const newShaderCompl = JSON.parse(JSON.stringify(cuboShader));
    newShaderCompl.uniforms.color.value = { "r": col[1][3], "g": col[1][3], "b": col[1][3] };
    newShaderCompl.uniforms.brightness.value = col[2];
    newShaderCompl.uniforms.falloff.value = col[3];
    newShaderCompl.uniforms.colorFront1.value = rgb;
    newShaderCompl.uniforms.colorFront2.value = rgb;
    newShaderCompl.uniforms.colorRight1.value = rgb;
    newShaderCompl.uniforms.colorRight2.value = rgb;
    newShaderCompl.uniforms.colorTop1.value = rgb;
    newShaderCompl.uniforms.colorTop2.value = rgb;
    shaders[`cubo-${col[0]}-complete`] = newShaderCompl;

    const newShaderW= JSON.parse(JSON.stringify(rejilla));
    newShaderW.uniforms.lightColor.value = rgb;
    shaders[`wall-${col[0]}`] = newShaderW
})
// SHADERS
AFRAME.shaderfrog = shaders;

function ShaderRuntime() { }

ShaderRuntime.prototype = {

    mainCamera: null,
    cubeCameras: {},
    reserved: { time: null, cameraPosition: null },

    umap: {
        float: { type: 'f', value: 0 },
        int: { type: 'i', value: 0 },
        vec2: { type: 'v2', value() { return new THREE.Vector2(); } },
        vec3: { type: 'v3', value() { return new THREE.Vector3(); } },
        vec4: { type: 'v4', value() { return new THREE.Vector4(); } },
        samplerCube: { type: 't' },
        sampler2D: { type: 't' }
    },
    get(identifier) {
        let shaderType = this.shaderTypes[identifier];
        if (!shaderType.initted) {
            this.create(identifier);
        }
        return shaderType.material;
    },
    add(shaderName, config) {
        let newData = clone(config), uniform;
        newData.fragmentShader = config.fragment;
        newData.vertexShader = config.vertex;
        delete newData.fragment;
        delete newData.vertex;
        for (var uniformName in newData.uniforms) {
            uniform = newData.uniforms[uniformName];
            if (uniform.value === null) {
                newData.uniforms[uniformName].value = this.getUmap(uniform.glslType);
            }
        }
        if (shaderName in this.shaderTypes) {
            // maybe not needed? too sleepy, need document
            extend(this.shaderTypes[shaderName], newData);
        } else {
            this.shaderTypes[shaderName] = newData;
        }
        return newData;
    },

    create(identifier) {
        let shaderType = this.shaderTypes[identifier];
        delete shaderType.id;
        shaderType.material = new THREE.RawShaderMaterial(shaderType);
        this.runningShaders.push(shaderType);
        shaderType.init && shaderType.init(shaderType.material);
        shaderType.material.needsUpdate = true;
        shaderType.material.side = THREE.DoubleSide;
        shaderType.initted = true;
        return shaderType.material;
    },
    updateShaders(time, obj) {
        let shader, x;
        obj = obj || {};
        for (x = 0; shader = this.runningShaders[x++];) {
            for (let uniform in obj.uniforms) {
                if (uniform in shader.material.uniforms) {
                    shader.material.uniforms[uniform].value = obj.uniforms[uniform];
                }
            }
            if ('cameraPosition' in shader.material.uniforms && this.mainCamera) {
                shader.material.uniforms.cameraPosition.value = this.mainCamera.position.clone();

            }
            if ('viewMatrix' in shader.material.uniforms && this.mainCamera) {
                shader.material.uniforms.viewMatrix.value = this.mainCamera.matrixWorldInverse;
            }
            if ('time' in shader.material.uniforms) {
                shader.material.uniforms.time.value = time;
            }
        }
    },
    shaderTypes: shaders,
    runningShaders: []
};

// Convenience methods so we don't have to include underscore
function extend() {
    let length = arguments.length,
        obj = arguments[0];
    if (length < 2) {
        return obj;
    }
    for (let index = 1; index < length; index++) {
        let source = arguments[index],
            keys = Object.keys(source || {}),
            l = keys.length;
        for (let i = 0; i < l; i++) {
            let key = keys[i];
            obj[key] = source[key];
        }
    }
    return obj;
}
function clone(obj) {
    return extend({}, obj);
}
AFRAME.registerSystem('shader-frog', {
    init: function () {

        window.frog_runtime = new ShaderRuntime();
        this.clock = new THREE.Clock();
    },
    tick: function (t) {
         window.frog_runtime.updateShaders(this.clock.getElapsedTime());
    }
});
AFRAME.registerComponent('shader-frog', {
    schema: {
        name: { type: "string" }
    },
    init: function () {
        this.originalMaterial = this.el.getObject3D('mesh').material;
        this.shaderData = shaders[this.data.name];
    },
    update: function () {

        window.frog_runtime.add(this.data.name, this.shaderData);
        var material = window.frog_runtime.get(this.data.name);
        this.el.getObject3D('mesh').material = material;
    }
});