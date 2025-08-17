// import * as THREE from 'three'; 
// import './style.css'; 
// import { Timer } from 'three/src/core/Timer.js'; 
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 



// //canvas
// const canvas = document.querySelector('canvas.percentSymbol')

// //scene
// const scene = new THREE.Scene(); 




// //font
// const fontLoader = new FontLoader();

// fontLoader.load(
//     './static/font/OffBit Regular.json',
//     (font) => { 
//         const textGeometry = new TextGeometry(
//             '%', 
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
            
//         textGeometry.center()

//         const textMaterial = new THREE.MeshNormalMaterial(); 
//         const text = new THREE.Mesh(textGeometry, textMaterial)

//         scene.add(text);
  
//     }
    
// )




// //size
// const size = { 
//     width:  400, 
//     height: 400
// }

// //camera
// const camera = new THREE.PerspectiveCamera(75, size.width / size.height); 
// camera.position.z = 2; 
// scene.add(camera)


// //orbit 
// const controls = new OrbitControls(camera, canvas); 
// controls.enableZoom = false;    
// //animation 
// const timer = new Timer(); 

// const tick = () => 
// { 
// 	timer.update(); 
// 	const elaspedTime = timer.getDelta(); 
	
    
// 	controls.update(); //this throws error, need to check why 

	
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
import { Timer } from 'three/src/core/Timer.js'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 

//canvas
const canvas = document.querySelector('canvas.percentSymbol')

//scene
const scene = new THREE.Scene(); 

//size
const size = { 
    width:  400, 
    height: 400
}

//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height); 
camera.position.z = 2; 
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true})
renderer.setSize(size.width, size.height);

//orbit 
const controls = new OrbitControls(camera, canvas); 
controls.enableZoom = false;    
controls.enableDamping = true;   // smooth interaction

//global reference for text
let text;

//font
const fontLoader = new FontLoader();
fontLoader.load(
    './static/font/OffBit Regular.json',
    (font) => { 
        const textGeometry = new TextGeometry('%', {
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
            color: 0xff0000,     // base metal tint (light gray = steel)
            metalness: 0.3,        // fully metallic
            roughness: 0.1,      // lower = shinier, higher = rough brushed metal
            envMapIntensity: 1.2 // strength of environment reflections
        });
         
        text = new THREE.Mesh(textGeometry, textMaterial);

        scene.add(text);
    }
);

//lights 
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Softer ambient light
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

//timer
const timer = new Timer(); 

//animation loop
const tick = () => { 
	timer.update(); 
	const deltaTime = timer.getDelta(); 
	
    // spin text if loaded
	if (text) {
		text.rotation.y += 0.5 * deltaTime;  // continuous spin
	}

	controls.update(); // needed if enableDamping = true
	renderer.render(scene,camera); 
	
	window.requestAnimationFrame(tick);
};  

tick();
