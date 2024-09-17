document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour afficher les données de géolocalisation
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
    }

    // Utilisation de getCurrentPosition
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            displayPosition(position, 'currentPositionData');
        });
    } else {
        document.getElementById('currentPositionData').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }

    // Utilisation de watchPosition
    if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(function(position) {
            displayPosition(position, 'watchPositionData');
        });
    } else {
        document.getElementById('watchPositionData').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
});
