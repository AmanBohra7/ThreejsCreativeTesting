import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SpaceImage from '../../assets/images/space.jpg';
import { AxesHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {
//     ModifierStack,
//     Twist,
//     Noise,
//     Cloth,
//     UserDefined,
//     Taper,
//     Break,
//     Bloat,
//     Vector3,
//     ModConstant,
//     Bend
//   } from "three.modifiers";
import * as dat from 'dat.gui';
import { Vector2 } from 'three';
import car from '../../assets/models/car_base.glb';

/* eslint import/no-webpack-loader-syntax: off */
// import * as vertexShader from n '!raw-loader!./shaders/vertexShader.glsl';
/* eslint import/no-webpack-loader-syntax: off */
// import * as fragmentShader from '!raw-loader!glslify-loader!./shaders/fragmentShader.glsl';


// import fragmentShader from '!raw-loader!./shaders/fragmentShader.js';
// console.log(fragmentShader);

const RiverShader = () => {

    const [isCreated, setCreation] = useState(false);
    const test = useRef();
    const params = {};

    useEffect(() => {

        // if(isCreated) return;
        if (test.current) return;
        setCreation(true);

        // console.log("TEST");
        const scene = new THREE.Scene();
        test.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("bg"),
            antialias: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.gammaFactor = 2.2;
        renderer.outputEncoding = THREE.sRGBEncoding;

        const gui = new dat.GUI();
        gui.width = 400;

        camera.position.set(6.7, 2.7, 3.2);
        let _x = 0
        let _y = 0
        let _z = 0
        camera.rotation.setFromVector3(new THREE.Vector3(_x, _y, _z));

        params.waveDepthColor = '#0000ff';
        params.waveSurfaceColor = '#535656';

        //#region Shader practive
        const newplane = new THREE.PlaneBufferGeometry(2, 2, 128, 128);
        const newplaneMat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.1 },
                uThres: { value: 0.1 },
                uTransformColor: {value: new THREE.Color(0xff0000)},
                uActualColor: {value: new THREE.Color(0x535656)},
            },
            vertexShader:
                `
                varying vec3 vPos;
                void main(){
                    vec4 modelPosition = modelMatrix * vec4(position,1.0);
                    gl_Position = projectionMatrix * viewMatrix * modelPosition;
                    vPos = vec3(modelPosition.x,modelPosition.y,modelPosition.z);
                }
                `,
            fragmentShader: `
                uniform float uTime;
                uniform float uThres;
                uniform vec3 uTransformColor;
                uniform vec3 uActualColor;
                varying vec3 vPos;
                void main() {
                    if(vPos.x < uTime && vPos.x >  (uTime - uThres)){
                        gl_FragColor = vec4(1,1,1,1);
                    }else{
                        if(vPos.x <  (uTime - uThres)){
                            gl_FragColor = vec4(uTransformColor, 1);
                        }else{
                            gl_FragColor = vec4(uActualColor, 1);
                            
                        }
                    }
                }`

        });
        //         const newplaneMat = new THREE.ShaderMaterial({
        //             uniforms: {
        //                 uTime: { value: 0.0 },
        //                 uWaveSpeed: { value: 1.2 },
        //                 uBigWaveFreq: { value: new Vector2(4, 1.5) },
        //                 uBigWaveElevation: { value: 0.2 },
        //                 uWaveDepthColor: { value: new THREE.Color(0x0087ff) },
        //                 uWaveSurfaceColor: { value: new THREE.Color(0x88fff8) },
        //                 uColorOffset: { value: 0.25 },
        //                 uColorMultiplyer: { value: 2 },
        //                 uSmallWaveFreq: { value: 3.0 },
        //                 uSmallWaveAmount: { value: 0.2 },
        //                 uSmallWaveSpeed: { value: 0.2 },
        //             },
        //             vertexShader: ` 
        //                 uniform float uTime;
        //                 uniform float uWaveSpeed;
        //                 uniform vec2 uBigWaveFreq;
        //                 uniform float uBigWaveElevation;

        //                 uniform float uSmallWaveFreq;
        //                 uniform float uSmallWaveAmount;
        //                 uniform float uSmallWaveSpeed;

        //                 varying vec3 vPos;
        //                 varying vec2 vUv;
        //                 varying float vElevation;

        //                 vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        //                 vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        //                 vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        //                 float cnoise(vec3 P){
        //                 vec3 Pi0 = floor(P); // Integer part for indexing
        //                 vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        //                 Pi0 = mod(Pi0, 289.0);
        //                 Pi1 = mod(Pi1, 289.0);
        //                 vec3 Pf0 = fract(P); // Fractional part for interpolation
        //                 vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        //                 vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        //                 vec4 iy = vec4(Pi0.yy, Pi1.yy);
        //                 vec4 iz0 = Pi0.zzzz;
        //                 vec4 iz1 = Pi1.zzzz;

        //                 vec4 ixy = permute(permute(ix) + iy);
        //                 vec4 ixy0 = permute(ixy + iz0);
        //                 vec4 ixy1 = permute(ixy + iz1);

        //                 vec4 gx0 = ixy0 / 7.0;
        //                 vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        //                 gx0 = fract(gx0);
        //                 vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        //                 vec4 sz0 = step(gz0, vec4(0.0));
        //                 gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        //                 gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        //                 vec4 gx1 = ixy1 / 7.0;
        //                 vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        //                 gx1 = fract(gx1);
        //                 vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        //                 vec4 sz1 = step(gz1, vec4(0.0));
        //                 gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        //                 gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        //                 vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        //                 vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        //                 vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        //                 vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        //                 vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        //                 vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        //                 vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        //                 vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        //                 vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        //                 g000 *= norm0.x;
        //                 g010 *= norm0.y;
        //                 g100 *= norm0.z;
        //                 g110 *= norm0.w;
        //                 vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        //                 g001 *= norm1.x;
        //                 g011 *= norm1.y;
        //                 g101 *= norm1.z;
        //                 g111 *= norm1.w;

        //                 float n000 = dot(g000, Pf0);
        //                 float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        //                 float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        //                 float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        //                 float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        //                 float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        //                 float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        //                 float n111 = dot(g111, Pf1);

        //                 vec3 fade_xyz = fade(Pf0);
        //                 vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        //                 vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        //                 float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        //                 return 2.2 * n_xyz;
        //                 }

        //                 void main(){
        //                     vPos = position;
        //                     vUv = uv;
        //                     vec4 modelPosition = modelMatrix * vec4(position,1.0);
        //                     float bigWaveX = sin(modelPosition.x * uBigWaveFreq.x + (uTime*uWaveSpeed))  ;
        //                     float bigWaveZ = sin(modelPosition.z * uBigWaveFreq.y + (uTime*uWaveSpeed)) ;
        //                     // float elevation = bigWaveX * bigWaveZ * uBigWaveElevation ;
        //                     // float elevation = bigWaveX * bigWaveZ  ;
        //                     float elevation = bigWaveX * bigWaveZ * uBigWaveElevation  ;
        //                     elevation += cnoise(vec3(modelPosition.xz*uSmallWaveFreq,uTime*uSmallWaveSpeed))*uSmallWaveAmount;
        //                     modelPosition.y += elevation;
        //                     gl_Position = projectionMatrix * viewMatrix * modelPosition;
        //                     vElevation = elevation;
        //                 }`,
        //             fragmentShader: `
        //             uniform vec3 uWaveDepthColor;
        // uniform vec3 uWaveSurfaceColor;
        // uniform float uColorOffset;
        // uniform float uColorMultiplyer;
        // varying float vElevation;
        // varying vec3 vPos;
        // varying vec2 vUv;
        // void main() {
        //     vec3 mixFragColor = mix(uWaveDepthColor, uWaveSurfaceColor, vElevation * uColorMultiplyer + uColorOffset);
        //     gl_FragColor = vec4(mixFragColor, 1);
        // }`,
        //             transparent: true,
        //             // wireframe: true
        //         });
        const newplaneMesh = new THREE.Mesh(newplane, newplaneMat);
        newplaneMesh.position.set(1, 0, 0)
        newplaneMesh.rotation.set(-Math.PI * 0.5, 0, 0);
        // scene.add(newplaneMesh);
        console.log(newplaneMesh);
        // console.log(newplane)




        const loader = new GLTFLoader();

        loader.load(car, function (gltf) {

            scene.add(gltf.scene);
            gltf.scene.rotation.y = Math.PI / 2;
            gltf.scene.position.set(3,0,0);
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.children[0].children.forEach(mesh => {
                console.log(mesh.name);
                mesh.material = newplaneMat;
                // setTimeout(() => {
                //     const hehe = setInterval(() => {
                //         newplaneMat.uniforms.uTime.value += 0.1;
                //         if (newplaneMat.uniforms.uTime.value > 5) {
                //             clearInterval(hehe);
                //             console.log("hehe cleared!s");
                //         }
                //     }, 100);
                // }, 1000);
            })

        }, undefined, function (error) {

            console.error(error);

        });

        window.parent.shaderIt = () => {
            newplaneMat.uniforms.uTime.value = 0.0;
            newplaneMat.uniforms.uThres.value = 0.05;
            // newplaneMat.uniforms.uToSwitch = true;
            const hehe = setInterval(() => {
                newplaneMat.uniforms.uTime.value += newplaneMat.uniforms.uThres.value;
                if (newplaneMat.uniforms.uTime.value > 6) {
                    clearInterval(hehe);
                    newplaneMat.uniforms.uActualColor.value = newplaneMat.uniforms.uTransformColor.value.clone();
                    newplaneMat.uniforms.uTime.value = 0.0;
                    console.log("hehe cleared!s");
                }
            }, 20);
        }

        params.uTransformColor = '#ff0000';

         gui.addColor(params, "uTransformColor")
            .name("Color")
            .onChange(() => {
                newplaneMat.uniforms.uTransformColor.value.set(params.uTransformColor);
            });

        window.parent.getCameraPose = () => {
            console.log(camera.position);
        }

        // adding to gui
        // gui.add(newplaneMat.uniforms.uWaveSpeed, 'value').min(0).max(4).step(0.1).name("Wave Speed");
        // gui.add(newplaneMat.uniforms.uBigWaveFreq.value, 'x').min(0).max(20).name("Wave X Frequency");
        // gui.add(newplaneMat.uniforms.uBigWaveFreq.value, 'y').min(0).max(20).name("Wave Z Frequency");
        // gui.add(newplaneMat.uniforms.uBigWaveElevation, 'value').min(0).max(1).step(0.1).name("Wave Height");
        // gui.addColor(params, "waveDepthColor")
        //     .name("Wave DepthColor")
        //     .onChange((value) => {
        //         newplaneMat.uniforms.uWaveDepthColor.value.set(value);
        //     });
        // gui.addColor(params, "waveSurfaceColor")
        //     .name("Wave SurfaceColor")
        //     .onChange(() => {
        //         newplaneMat.uniforms.uWaveSurfaceColor.value.set(params.waveSurfaceColor);
        //     });
        // gui.add(newplaneMat.uniforms.uColorOffset, 'value').min(0).max(1).step(0.1).name("Color Offset");
        // gui.add(newplaneMat.uniforms.uColorMultiplyer, 'value').min(0).max(5).step(0.5).name("Color Multiplyer");

        // // small wave
        // gui.add(newplaneMat.uniforms.uSmallWaveFreq, 'value').min(0).max(10).step(0.1).name("Small Wave Freq");
        // gui.add(newplaneMat.uniforms.uSmallWaveAmount, 'value').min(0).max(5).step(0.1).name("Small Wave Amount");
        // gui.add(newplaneMat.uniforms.uSmallWaveSpeed, 'value').min(0).max(5).step(0.1).name("Small Wave Speed");
        //#endregion

        // ---------------------------------------------------------------------------------------

        const ambientLight = new THREE.AmbientLight();
        scene.add(ambientLight);

        // gui.add(camera.position,'z').min(2).max(10);

        const controls = new OrbitControls(camera, renderer.domElement);
        const grid = new THREE.GridHelper(10, 10);
        const axes = new THREE.AxesHelper(10, 10);
        scene.add(grid);
        scene.add(axes);

       

        const clock = new THREE.Clock();
        function animate() {
            const elapsedTime = clock.getElapsedTime();
            // newplaneMat.uniforms.uTime.value = elapsedTime;
            // console.log(elapsedTime);
            // newplaneMesh.position.x -= 0.001;    
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize, false);

        animate();

    })

    return (
        <div >
            <h1>TEST</h1>
        </div>
    );
};

export default RiverShader;