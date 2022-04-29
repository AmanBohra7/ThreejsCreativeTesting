import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SpaceImage from '../../assets/images/space.jpg';
import { AxesHelper } from 'three';
import {
    ModifierStack,
    Twist,
    Noise,
    Cloth,
    UserDefined,
    Taper,
    Break,
    Bloat,
    Vector3,
    ModConstant,
    Bend
  } from "three.modifiers";
import { DoubleSide } from 'three';
import { Box3 } from 'three';
import gsap from 'gsap';
import * as dat from 'dat.gui';

const RotationVideoPanel = () => {

    // useEffect(() => {

    //     console.log("test!");

    //     const scene = new THREE.Scene();
    //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     const renderer = new THREE.WebGLRenderer({
    //         canvas: document.getElementById("bg"),
    //         antialias: true
    //     });
    //     renderer.setPixelRatio(window.devicePixelRatio);
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     renderer.outputEncoding = THREE.sRGBEncoding;

    //     scene.background = SpaceImage;

    //     const createTorus = () => {
    //         const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    //         const material = new THREE.MeshStandardMaterial({
    //             color: 0xFF6347
    //         });
    //         const torus = new THREE.Mesh(geometry, material);
    //         scene.add(torus);
    //     }

    //     // scene.background.setRGB(new THREE.Color(150,0,0));

    //     createTorus();

    //     const controls = new OrbitControls(camera,renderer.domElement);

    //     const pointLight = new THREE.PointLight(0xffffff);
    //     pointLight.position.set(5, 5, 5);
    //     scene.add(pointLight);

    //     const ambientLight = new THREE.AmbientLight(0xffffff);
    //     scene.add(ambientLight);

    //     const lightHelper = new THREE.PointLightHelper(pointLight);
    //     const gridHelper = new THREE.GridHelper(200, 50);
    //     scene.add(lightHelper,gridHelper);

    //     const axisHelper = new AxesHelper();
    //     scene.add(axisHelper);

    //     function onWindowResize() {
    //         camera.aspect = window.innerWidth / window.innerHeight;
    //         camera.updateProjectionMatrix();
    //         renderer.setSize(window.innerWidth, window.innerHeight);
    //     }
    //     window.addEventListener('resize', onWindowResize, false);

    //     function animate(){
    //         requestAnimationFrame(animate);
    //         renderer.render(scene,camera);
    //         controls.update();
    //       }

    //     animate();

    // }, []);

    useEffect(() => {

        const scene = new THREE.Scene();

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

        camera.position.set(0, 0, 10);
        let _x = 0
        let _y = 0
        let _z = 0
        camera.rotation.setFromVector3(new THREE.Vector3(_x, _y, _z));
        
        
        const geometry1 = new THREE.PlaneGeometry(50,30,20,20);
        const mateiral1 = new THREE.MeshBasicMaterial({
            color:  0xFF5733,
            side: THREE.DoubleSide,
            wireframe: true
        });
        const box1 = new THREE.Mesh(geometry1,mateiral1);
        box1.rotation.y = Math.PI;
        box1.scale.set(0.5,0.5,0.5);
        scene.add(box1);
        
        // const geometry2 = new THREE.PlaneGeometry(10,20,10,10);
        // const mateiral2 = new THREE.MeshBasicMaterial({
            //     color:  0xFF5733,
            //     side: THREE.DoubleSide,
            //     wireframe: true
            // });
        // const box2 = new THREE.Mesh(geometry2,mateiral2);
        // box2.position.z -= 10;
        // scene.add(box2);
        
        // const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        // const material = new THREE.MeshStandardMaterial({
            //     color: 0xFF5733
            // });
            // const torus = new THREE.Mesh(geometry, material);
            // torus.position.set(new THREE.Vector3(0,0,0))
            // scene.add(torus);
            
            // Modifieres test
            const modifier = new ModifierStack(box1);
            const bend = new Bend(10, 0.1, 1);
            bend.constraint = ModConstant.RIGHT;
            modifier.addModifier(bend);
            modifier.apply()
            // ______________
            const base = { duration: 0.7, ease: "back.out" , delay: 2};
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

            var whereAt= (function(){
                if(window.pageXOffset!= undefined){
                    return function(ev){
                        return [ev.clientX+window.pageXOffset,
                        ev.clientY+window.pageYOffset];
                    }
                }
                else return function(){
                    var ev= window.event,
                    d= document.documentElement, b= document.body;
                    return [ev.clientX+d.scrollLeft+ b.scrollLeft,
                    ev.clientY+d.scrollTop+ b.scrollTop];
                }
            })()
            document.ondblclick=function(e){alert(whereAt(e))};
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
            
            // DEBUG
            // const gui = new dat.GUI();
            // console.log(gui)
            // ====
            
            
            // gsap.to(torus.scale, { duration: 4, x: 0.1, delay: 1 });
            
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);
        
        // const lightHelper = new THREE.PointLightHelper(pointLight);
        const gridHelper = new THREE.GridHelper(50, 50);
         const axesHelper = new THREE.AxesHelper( 10 );
        // scene.add( axesHelper );
        scene.add(gridHelper,axesHelper);
        
        
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
        
        Array(200).fill().forEach(addStar);
        
        // console.log(window.allStar);
        
        
        
        const controls = new OrbitControls(camera, renderer.domElement);
        
        // const spaceTexture = new THREE.TextureLoader().load('../images/space.jpg');
        // scene.background = new THREE.TextureLoader().load(SpaceImage);
        
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

       

        // window.onbeforeunload = function () {
        //     window.scrollTo(0, 0);
        // }

        // document.body.onscroll = moveCamera;

        // const clock = new THREE.Clock();
        const _yMax =  1000;
        const _yMin = 0;
        let mouseY = 0;
        function animate() {
            // torus.rotation.y += 0.02;
            // camera.lookAt(new THREE.Vector3(torus.position.x, torus.position.y, torus.position.z));
            // camera.position.x = Math.cos(clock.getElapsedTime()) * 20;
            // camera.position.y = Math.sin(clock.getElapsedTime()) * 20;
            renderer.render(scene, camera);
            controls.update();

            

            // console.log(whereAt(e)[1]);
            requestAnimationFrame(animate);
            modifier && modifier.apply();
        }

        // setInterval(() => {
        //     if(mouseY > 0 && mouseY < 1000){
        //         bend.offset = (mouseY - _yMin)/(_yMax - _yMin)
        //         // console.log(`MouseY ${mouseY} - Calculated ${bend.offset}`);
        //     }
        // },100);

        window.onmousemove = (e) =>{
            // console.log(e);
            mouseY = e.offsetY;
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
        <div>
            {/* <h1>TEST</h1> */}
        </div>
    );
};

export default RotationVideoPanel;