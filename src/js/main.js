  let map
  let points = [

    // Home
    {
      'coordinates': { lat: 49.224308, lng: 28.412374 },
      'icon': '../src/img/icons/home.png',
      'info': '<h2>Дім!</h2>',
      'stopover': true
    },

    // School
    {
      'coordinates': { lat: 49.220594, lng: 28.415153 },
      'icon': '../src/img/icons/school.png',
      'info': '<h2>Школа!</h2>',
      'stopover': true
    },

    // ITacademy
    {
      'coordinates': { lat: 49.230645, lng: 28.397181 },
      'icon': '../src/img/icons/soccer.png',
      'info': '<h2>Секція</h2>',
      'stopover': true
    },

    // Supermarket
    {
      'coordinates': { lat: 49.223878, lng: 28.412070 },
      'icon': '../src/img/icons/shopping-cart.png',
      'info': '<h2>Супермаркет</h2>',
      'stopover': true
    },

    // Pharmacy
    {
      'coordinates': { lat: 49.225417, lng: 28.418246 },
      'icon': '../src/img/icons/pharmacy.png',
      'info': '<h2>Аптека!</h2>',
      'stopover': true
    },
  ]

  let waypts = []

  function initMap () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 49.225137, lng: 28.410588 },
      zoom: 15,
      disableDefaultUI: true,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    })

    function addMarker (properties) {
      const marker = new google.maps.Marker({
        position: properties.coordinates,
        icon: properties.icon,
        map: map
      })

      if (properties.info) {
        const InfoWindow = new google.maps.InfoWindow({
          content: properties.info
        })

        marker.addListener('click', () => {
          InfoWindow.open(map, marker)
        })
      }
    }

    for (let i = 0; i < points.length; i++) {
      addMarker({
        coordinates: points[i].coordinates,
        icon: points[i].icon,
        info: points[i].info
      })

      waypts.push({ 
        location: points[i].coordinates,
        stopover: points[i].stopover
      })
    }

    const directionsService = new google.maps.DirectionsService()

    const directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "#2ac467"
      }
    })

    directionsDisplay.setOptions({ suppressMarkers: true })

    directionsDisplay.setMap(map)

    let request = {
      origin: new google.maps.LatLng(points[0].coordinates), // Start
      destination: new google.maps.LatLng(points[(points.length) - 1].coordinates), // Finish
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: google.maps.DirectionsTravelMode.WALKING // Mode
    }

    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response)
      }
    })

    directionsDisplay.setMap(map)
  }
