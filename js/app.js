var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 32.985762,
      lng: -96.750099
    },
    zoom: 18,
    disableDefaultUI: true

  });
  var contentString = '<h1 class="title is-4 pink-text">Your Current Location</h1>' + '<hr color="black">';

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
  var infowindow = new google.maps.InfoWindow({
    content: totalContentString
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
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
    var contentString = '<h6 class="is-size-5-mobile has-text-centered has-text-weight-bold has-text-primary">' + eventName + '</h6><br>'+
      '<h6 class="is-size-7-mobile has-text-centered has-text-weight-light">' + description + '</h6>' + '<h6 class="is-size-7-mobile has-text-centered has-text-weight-light is-italic">'
       + startTime + ' -  ' + endTime +
       '</h6><br>' +'<a class="button is-rounded is-link"><span class="">Pool</span></a>'+'&nbsp <a class="button is-rounded is-success"><span class="">Map</span></a>';
    totalContentString.push(contentString);
    for(var j = 0; j < totalContentString.length; j++) {
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
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
