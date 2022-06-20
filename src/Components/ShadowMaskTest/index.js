import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SpaceImage from '../../assets/images/space.jpg';
import Seq01 from '../../images/seq01.png';
import Seq02 from '../../images/seq02.png';
import Seq03 from '../../images/seq03.png';
import Seq04 from '../../images/seq04.png';
import { AxesHelper } from 'three';
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
import { DoubleSide } from 'three';
import { Box3 } from 'three';
import gsap from 'gsap';
import * as dat from 'dat.gui';

import paperBaseMapFile from '../../assets/carboardTexture/paper_color.jpg';
import paperNormalMapFile from '../../assets/carboardTexture/paper_normal_opengl.png';
import paperAOMapFile from '../../assets/carboardTexture/paper_ao.jpg';
import paperHeightMapFile from '../../assets/carboardTexture/paper_height.png';
import paperRoughnessMapFile from '../../assets/carboardTexture/paper_roughness.jpg';
import { DirectionalLight } from 'three';
import { hover } from '@testing-library/user-event/dist/hover';
// import { ThreeMesh } from 'three.modifiers/src/three/ThreeMesh';

// eslint-disable-next-line import/no-webpack-loader-syntax
// import * as SampleVertexShader from '../../Shaders/SampleShader/vertex.glsl!raw';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import SampleFragmentShader from '../../Shaders/SampleShader/fragment.glsl!raw';

// import * as SampleVertexShader from '../../Shaders/SampleShader/vertexShader.glsl'
// import * as SampleFragmentShader from '../../Shaders/SampleShader/fragmentShader.glsl'
// import { ThreeMesh } from 'three.modifiers/src/three/ThreeMesh';

