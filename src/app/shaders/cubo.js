export const cuboShader ={
    "id": 5867,
    "name": "cubo",
    "fragment": "precision highp float;\nprecision highp int;\nuniform vec3 color;\nuniform float brightness;\nuniform float falloff;\nuniform mat4 modelMatrix;\nuniform vec3 uvScale;\nuniform vec3 uvOffset;\nuniform vec3 colorFront1;\nuniform vec3 colorFront2;\nuniform vec3 colorRight1;\nuniform vec3 colorRight2;\nuniform vec3 colorTop1;\nuniform vec3 colorTop2;\nvarying vec2 vUv;\nvarying vec4 worldCoord;\nvarying float lightStrengthX;\nvarying float lightStrengthY;\nvarying float lightStrengthZ;\nvec4 Cube_Edges1468788327926_62_main() \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                vec4 Cube_Edges1468788327926_62_gl_FragColor = vec4(0.0);\n                                                                                                                                                                                                                                                                                                                                                vec2 multiplier = pow(abs(vUv - 0.5), vec2(falloff));\n                                                                                                                                                                                                                                                                                                                                                Cube_Edges1468788327926_62_gl_FragColor = vec4(color * brightness * length(multiplier), 1.0);\n                                                                                                                                                                                                                                                                                                                                                return Cube_Edges1468788327926_62_gl_FragColor *= 1.0;\n                                                                                                                                                                                                                                                                                                                                            }\nvec4 World_Based_Gradients1472519140028_142_main() \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                vec4 World_Based_Gradients1472519140028_142_gl_FragColor = vec4(0.0);\n                                                                                                                                                                                                                                                                                                                                                float gradientX = clamp((worldCoord.x + uvOffset.z + uvScale.z * 0.5) / uvScale.z, 0.0, 1.0);\n                                                                                                                                                                                                                                                                                                                                                float gradientY = clamp((worldCoord.z + uvOffset.x + uvScale.x * 0.5) / uvScale.x, 0.0, 1.0);\n                                                                                                                                                                                                                                                                                                                                                float gradientZ = clamp((worldCoord.y + uvOffset.y + uvScale.y * 0.5) / uvScale.y, 0.0, 1.0);\n                                                                                                                                                                                                                                                                                                                                                vec3 gradientTop = mix(colorTop1, colorTop2, gradientX);\n                                                                                                                                                                                                                                                                                                                                                vec3 gradientRight = mix(colorRight1, colorRight2, gradientZ);\n                                                                                                                                                                                                                                                                                                                                                vec3 gradientFront = mix(colorFront1, colorFront2, gradientY);\n                                                                                                                                                                                                                                                                                                                                                vec3 outputColor = (gradientFront * lightStrengthY) + (gradientRight * lightStrengthX) + (gradientTop * lightStrengthZ);\n                                                                                                                                                                                                                                                                                                                                                World_Based_Gradients1472519140028_142_gl_FragColor = vec4(outputColor, 1.0);\n                                                                                                                                                                                                                                                                                                                                                return World_Based_Gradients1472519140028_142_gl_FragColor *= 1.0;\n                                                                                                                                                                                                                                                                                                                                            }\nvoid main() \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                gl_FragColor = (Cube_Edges1468788327926_62_main() + World_Based_Gradients1472519140028_142_main());                                                                                                                                                                                                                                                                                                                                            }\n",
    "vertex": "precision highp float;\nprecision highp int;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 normal;\nvarying vec2 vUv;\nvarying vec4 worldCoord;\nvarying float lightStrengthX;\nvarying float lightStrengthY;\nvarying float lightStrengthZ;\nvec3 lightPositionX = vec3(1.0, 0.0, 0.0);\nvec3 lightPositionY = vec3(0.0, 1.0, 0.0);\nvec3 lightPositionZ = vec3(0.0, 0.0, 1.0);\nfloat getLightStrength(vec3 lightPosition, vec3 norm) \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                return pow(min(abs(dot(normalize(norm), normalize(vec3(vec4(lightPosition, 1.0) * modelMatrix)))), 1.0), 2.0);\n                                                                                                                                                                                                                                                                                                                                            }\nvec4 Cube_Edges1468788327926_62_main() \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                vec4 Cube_Edges1468788327926_62_gl_Position = vec4(0.0);\n                                                                                                                                                                                                                                                                                                                                                vUv = uv;\n                                                                                                                                                                                                                                                                                                                                                Cube_Edges1468788327926_62_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                                                                                                                                                                                                                                                                                                                                                return Cube_Edges1468788327926_62_gl_Position *= 1.0;\n                                                                                                                                                                                                                                                                                                                                            }\nvec4 World_Based_Gradients1472519140028_142_main() \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                vec4 World_Based_Gradients1472519140028_142_gl_Position = vec4(0.0);\n                                                                                                                                                                                                                                                                                                                                                worldCoord = modelMatrix * vec4(position, 1.0);\n                                                                                                                                                                                                                                                                                                                                                lightStrengthX = getLightStrength(lightPositionX, normal);\n                                                                                                                                                                                                                                                                                                                                                lightStrengthY = getLightStrength(lightPositionY, normal);\n                                                                                                                                                                                                                                                                                                                                                lightStrengthZ = getLightStrength(lightPositionZ, normal);\n                                                                                                                                                                                                                                                                                                                                                World_Based_Gradients1472519140028_142_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                                                                                                                                                                                                                                                                                                                                                return World_Based_Gradients1472519140028_142_gl_Position *= 1.0;\n                                                                                                                                                                                                                                                                                                                                            }\nvoid main() \n                                                                                                                                                                                                                                                                                                                                            {\n                                                                                                                                                                                                                                                                                                                                                gl_Position = Cube_Edges1468788327926_62_main() + World_Based_Gradients1472519140028_142_main();                                                                                                                                                                                                                                                                                                                                            }\n",
    "uniforms": {
      "color": {
        "value": {
          "r": 1,
          "g": 1,
          "b": 1
        },
        "type": "c",
        "glslType": "vec3"
      },
      "brightness": {
        "value": "10.04980631",
        "type": "f",
        "glslType": "float"
      },
      "falloff": {
        "value": "4.18104668",
        "type": "f",
        "glslType": "float"
      },
      "uvScale": {
        "value": {
          "x": "1",
          "y": "1",
          "z": "1"
        },
        "type": "v3",
        "glslType": "vec3"
      },
      "uvOffset": {
        "value": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "type": "v3",
        "glslType": "vec3"
      },
      "colorFront1": {
        "value": {
          "r": "0.3",
          "g": "0.3",
          "b": "0.3"
        },
        "type": "c",
        "glslType": "vec3"
      },
      "colorFront2": {
        "value": {
          "r": "0.3",
          "g": "0.3",
          "b": "0.3"
        },
        "type": "c",
        "glslType": "vec3"
      },
      "colorRight1": {
        "value": {
          "r": "0.4",
          "g": "0.4",
          "b": "0.4"
        },
        "type": "c",
        "glslType": "vec3"
      },
      "colorRight2": {
        "value": {
          "r": "0.4",
          "g": "0.4",
          "b": "0.4"
        },
        "type": "c",
        "glslType": "vec3"
      },
      "colorTop1": {
        "value": {
          "r": "0.4",
          "g": "0.4",
          "b": "0.4"
        },
        "type": "c",
        "glslType": "vec3"
      },
      "colorTop2": {
        "value": {
          "r": "0.4",
          "g": "0.4",
          "b": "0.4"
        },
        "type": "c",
        "glslType": "vec3"
      }
    }
  }