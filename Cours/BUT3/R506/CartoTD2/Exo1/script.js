var map = L.map('map').setView(navigator.geolocation);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marqueur pour Nice
    var niceMarker = L.marker([43.7, 7.26]).addTo(map).bindPopup("Nice, Centre Ville");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLat = position.coords.latitude;
            var userLng = position.coords.longitude;

            map.setView([userLat, userLng], 13);

            L.marker([userLat, userLng]).addTo(map).bindPopup("Votre position").openPopup();
        });
    } else {
        alert("Géolocalisation non supportée par votre navigateur.");
    }