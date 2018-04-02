var map, infoWindow;
var iconBase = '../img/';
var clearCard = ' ';

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 32.985762,
      lng: -96.750099
    },
    zoom: 18,

    disableDefaultUI: true

  });
  var contentString = '<h6 class="is-size-6-mobile">Current Location</h6>';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: iconBase + 'blue.png'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
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
  });
  google.maps.event.addListener(map, "click", function(event) {
    document.getElementById("over_map").innerHTML = clearCard;
});
}

var totalContentString = [];
function gotData(data) {
  var values = data.val();
  var keys = Object.keys(values);
  console.log("Attempted to get all data from Firebase");
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var eventName = values[k].eventName;
    var description = values[k].description;
    var date = values[k].date;
    var location = values[k].location;
    var startTime = values[k].startTime;
    var endTime = values[k].endTime;
    var longitude = values[k].longCoord;
    var latitude = values[k].latCoord;
    var pos = {
      lat: latitude,
      lng: longitude
    };
    console.log(eventName);
    console.log(location);
    var mapLink = 'https://www.google.com/maps/place/'+location;
    var contentString = '<div class="row"><div class="col s12 m6"><div class="card white teal-text"><div class="card-content teal-text"><span class="card-title">'+ eventName + '</span><p>' + description + '</p><p>' + date +  '</p></div><div class="card-action"><a class="button is-primary is-rounded"><span class="icon  has-text-light"><i class="fas fa-comments"></i></span></a><a class="button is-warning is-rounded"><span class="icon has-text-light"><i class="fas fa-map-marker-alt"></i></span></a><a class="button is-danger is-rounded"><span class="icon has-text-light"><i class="fas fa-info-circle"></i></span></a></div></div></div></div></div>';
    totalContentString.push(contentString);
    for(var j = 0; j < totalContentString.length; j++) {
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: iconBase + 'red.png'
      });
      attachSecretMessage(marker, totalContentString[i]);
    }
  }
}
window.onload = gotData;
function errData(err) {
  console.log('Error occured!');
  console.log(err);
}
