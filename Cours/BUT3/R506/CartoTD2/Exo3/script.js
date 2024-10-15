// Initialisation de la carte centrée sur Nice
var map = L.map('map').setView([43.7, 7.26], 10);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// URL pour récupérer les données GeoJSON avec une requête GET
var geojsonUrl = 'https://opendata.nicecotedazur.org/data/storage/f/2023-03-15T12%3A00%3A00.000Z/communes.geojson';

// Effectuer une requête GET pour récupérer les données GeoJSON
fetch(geojsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Ajout des données GeoJSON à la carte
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // Affiche un popup avec le nom de l'entité, si disponible
                if (feature.properties && feature.properties.nom) {
                    layer.bindPopup("Nom : " + feature.properties.nom);
                } else {
                    layer.bindPopup("Entité sans nom.");
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données GeoJSON:', error);
        alert("Erreur lors du chargement des données GeoJSON. Vérifiez l'URL et l'accessibilité des données.");
    });

// URL pour afficher un trajet entre Marseille et Nice en utilisant MapBox Directions API
var routeUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving/5.4,43.3;7.26,43.7?geometries=geojson&access_token=pk.eyJ1IjoiY3YwNiIsImEiOiJjajg2MmpzYjcwbWdnMzNsc2NzM2l4eW0yIn0.TfDJipR5II7orUZaC848YA';

fetch(routeUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.routes || data.routes.length === 0) {
            throw new Error('Aucune route trouvée.');
        }

        // Extraire les coordonnées de la route
        var route = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

        // Ajouter la route sur la carte
        L.polyline(route, { color: 'blue' }).addTo(map).bindPopup("Trajet de Marseille à Nice");
    })
    .catch(error => {
        console.error('Erreur lors du chargement du trajet:', error);
        alert("Erreur lors du chargement du trajet. Vérifiez l'URL et l'accessibilité des données.");
    });