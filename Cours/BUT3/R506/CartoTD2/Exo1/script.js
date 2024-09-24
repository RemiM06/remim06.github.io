var map = L.map('map').setView([43.7, 7.26], 13); // Vue sur Nice par défaut

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marqueur pour Nice
    var niceMarker = L.marker([43.7, 7.26]).addTo(map).bindPopup("Nice, Centre Ville");

    // Récupérer la position de l'utilisateur
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLat = position.coords.latitude;
            var userLng = position.coords.longitude;

            // Centrer la carte sur la position de l'utilisateur
            map.setView([userLat, userLng], 13);

            // Ajouter un marqueur sur la position de l'utilisateur
            L.marker([userLat, userLng]).addTo(map).bindPopup("Votre position").openPopup();
        });
    } else {
        alert("Géolocalisation non supportée par votre navigateur.");
    }