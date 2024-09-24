// Initialisation de la carte
var map = L.map('map').setView([43.7, 7.26], 10); // Vue centrée sur Nice

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap contributors'
}).addTo(map);

// Charger les données GeoJSON (exemple depuis OpenData Nice Côte d’Azur)
var geojsonUrl = 'URL_DES_DONNÉES_GEOJSON'; // Remplacer par une URL valide depuis les sources indiquées

// Récupérer et afficher les données GeoJSON
fetch(geojsonUrl)
    .then(response => response.json())
    .then(data => {
        // Ajouter les données GeoJSON à la carte
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // Afficher les propriétés de chaque entité dans un popup
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup("Nom : " + feature.properties.name);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données GeoJSON:', error);
    });

// BONUS : Afficher un trajet/route avec MapBox Directions API
var routeUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/5.4,43.3;7.26,43.7?geometries=geojson&access_token=pk.eyJ1IjoiY3YwNiIsImEiOiJjajg2MmpzYjcwbWdnMzNsc2NzM2l4eW0yIn0.TfDJipR5II7orUZaC848YA';

// Récupérer le trajet depuis l'API de MapBox
fetch(routeUrl)
    .then(response => response.json())
    .then(data => {
        // Extraire les coordonnées de la route
        var route = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        
        // Ajouter la route sur la carte
        L.polyline(route, { color: 'blue' }).addTo(map).bindPopup("Trajet de Marseille à Nice");
    })
    .catch(error => {
        console.error('Erreur lors du chargement du trajet:', error);
    });