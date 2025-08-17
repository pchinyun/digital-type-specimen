// import * as THREE from 'three'; 
// import './style.css'; 
// import { Timer } from 'three/src/core/Timer.js'; 
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 


// //canvas
// const canvas = document.querySelector('canvas.webGl')

// //scene
// const scene = new THREE.Scene(); 


// //object 
// const geometry = new THREE.BoxGeometry(1,1,1) 
// const material = new THREE.MeshBasicMaterial({color:'red'})
// const box = new THREE.Mesh(geometry, material)


// //font
// const fontLoader = new FontLoader();

// fontLoader.load(
//     './static/font/OffBit Regular.json',
//     (font) => { 
//         const textGeometry = new TextGeometry(
//             '@', 
//             {
//                 font: font, 
//                 size: 2, 
//                 depth: 0.1,
//                 curveSegments: 12,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 5
//             }
//         )
//         const textMaterial = new THREE.MeshStandardMaterial({
//             color: 0xff0000,    
//             metalness: 0.3,      
//             roughness: 0.1,      
//             envMapIntensity: 1.2 
//         });
        
//         // const textMaterial = new THREE.MeshNormalMaterial(); 

        
//         const text = new THREE.Mesh(textGeometry, textMaterial)
//         scene.add(text);
//         textGeometry.center(); 
    
//     }
// )

// //lights 
// const dirLight = new THREE.DirectionalLight(0xffffff, 3);
// dirLight.position.set(5, 10, 5);
// scene.add(dirLight);

// // Softer ambient light
// const ambient = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambient);


// //size
// const size = { 
//     width: window.innerWidth, 
//     height: window.innerHeight
// }

// //camera
// const camera = new THREE.PerspectiveCamera(75, size.width / size.height); 
// camera.position.z = 1.5; 
// camera.position.x = 1.5; 
// camera.position.y = 1 
// scene.add(camera)


// //orbit 
// const controls = new OrbitControls(camera, canvas); 
// controls.enableZoom = false;    
// //animation 
// const clock = new THREE.Clock(); 

// const tick = () => 
// { 
// 	clock.update(); 
// 	const deltaTime = clock.getDelta(); 
	
    
// 	controls.update(); 

	
// 	renderer.render(scene,camera); 
	
// 	window.requestAnimationFrame(tick)
// };  


// //renderer
// const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true})
// renderer.setSize(size.width, size.height);
// renderer.render(scene, camera)
// tick(); 


import * as THREE from 'three'; 
import './style.css'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 

// canvas
const canvas = document.querySelector('canvas.webGl');

// scene
const scene = new THREE.Scene(); 

// object
const geometry = new THREE.BoxGeometry(1, 1, 1); 
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const box = new THREE.Mesh(geometry, material);
// scene.add(box); // optional: add box if needed

// font
const fontLoader = new FontLoader();
let text; // global reference

fontLoader.load(
    './static/font/OffBit Regular.json',
    (font) => { 
        const textGeometry = new TextGeometry('@', {
            font: font, 
            size: 2, 
            depth: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        textGeometry.center();

        const textMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,    
            metalness: 0.3,      
            roughness: 0.1,      
            envMapIntensity: 1.2 
        });

        text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);
    }
);

// lights 
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// size
const size = { 
    width: window.innerWidth, 
    height: window.innerHeight
};

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height); 
camera.position.set(1.5, 0, 1.5);
scene.add(camera);

// orbit controls
const controls = new OrbitControls(camera, canvas); 
controls.enableZoom = false;    

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(size.width, size.height);

// clock for animation
const clock = new THREE.Clock();

// animation loop
const tick = () => { 
    const deltaTime = clock.getDelta(); // time since last frame

    // rotate text if loaded
    if (text) {
        text.rotation.y += -0.5 * deltaTime;
    }

    controls.update(); 
    renderer.render(scene, camera); 
    window.requestAnimationFrame(tick);
};  

tick();
