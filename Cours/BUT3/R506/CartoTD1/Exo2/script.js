document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour afficher les données d'orientation
    function displayOrientation(event) {
        const data = `
            Alpha: ${event.alpha}<br>
            Beta: ${event.beta}<br>
            Gamma: ${event.gamma}
        `;
        document.getElementById('orientationData').innerHTML = data;
    }

    // Fonction pour afficher les données de mouvement
    function displayMotion(event) {
        const acceleration = event.accelerationIncludingGravity;
        const rotationRate = event.rotationRate;
        const data = `
            Accélération (x, y, z): ${acceleration.x}, ${acceleration.y}, ${acceleration.z}<br>
            Rotation (alpha, beta, gamma): ${rotationRate.alpha}, ${rotationRate.beta}, ${rotationRate.gamma}
        `;
        document.getElementById('motionData').innerHTML = data;
    }

    // Écouteur d'événements pour l'orientation
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', displayOrientation);
    } else {
        document.getElementById('orientationData').innerHTML = "L'orientation du dispositif n'est pas supportée par ce navigateur.";
    }

    // Écouteur d'événements pour le mouvement
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', displayMotion);
    } else {
        document.getElementById('motionData').innerHTML = "Le mouvement du dispositif n'est pas supporté par ce navigateur.";
    }

    // Initialiser la carte
    let map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fonction pour mettre à jour la carte avec la nouvelle position
    function updateMap(lat, lon) {
        map.setView([lat, lon], 15);
        L.marker([lat, lon]).addTo(map);
    }

    // Utilisation de getCurrentPosition pour initialiser la carte
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const coords = position.coords;
            updateMap(coords.latitude, coords.longitude);
        });
    } else {
        document.getElementById('map').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
});
