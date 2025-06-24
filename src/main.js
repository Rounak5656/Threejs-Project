import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as lil from 'lil-gui';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); //black background

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-5, 5, 0);
scene.add(pointLight);

// Light helpers
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

// Geometry and Material
const geometry = new THREE.CylinderGeometry(2, 2, 2, 32);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00, 
    wireframe: true,
    transparent: true,
    opacity: 0.8
});
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Renderer
const canvas = document.querySelector('canvas');
if (!canvas) {
    console.error('Canvas element not found');
    throw new Error('Canvas element not found');
}

const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = false;
controls.enableZoom = true;
controls.minDistance = 2;
controls.maxDistance = 10;

// GUI
const gui = new lil.GUI();

const cylinderFolder = gui.addFolder('Cylinder Controls');
cylinderFolder.add(cylinder.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
cylinderFolder.add(cylinder.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
cylinderFolder.add(cylinder.position, 'x', -5, 5).name('Position X');
cylinderFolder.add(cylinder.position, 'y', -5, 5).name('Position Y');
cylinderFolder.add(cylinder.position, 'z', -5, 5).name('Position Z');
cylinderFolder.add(cylinder.scale, 'x', 0.1, 3).name('Scale X');
cylinderFolder.add(cylinder.scale, 'y', 0.1, 3).name('Scale Y');
cylinderFolder.add(cylinder.scale, 'z', 0.1, 3).name('Scale Z');

const materialFolder = gui.addFolder('Material Settings');
materialFolder.add(material, 'wireframe').name('Wireframe');
materialFolder.addColor(material, 'color').name('Color');
materialFolder.add(material, 'opacity', 0, 1).name('Opacity');
materialFolder.add(material, 'transparent').name('Transparent');

const cameraFolder = gui.addFolder('Camera Controls');
cameraFolder.add(camera.position, 'z', 0, 10).name('Camera Z');
cameraFolder.add(controls, 'autoRotate').name('Auto Rotate');
cameraFolder.add(controls, 'enableDamping').name('Enable Damping');

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