const ShadowMaskTest = () => {

    const [isCreated, setCreation] = useState(false);
    const test = useRef();

    useEffect(() => {

        // if(isCreated) return;
        if (test.current) return;
        setCreation(true);

        console.log("TEST");
        const scene = new THREE.Scene();
        test.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("bg"),
            antialias: true
        });

        renderer.shadowMap.enabled = true;
        // const textureLoader = new THREE.TextureLoader();
        // const diffuseMap = textureLoader.load(paperBaseMapFile);
        // const normalMap = textureLoader.load(paperNormalMapFile);
        // const aoMap = textureLoader.load(paperAOMapFile);
        // const dispMap = textureLoader.load(paperHeightMapFile);
        // const roughnessMap = textureLoader.load(paperRoughnessMapFile);

        // -----------------------------------------------------------------------------------

        //#region Shader practive
        const newplane = new THREE.PlaneBufferGeometry(1,1);
        const newplaneMat = new THREE.RawShaderMaterial({
            uniforms:{
                uColor : { value: new THREE.Color('#00ff00')}
            },
            vertexShader:`
                uniform mat4 projectionMatrix;
                uniform mat4 viewMatrix;
                uniform mat4 modelMatrix;
                
                attribute vec3 position;
                attribute vec2 uv;

                varying vec3 vPos;
                varying vec2 vUv;
                
                void main(){
                    vPos = position;
                    vUv = uv;
                    vec4 modelPosition = modelMatrix * vec4(position,1.0);
                    gl_Position = projectionMatrix * viewMatrix * modelPosition;
                }`,
            fragmentShader:`
                precision mediump float;
                uniform vec3 uColor;
                varying vec3 vPos;
                varying vec2 vUv;
                void main(){
                    float strength = floor(vUv.x * 10.0) / 10.0 ; 
                    strength *= floor(vUv.y * 10.0) / 10.0; 
                    // float strength = step(0.4,max(abs(vUv.x -  0.5),abs(vUv.y -  0.5)));
                    // float strength = 1.0 ;
                    // if(vUv.x > 0.25 && vUv.x < 0.75){
                    //     strength = 0.0;
                    // }
                    // if(vUv.y < 0.25 || vUv.y > 0.75){
                    //     strength = 1.0;
                    // }
                    // strength += abs(vUv.y -  0.5);
                    // float strength = step(0.5,mod(vUv.y*10.0,1.0));
                    // strength *= step(0.7,mod(vUv.y*10.0,1.0));
                    // strength += step(0.7,mod(vUv.x*10.0,1.0));
                    // strength *= step(0.2,mod(vUv.y*10.0,1.0));
                    gl_FragColor = vec4(vec3(strength),1);
                }`,
            transparent: true,
            // wireframe: true
        });
        const newplaneMesh = new THREE.Mesh(newplane, newplaneMat);
        newplaneMesh.position.set(0,0,0)
        scene.add(newplaneMesh);
        console.log(newplane)

        // float strength = step(0.5,mod(vUv.x*10.0,1.0));
        // float strength = mod(vUv.x*10.0,1.0);
                    // strength = step(0.5,strength);
        //#endregion

        // ---------------------------------------------------------------------------------------

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.gammaFactor = 2.2;
        renderer.outputEncoding = THREE.sRGBEncoding;

        // const gui = new dat.GUI();

        camera.position.set(0,0,2);
        let _x = 0
        let _y = 0
        let _z = 0
        camera.rotation.setFromVector3(new THREE.Vector3(_x, _y, _z));

        // gui.add(camera.position,'z').min(2).max(10);

        // const geometry1 = new THREE.PlaneGeometry(50,30,20,20);
        // const geometry1 = new THREE.PlaneBufferGeometry(2, 2);
        // const mateiral1 = new THREE.MeshStandardMaterial({
        //     color: 0xFF5733,
        //     side: THREE.DoubleSide,
        //     // opacity:0.1,
        //     // colorWrite:false,
        //     // depthWrite:false,
        //     // wireframe: true
        //     // map:diffuseMap,
        //     // normalMap:normalMap,
        //     // aoMap:aoMap,
        //     // aoMapIntensity:1,
        //     // displacementMap:dispMap,
        //     // displacementScale:0.1,
        //     // roughnessMap:roughnessMap,
        // });

        // mateiral1.opacity = 0.1;
        // mateiral1.normalScale.set(1.2, 1.2)
        // const box1 = new THREE.Mesh(geometry1, mateiral1);
        // // box1.rotation.y = Math.PI;
        // box1.rotation.x = Math.PI / 2;
        // // box1.scale.set(0.5,0.5,0.5);
        // box1.receiveShadow = true;
        // scene.add(box1);

        // box1.geometry.setAttribute('uv2',
        //     new THREE.BufferAttribute(
        //         box1.geometry.attributes.uv.array,2
        //     )
        // )



        // Modifieres test
        // const modifier = new ModifierStack(box1);
        // const bend = new Bend(10, 0.1, 1);
        // bend.constraint = ModConstant.RIGHT;
        // modifier.addModifier(bend);
        // modifier.apply()
        // ______________
        // const base = { duration: 0.7, ease: "back.out", delay: 2 };
        // gsap.to(
        //     bend,
        //     {
        //         offset:0.9,
        //         // force:15,
        //         duration:0.5,
        //         // angle:1.5,
        //         onUpdate: () => modifier.apply()
        //     }
        // )

        var whereAt = (function () {
            if (window.pageXOffset != undefined) {
                return function (ev) {
                    return [ev.clientX + window.pageXOffset,
                    ev.clientY + window.pageYOffset];
                }
            }
            else return function () {
                var ev = window.event,
                    d = document.documentElement, b = document.body;
                return [ev.clientX + d.scrollLeft + b.scrollLeft,
                ev.clientY + d.scrollTop + b.scrollTop];
            }
        })()
        document.ondblclick = function (e) { alert(whereAt(e)) };
        // gsap.to()
        // gsap.to(
        //     bend,
        //     {
        //       force: 0,
        //       angle: 2,
        //       ...base,
        //       ease: "cubic.out",
        //       onUpdate: () => modifier.apply()
        //     }
        //   );
        // gsap.to(
        //     box1.scale,
        //     {
        //         x: 1,
        //         y: 1,
        //         z: 1,
        //         ...base,
        //         ease: "elastic",
        //     }
        // )
        // gsap.fromTo(box1.position.x,5,{duration:2,delay:1});


        // gsap.to(torus.scale, { duration: 4, x: 0.1, delay: 1 });

        // const pointLight = new THREE.PointLight(0xffffff);
        // pointLight.position.set(5, 5, 5);
        // scene.add(pointLight);

        // const sphere = new THREE.Mesh(
        //     new THREE.SphereBufferGeometry(0.5),
        //     new THREE.MeshStandardMaterial({
        //         color: 0xff0000,
        //         colorWrite: false,
        //         transparent: true
        //     })
        // );
        // sphere.position.set(0, 1, 0);
        // sphere.castShadow = true;
        // scene.add(sphere);

        const directionalLigth = new THREE.DirectionalLight(0xffffff);
        directionalLigth.castShadow = true;
        directionalLigth.position.set(2, 5);
        scene.add(directionalLigth)

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLigth);
        scene.add(directionalLightHelper);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        // const lightHelper = new THREE.PointLightHelper(pointLight);
        const gridHelper = new THREE.GridHelper(10, 10);
        const axesHelper = new THREE.AxesHelper(10);
        // scene.add( axesHelper );
        scene.add(gridHelper, axesHelper);


        window.allStar = [];

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.25, 24, 24);
            const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const star = new THREE.Mesh(geometry, material);

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

            star.position.set(x, y, z);
            scene.add(star);

            window.allStar.push(star);
        }

        // Array(200).fill().forEach(addStar);

        // console.log(window.allStar);



        const controls = new OrbitControls(camera, renderer.domElement);



        // const textPlane = new THREE.Mesh(
        //     new THREE.PlaneBufferGeometry(2, 2),
        //     new THREE.MeshBasicMaterial({
        //         // color: 0xff0000
        //     })
        // );



        // textPlane.position.x = 4;
        // scene.add(textPlane)


        // textPlane.material.map = image01;
        // textPlane.material.needsUpdate = true;
        // textPlane.material.transparent = true;
        // let imageSeqTextures = []
        // const textureLoader = new THREE.TextureLoader();
        // textureLoader.load(Seq01, (texture) => { 
        //     imageSeqTextures.push(texture); 
        //     textPlane.material.map = texture;
        //     textPlane.material.needsUpdate = true;
        // });
        // textureLoader.load(Seq02, (texture) => { imageSeqTextures.push(texture); });
        // textureLoader.load(Seq03, (texture) => { imageSeqTextures.push(texture); });
        // textureLoader.load(Seq04, (texture) => { imageSeqTextures.push(texture); });

        // const spaceTexture = new THREE.TextureLoader().load('../images/space.jpg');
        scene.background = new THREE.TextureLoader().load(SpaceImage);

        // let lastt = -1;
        // function moveCamera() {
        //     // const t = document.getElementById("test").getBoundingClientRect().top;
        //     const t = document.body.getBoundingClientRect().top;
        //     if (t > 0) return;
        //     // console.log(t);
        //     if (t < -1043) {
        //         // ambientLight.intensity = 0.2;
        //         // pointLight.intensity = 0.2;
        //         // scene.background = null;
        //         // torus.material.opacity = 0.5;
        //     } else {
        //         ambientLight.intensity = 1;
        //         pointLight.intensity = 1;

        //     }
        //     if (lastt == -1) { lastt = t; return; }
        //     if (lastt > t) {
        //         // console.log('scroll down!');
        //         lastt = t;
        //         camera.position.y = Math.abs(t) * 0.02;
        //     } else {
        //         lastt = t;
        //         // console.log('scroll down!');
        //         camera.position.y = Math.abs(t) * 0.02;
        //     }
        // }

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();


        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX / window.innerWidth * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        })

        // window.onbeforeunload = function () {
        //     window.scrollTo(0, 0);
        // }

        // document.body.onscroll = moveCamera;

        // const clock = new THREE.Clock();
        const _yMax = 1000;
        const _yMin = 0;
        let mouseY = 0;
        // let time = Date.now();

        let hoverEntered = false;
        let loopInterval = null;
        let counter = 0;

        const clock = new THREE.Clock();
        function animate() {

            const deltaTime = clock.getElapsedTime();
            // const currentTime = Date.now();
            // const deltaTime = currentTime - time;
            // time = currentTime;

            // sphere.position.y = Math.sin(deltaTime * 2) * 1.5;
            // sphere.position.x = Math.cos(deltaTime * 2) * 1.5;

            // raycaster.setFromCamera(mouse, camera);
            // const objectsTotest = [textPlane];
            // const intersects = raycaster.intersectObjects(objectsTotest);

            // if (intersects.length > 0) {
            //     if(!hoverEntered){

            //         // console.log("Hovered entered");
            //         hoverEntered = true;
            //         counter = 0;
            //         if(loopInterval != null){
            //             clearInterval(loopInterval);
            //             loopInterval = null;
            //         }
            //         loopInterval = setInterval(() => {
            //             if(counter < imageSeqTextures.length - 1) counter += 1;
            //             else{
            //                 clearInterval(loopInterval);
            //                 loopInterval = null;
            //             }
            //             // console.log(counter)
            //             textPlane.material.map = imageSeqTextures[counter];
            //             textPlane.material.needsUpdate = true;
            //         }, 100);
            //     }
            // } else {
            //     if (hoverEntered) {
            //         // console.log("Hover exit!");
            //         hoverEntered = false;
            //         counter = imageSeqTextures.length ;
            //         if(loopInterval != null){
            //             clearInterval(loopInterval);
            //             loopInterval = null;
            //         }
            //         loopInterval = setInterval(() => {
            //             if(counter > 0) counter -= 1;
            //             else{
            //                  clearInterval(loopInterval);
            //                  loopInterval = null;
            //             }
            //             // console.log(counter)
            //             textPlane.material.map = imageSeqTextures[counter];
            //             textPlane.material.needsUpdate = true;
            //         }, 200);
            //     }
            // }

            // torus.rotation.y += 0.02;
            // camera.lookAt(new THREE.Vector3(torus.position.x, torus.position.y, torus.position.z));
            // camera.position.x = Math.cos(clock.getElapsedTime()) * 20;
            // camera.position.y = Math.sin(clock.getElapsedTime()) * 20;
            renderer.render(scene, camera);
            controls.update();



            // console.log(whereAt(e)[1]);
            requestAnimationFrame(animate);
            // modifier && modifier.apply();
        }

        // setInterval(() => {
        //     if(mouseY > 0 && mouseY < 1000){
        //         bend.offset = (mouseY - _yMin)/(_yMax - _yMin)
        //         // console.log(`MouseY ${mouseY} - Calculated ${bend.offset}`);
        //     }
        // },100);

        // window.onmousemove = (e) => {
        //     // console.log(e);
        //     mouseY = e.offsetY;
        // }

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

export default ShadowMaskTest;