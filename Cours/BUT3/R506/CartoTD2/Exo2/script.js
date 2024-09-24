// Initialisation de la carte avec une vue sur le Triangle des Bermudes
var map = L.map('map').setView([25.774, -80.19], 4);

// Ajout de la carte Stamen Toner
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    attribution: '&copy; Stamen Design'
}).addTo(map);

// Définition du Triangle des Bermudes
var bermudaTriangle = L.polygon([
    [25.774, -80.19],
    [18.466, -66.118],
    [32.321, -64.757]
], {
    color: 'red'
}).addTo(map).bindPopup("Triangle des Bermudes");

// Géolocalisation de l'utilisateur
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;
        var accuracy = position.coords.accuracy;

        // Ajout d'un marqueur pour la position de l'utilisateur et d'un cercle de précision
        L.marker([userLat, userLng]).addTo(map).bindPopup("Votre position").openPopup();
        L.circle([userLat, userLng], { radius: accuracy }).addTo(map);

        // Marqueurs entre Marseille et Nice, calcul et affichage de la distance
        var marseille = [43.3, 5.4];
        var nice = [43.7, 7.26];
        L.polyline([marseille, nice], { color: 'blue' }).addTo(map).bindPopup("Marseille à Nice");

        // Calcul de la distance entre Marseille et la position de l'utilisateur
        var distance = map.distance(marseille, [userLat, userLng]) / 1000; // en kilomètres
        alert("Distance entre Marseille et votre position : " + distance.toFixed(2) + " km");
    });
} else {
    alert("Géolocalisation non supportée par votre navigateur.");
}
