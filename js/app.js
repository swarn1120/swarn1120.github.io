var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
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
function addEvent() {
  window.open("../www/event.html", "_self");
}
function chatWindow() {
  var widgetEl = document.getElementById('my-ciscospark-widget');
  // Init a new widget
  ciscospark.widget(widgetEl).spaceWidget({
    accessToken: 'YzMzM2Q2NjgtMDQ2MS00NzgxLTk3ZTktMmE0NDU5MmRiYWM0ZGE1ZjEyZTctZGJj',//jerry's id
    spaceId: 'Y2lzY29zcGFyazovL3VzL1JPT00vNjkwYWM3MjAtMWE1MC0xMWU4LWJjNDQtYWI4NzRmMTM2ZjRl'//red bull groupchat
  });
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
  var iconBase = '../img/';
  var icons = {
         Food: {
           icon: iconBase + 'fpin.png'
         },
         Entertainment: {
           icon: iconBase + 'entpin.png'
         },
         Music: {
           icon: iconBase + 'mpin.png'
         }
  };

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var eventName = values[k].eventName;
    console.log("Event name: " + eventName);
    var chatRoomId = values[k].roomId;
    var category = values[k].category;
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
    var contentString = '<h2 class="title is-4 pink-text">' + eventName + '</h2>' + '<hr color="black">' +
      '<h3 class="subtitle is-5">' + description + '</h3>' + '<hr color="black"><h4 class="center-align subtitle is-6">'
       + startTime + '&nbsp&nbsp|&nbsp&nbsp' + endTime + '<br><br>' + location +
       '</h4><hr class="black">' +'<div class="center-align"><a class="button is-rounded is-medium theme waves-effect waves-light red lighten-1 white-text center-align" onclick="chatWindow()" href="chat.html"><span class="animated inifinte pulse">&nbsp &nbsp &nbsp Group Chat &nbsp &nbsp &nbsp</span></a></div>';
    totalContentString.push(contentString);
    for(var i = 0; i < totalContentString.length; i++) {
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: icons[category].icon
      });
      attachSecretMessage(marker, totalContentString[i]);
    }
    console.log("Event name: " + eventName);
    console.log("Chat Room ID: " + chatRoomId);
    console.log("Description: " + description);
    console.log("Long: " + longitude);
    console.log("lat: " + latitude);
  }
}
window.onload = gotData;

function errData(err) {
  console.log('Error occured!');
  console.log(err);
}

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.open("../www/login.html", "_self");
    window.alert("User successfully signed out!");
  }).catch(function(error) {
    // An error happened.
    window.alert("Sign out didnt work");
  });

}
