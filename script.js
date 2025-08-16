import * as THREE from 'three'; 
import './style.css'; 
import { Timer } from 'three/src/core/Timer.js'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 



//canvas
const canvas = document.querySelector('canvas.webGl')

//scene
const scene = new THREE.Scene(); 
// const loader = new THREE.TextureLoader(); 
// loader.load('static/images/sci fi grid.jpg', function(texture) {
//     scene.background = texture; 
//     texture.colorSpace = THREE.SRGBColorSpace; 
// })


//object 
const geometry = new THREE.BoxGeometry(1,1,1) 
const material = new THREE.MeshBasicMaterial({color:'red'})
const box = new THREE.Mesh(geometry, material)


//font
const fontLoader = new FontLoader();

fontLoader.load(
    './static/font/OffBit Regular.json',
    (font) => { 
        const textGeometry = new TextGeometry(
            '@', 
            {
                font: font, 
                size: 2, 
                depth: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text);
        textGeometry.center(); 
    
    }
)


//size
const size = { 
    width: window.innerWidth, 
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height); 
camera.position.z = 2; 
camera.position.x = 1.5; 
camera.position.y = 1 
scene.add(camera)


//orbit 
const controls = new OrbitControls(camera, canvas); 
controls.enableZoom = false;    
//animation 
const timer = new Timer(); 

const tick = () => 
{ 
	timer.update(); 
	const elaspedTime = timer.getDelta(); 
	
    
	controls.update(); //this throws error, need to check why 

	
	renderer.render(scene,camera); 
	
	window.requestAnimationFrame(tick)
};  


//renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true})
renderer.setSize(size.width, size.height);
renderer.render(scene, camera)
tick(); 

