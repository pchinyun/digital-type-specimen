import * as THREE from "./node_modules/three/build/three.module.js"
import './style.css'; 
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js';

// canvas
const canvas = document.querySelector('canvas.percentSymbol');

// scene
const scene = new THREE.Scene();

// size
const size = { width: 400, height: 400 };

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 2;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(size.width, size.height);

// orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = true; // smooth interaction

// global reference for text
let text;

// font loader
const fontLoader = new FontLoader();
fontLoader.load(
  './static/font/OffBit Regular.json', // keep relative path to font
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
      bevelSegments: 5,
    });

    textGeometry.center();

    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      metalness: 0.3,
      roughness: 0.1,
      envMapIntensity: 1.2,
    });

    text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
  }
);

// lights
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// clock (replaces Timer)
const clock = new THREE.Clock();

// animation loop
const tick = () => {
  const deltaTime = clock.getDelta(); // time since last frame

  // spin text if loaded
  if (text) {
    text.rotation.y += 0.5 * deltaTime; // continuous spin
  }

  controls.update(); // needed if enableDamping = true
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();


