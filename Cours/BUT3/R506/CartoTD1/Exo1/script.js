document.addEventListener('DOMContentLoaded', function() {
    function displayPosition(position, elementId) {
        const coords = position.coords;
        const data = `
            Latitude: ${coords.latitude}<br>
            Longitude: ${coords.longitude}<br>
            Altitude: ${coords.altitude !== null ? coords.altitude : 'N/A'}<br>
            Précision: ${coords.accuracy} mètres<br>
            Vitesse: ${coords.speed !== null ? coords.speed : 'N/A'} m/s<br>
            Date: ${new Date(coords.timestamp).toLocaleString()}
        `;
        document.getElementById(elementId).innerHTML = data;

        updateMap(coords.latitude, coords.longitude);
    }

    let map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function updateMap(lat, lon) {
        map.setView([lat, lon], 15);
        L.marker([lat, lon]).addTo(map);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            displayPosition(position, 'currentPositionData');
        });
    } else {
        document.getElementById('currentPositionData').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }

    if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(function(position) {
            displayPosition(position, 'watchPositionData');
        });
    } else {
        document.getElementById('watchPositionData').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
});
