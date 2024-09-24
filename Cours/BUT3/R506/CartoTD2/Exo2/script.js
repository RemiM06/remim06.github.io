var map = L.map('map').setView([25.774, -80.19], 4);

// Ajout de la carte Stadia Maps
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
    attribution: '<a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, <a href="https://www.stamen.com/" target="_blank">Stamen Design</a>, <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>, <a href="https://www.openstreetmap.org/copyright/" target="_blank">OpenStreetMap</a>'
}).addTo(map);

var bermudaTriangle = L.polygon([
    [25.774, -80.19],
    [18.466, -66.118],
    [32.321, -64.757]
], {
    color: 'red'
}).addTo(map).bindPopup("Triangle des Bermudes");

// Positions de Marseille et Nice
var marseille = [43.3, 5.4];
var nice = [43.7, 7.26];

// Ajout de marqueurs pour Marseille et Nice
L.marker(marseille).addTo(map).bindPopup("Marseille");
L.marker(nice).addTo(map).bindPopup("Nice");

// Géolocalisation de l'utilisateur
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;
        var accuracy = position.coords.accuracy;

        var userMarker = L.marker([userLat, userLng]).addTo(map).bindPopup("Votre position");
        userMarker.openPopup();
        L.circle([userLat, userLng], { radius: accuracy }).addTo(map);

        L.polyline([marseille, nice], { color: 'blue' }).addTo(map).bindPopup("Segment entre Marseille et Nice");
        L.polyline([marseille, [userLat, userLng]], { color: 'red' }).addTo(map).bindPopup("Segment entre votre position et Marseille");

        var distanceToMarseille = map.distance(marseille, [userLat, userLng]) / 1000;
        
        userMarker.bindPopup("Votre position<br>Distance à Marseille : " + distanceToMarseille.toFixed(2) + " km").openPopup();
    });
} else {
    alert("Géolocalisation non supportée par votre navigateur.");
}
