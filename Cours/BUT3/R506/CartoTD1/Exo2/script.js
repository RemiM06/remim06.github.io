document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour afficher les données d'orientation
    function displayOrientation(event) {
        const data = `
            Alpha: ${event.alpha}<br>
            Beta: ${event.beta}<br>
            Gamma: ${event.gamma}
        `;
        document.getElementById('orientationData').innerHTML = data;

        // Mettre à jour l'orientation du marqueur sur la carte
        updateMarkerOrientation(event.alpha);
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

    // Initialiser la carte
    let map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Variable pour stocker le marqueur
    let marker;

    // Fonction pour mettre à jour la carte avec la nouvelle position
    function updateMap(lat, lon) {
        map.setView([lat, lon], 15);
        if (marker) {
            marker.setLatLng([lat, lon]);
        } else {
            marker = L.marker([lat, lon], { icon: createRotatedIcon(0) }).addTo(map);
        }
    }

    // Fonction pour créer une icône avec rotation
    function createRotatedIcon(rotation) {
        return L.divIcon({
            className: 'rotated-icon',
            html: `<div style="transform: rotate(${rotation}deg);">
                    <img src="https://example.com/marker-icon.png" style="width: 32px; height: 32px;">
                </div>`,
            iconSize: [32, 32]
        });
    }

    // Fonction pour mettre à jour l'orientation du marqueur
    function updateMarkerOrientation(alpha) {
        if (marker) {
            marker.setIcon(createRotatedIcon(alpha));
        }
    }

    // Fonction pour demander l'autorisation de géolocalisation
    function requestPermissions() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const coords = position.coords;
                updateMap(coords.latitude, coords.longitude);
            }, function(error) {
                console.error("Erreur de géolocalisation : ", error);
                document.getElementById('map').innerHTML = "Erreur de géolocalisation : " + error.message;
            });
        } else {
            console.log("La géolocalisation n'est pas supportée par ce navigateur.");
            document.getElementById('map').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
        }

        // Écouteur d'événements pour l'orientation
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', displayOrientation);
        } else {
            console.log("L'orientation du dispositif n'est pas supportée par ce navigateur.");
            document.getElementById('orientationData').innerHTML = "L'orientation du dispositif n'est pas supportée par ce navigateur.";
        }

        // Écouteur d'événements pour le mouvement
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', displayMotion);
        } else {
            console.log("Le mouvement du dispositif n'est pas supporté par ce navigateur.");
            document.getElementById('motionData').innerHTML = "Le mouvement du dispositif n'est pas supporté par ce navigateur.";
        }
    }

    // Ajouter un écouteur d'événements au bouton
    document.getElementById('requestPermissions').addEventListener('click', requestPermissions);
});
