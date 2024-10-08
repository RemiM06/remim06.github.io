import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0xcccccc, 5, 15);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

 
let rain;

const rainParticles = [];
const rainGeometry = new THREE.BufferGeometry();
const rainMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.1 });

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

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

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

window.addEventListener('deviceorientation', (event) => {
    if (cube) {
        const { alpha, beta, gamma } = event;

        const alphaRad = THREE.MathUtils.degToRad(alpha);
        const betaRad = THREE.MathUtils.degToRad(beta);
        const gammaRad = THREE.MathUtils.degToRad(gamma);

        cube.rotation.x = betaRad;
        cube.rotation.y = gammaRad;
        cube.rotation.z = alphaRad;
    }
});

window.addEventListener('devicemotion', (event) => {
    if (cube) {
        const { acceleration } = event;
        cube.position.x += acceleration.x * 0.01;
        cube.position.y += acceleration.y * 0.01;
        cube.position.z += acceleration.z * 0.01;
    }
});
