const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

window.addEventListener('deviceorientation', (event) => {
    const { alpha, beta, gamma } = event;

    const alphaRad = BABYLON.Tools.ToRadians(alpha);
    const betaRad = BABYLON.Tools.ToRadians(beta);
    const gammaRad = BABYLON.Tools.ToRadians(gamma);

    sphere.rotation.x = betaRad;
    sphere.rotation.y = gammaRad;
    sphere.rotation.z = alphaRad;
});

window.addEventListener('devicemotion', (event) => {
    const { acceleration } = event;

    sphere.position.x += acceleration.x * 0.01;
    sphere.position.y += acceleration.y * 0.01;
    sphere.position.z += acceleration.z * 0.01;
});
