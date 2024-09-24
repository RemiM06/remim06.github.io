// Initialisation de la carte
var map = L.map('map').setView([43.7, 7.26], 10); // Vue centrée sur Nice

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap contributors'
}).addTo(map);

var geojsonUrl = 'https://opendata.nicecotedazur.org/data/storage/f/2024-07-01T09%3A00%3A15.462Z/routes-metropolitaines.geojson'; 

fetch(geojsonUrl)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup("Nom : " + feature.properties.name);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données GeoJSON:', error);
    });

var routeUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/5.4,43.3;7.26,43.7?geometries=geojson&access_token=pk.eyJ1IjoiY3YwNiIsImEiOiJjajg2MmpzYjcwbWdnMzNsc2NzM2l4eW0yIn0.TfDJipR5II7orUZaC848YA';

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