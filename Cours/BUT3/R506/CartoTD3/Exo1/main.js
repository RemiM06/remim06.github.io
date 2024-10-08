import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcccccc, 5, 15);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const objectLoader = new THREE.ObjectLoader();

let cube;

const jsonModelUrl = 'example.json'; 

objectLoader.load(
    jsonModelUrl,
    function (object) {
        cube = object;
        scene.add(cube);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    function (error) {
        console.error('Une erreur s\'est produite lors du chargement du modèle:', error);
    }
);

// Effet de pluie
let rain;
const rainGeometry = new THREE.BufferGeometry();
const rainMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.02 });
const rainCount = 1000;
const rainPositions = new Float32Array(rainCount * 3);

for (let i = 0; i < rainCount; i++) {
    rainPositions[i * 3] = Math.random() * 20 - 10;
    rainPositions[i * 3 + 1] = Math.random() * 20 - 10;
    rainPositions[i * 3 + 2] = Math.random() * 20 - 10;
}

rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
rain = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rain);

function animate() {
    requestAnimationFrame(animate);

    if (cube) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    if (rain) {
        updateRain();
    }

    controls.update();

    renderer.render(scene, camera);
}

function updateRain() {
    const positions = rain.geometry.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= 0.1;
        if (positions[i * 3 + 1] < -10) {
            positions[i * 3 + 1] = 10;
        }
    }
    rain.geometry.attributes.position.needsUpdate = true;
}

// Gestion des événements de dispositif
function enableMotionAndOrientation() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response == 'granted') {
                    window.addEventListener('devicemotion', handleDeviceMotion);
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleDeviceMotion);
        window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
}

function handleDeviceOrientation(event) {
    if (cube) {
        const { beta, gamma } = event;
        
        const betaRad = THREE.MathUtils.degToRad(beta);
        const gammaRad = THREE.MathUtils.degToRad(gamma);
        
        const moveX = Math.sin(gammaRad) * 0.1;
        const moveY = Math.sin(betaRad) * 0.1;
        
        cube.position.x += moveX;
        cube.position.y -= moveY;
        
        const maxRadius = 5;
        const distance = Math.sqrt(cube.position.x ** 2 + cube.position.y ** 2);
        if (distance > maxRadius) {
            const ratio = maxRadius / distance;
            cube.position.x *= ratio;
            cube.position.y *= ratio;
        }
    }
}

function handleDeviceMotion(event) {
    if (cube) {
        const { acceleration } = event;
        cube.position.x += acceleration.x * 0.01;
        cube.position.y += acceleration.y * 0.01;
        cube.position.z += acceleration.z * 0.01;
    }
}

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.update();
});

// Démarrage de l'animation
animate();

// Ajoutez un bouton dans votre HTML pour activer les capteurs
document.getElementById('enableMotion').addEventListener('click', enableMotionAndOrientation);