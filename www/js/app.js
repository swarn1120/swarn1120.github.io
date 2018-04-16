var map, infoWindow;
var clearCard = '<div class="animated fadeOut"></div> ';

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 32.985762,
      lng: -96.750099
    },
    disableDefaultUI: true,
    zoom: 18,
    styles: [{
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }
    ]
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: '../img/blue.png'
      });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
// Gets object data from Firebase
function getData() {
  var ref = firebase.database().ref('Event');
  console.log(ref);
  ref.on('value', gotData, errData);
}

function attachSecretMessage(marker, totalContentString) {
  marker.addListener('click', function() {
    document.getElementById("over_map").innerHTML = totalContentString;
    map.setZoom(17);
    map.setCenter(marker.getPosition());
  });
  google.maps.event.addListener(map, "click", function(event) {
    document.getElementById("over_map").innerHTML = clearCard;
  });
}

var totalContentString = [];

function gotData(data) {
  var values = data.val();
  var keys = Object.keys(values);
  var iconBase = '../img/';
  var icons = {
    Free: {
      icon: iconBase + 'yellow.png'
    },
    Entertainment: {
      icon: iconBase + 'red.png'
    },
    Parties: {
      icon: iconBase + 'purple.png'
    },
    Music: {
      icon: iconBase + 'green.png'
    },
    Sports: {
      icon: iconBase + 'orange.png'
    },
    Pregame: {
      icon: iconBase + 'black.png'
    }
  };
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var eventName = values[k].eventName;
    var category = values[k].category;
    var host = values[k].host;
    var info = values[k].info;
    var featuredSelect = values[k].featured;
    var description = values[k].description;
    var date = values[k].date;
    var location = values[k].location;
    var startTime = values[k].startTime;
    var endTime = values[k].endTime;
    var longitude = values[k].longCoord;
    var latitude = values[k].latCoord;
    var image = values[k].image;
    var pos = {
      lat: latitude,
      lng: longitude
    };
    var navLink = 'https://www.google.com/maps/place/' + location;

    var contentString = '<div class="animated zoomIn"><div class="card" id="rcorners2"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + image + '" id="img"><div class="top-left"><h6>' + category + '</h6></div><div class="top-left2"><h5>' + eventName + '</h5></div><div class="bottom-left">'+date +'</div><div class="bottom-right">'+startTime+' | '+endTime+'</div></div><div class="card-reveal"><span class="card-title grey-text text-darken-4"><b>'+eventName+'</b><i class="material-icons right activator">close</i></span><br><p>' + description + '</p><br><div class="row center-align"><div class="col s6 "><a class="button is-medium blue-text grey lighten-3" id="rcorners3"  href="'+info+'" target="_blank">More Info</a></div><div class="col s6"><a class="button is-medium white-text blue" id="rcorners3" href="'+navLink+'" target="_blank">Directions</a></div></div><br></div></div></div>';
    totalContentString.push(contentString);

    for (var j = 0; j < totalContentString.length; j++) {
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: icons[category].icon,
      });
      attachSecretMessage(marker, totalContentString[i]);
    }
    //featuredPopulate(featuredSelect, image, eventName,description,category);
  }
}

function locatePopulate() {
  document.getElementById('btn').addEventListener('click', function() {
    location.reload();
  });
}
function featuredPopulate(featuredSelect, image, eventName,description,category) {
  if (featuredSelect == "Yes") {
    var featuredCard = '<div class="card" id="rcorners2"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + image + '" id="img"><div class="top-left"><h6>' + category + '</h6></div><div class="top-left2"><h5>' + eventName + '</h5></div><div class="bottom-right"><a class="button is-primary is-outlined">Interested</a></div></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + eventName + '<i class="material-icons right">close</i></span><p>' + description + '</p></div></div>';
    document.getElementById("featuredCard").innerHTML = featuredCard;
    console.log(featuredCard.value);
  }
}

function errData(err) {
  console.log('Error occured!');
  console.log(err);
}
