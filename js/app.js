var map, infoWindow;
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -34.397, lng: 150.644},
         zoom: 18
       });
       var contentString = '<h1 class="title is-4">Event Name</h1>'+ '<hr color="black">'+
       '<span>Description goes here</span><hr color="black">'+
       '<a class="button is-rounded is-medium theme waves-effect waves-light red lighten-1 white-text">'+
       '<span class="animated inifinte pulse">&nbsp &nbsp &nbsp Group Chat &nbsp &nbsp &nbsp</span></a>';

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
             title: 'Uluru (Ayers Rock)'
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

function createAccount() {

  var userEmail = document.getElementById('email').value;
  var userPass = document.getElementById('password').value;

  window.alert("Create user account method ran!");
}

// Gets object data from Firebase
function getFoodData() {
  var ref = firebase.database().ref('Food');
  console.log(ref);
  ref.on('value', gotData, errData);
  window.alert("Retrieving data!");
}
function getEntertainmentData() {
  var ref = firebase.database().ref('Entertainment');
  //console.log(ref);
  ref.on('value', gotData, errData);
  window.alert("Retrieving data!");
}
function getMusicData() {
  var ref = firebase.database().ref('Music');
  //console.log(ref);
  ref.on('value', gotData, errData);
  window.alert("Retrieving data!");
}

function login()
{
  var userEmail = document.getElementById('emailLogin').value;
  var userPass = document.getElementById('passwordLogin').value;
  window.alert("Login method ran!");
  // Access Cisco API to create user

}

var markers = [
    {
        "title": 'Aksa Beach',
        "lat": '19.1759668',
        "lng": '72.79504659999998',
        "description": 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
    },
    {
        "title": 'Juhu Beach',
        "lat": '19.0883595',
        "lng": '72.82652380000002',
        "description": 'Juhu Beach is one of favourite tourist attractions situated in Mumbai.'
    },
    {
        "title": 'Girgaum Beach',
        "lat": '18.9542149',
        "lng": '72.81203529999993',
        "description": 'Girgaum Beach commonly known as just Chaupati is one of the most famous public beaches in Mumbai.'
    },
    {
        "title": 'Jijamata Udyan',
        "lat": '18.979006',
        "lng": '72.83388300000001',
        "description": 'Jijamata Udyan is situated near Byculla station is famous as Mumbai (Bombay) Zoo.'
    },
    {
        "title": 'Sanjay Gandhi National Park',
        "lat": '19.2147067',
        "lng": '72.91062020000004',
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    }
    ];

function gotData(data) {
  var values = data.val();
  var keys = Object.keys(values);
  var infowindow = new google.maps.InfoWindow();
  for (var i = 0; i < markers.length; i++) {
    // var k = keys[i];
    // var eventName = values[k].eventName;
    // var description = values[k].description;
    // var longitude = values[k].longCoord;
    // var latitude = values[k].latCoord;
    // var pos = {
    //   lat: latitude,
    //   lng: longitude
    // };
    // var contentString = '<h1 class="title is-4">'+ eventName +'</h1>'+ '<hr color="black">'+
    // '<span>'+ description +'</span><hr color="black">'+
    // '<a class="button is-rounded is-medium theme waves-effect waves-light red lighten-1 white-text">'+
    // '<span class="animated inifinte pulse">&nbsp &nbsp &nbsp Group Chat &nbsp &nbsp &nbsp</span></a>';

    var data = markers[i];
    var myLatlng = new google.maps.LatLng(data.lat, data.lng);
           var marker = new google.maps.Marker({
               position: myLatlng,
               map: map,
               title: data.title
           });

           //Attach click event to the marker.
           (function (marker, data) {
               google.maps.event.addListener(marker, "click", function (e) {
                   //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                   infowindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                   infowindow.open(map, marker);
               });
           })(marker, data);

    // var marker = new google.maps.Marker({
    //   position: pos,
    //   map: map,
    // });
    // marker.addListener('click', function() {
    //   infowindow.open(map, marker);
    // });
    // console.log("Event name: " + eventName);
    // console.log("Description: " + description);
    // console.log("Long: " + longitude);
    // console.log("lat: " + latitude);
  }
}
window.onload = gotData;

function errData(err) {
  console.log('Error occured!');
  console.log(err);
}

function logout()
{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.open("../www/login.html", "_self");
    window.alert("User successfully signed out!");
   }).catch(function(error) {
     // An error happened.
     window.alert("Sign out didnt work");
   });

}
