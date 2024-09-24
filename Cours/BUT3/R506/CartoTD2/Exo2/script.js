var map = L.map('map').setView([25.774, -80.19], 4);

// Carte Stamen Toner
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    attribution: '&copy; Stamen Design'
}).addTo(map);

// Triangle des Bermudes
var bermudaTriangle = L.polygon([
    [25.774, -80.19],
    [18.466, -66.118],
    [32.321, -64.757]
], {
    color: 'red'
}).addTo(map).bindPopup("Triangle des Bermudes");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;
        var accuracy = position.coords.accuracy;

        L.marker([userLat, userLng]).addTo(map).bindPopup("Votre position").openPopup();
        L.circle([userLat, userLng], { radius: accuracy }).addTo(map);
    });
}

// Marqueurs entre Marseille et Nice, calcul et affichage de la distance
var marseille = [43.3, 5.4];
var nice = [43.7, 7.26];
L.polyline([marseille, nice], { color: 'blue' }).addTo(map).bindPopup("Marseille à Nice");

var distance = map.distance(marseille, [userLat, userLng]) / 1000; // en kilomètres
alert("Distance entre Marseille et votre position : " + distance.toFixed(2) + " km");
