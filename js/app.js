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


  // firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });
  // window.alert("Create account method ran");

}
function retrieveData() {
  var ref = firebase.database().ref('Music');
  console.log(ref);
  ref.on('value', gotData, errData);
  window.alert("Retrieving data!");
}

function login()
{
  var userEmail = document.getElementById('emailLogin').value;
  var userPass = document.getElementById('passwordLogin').value;
  window.alert("login method ran");

  // firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  //   var errorCode = error.code;
  //
  //   var errorMessage = error.message;
  //   window.alert("Error : " + errorMessage);
  // });

  // Access Cisco API to create user


}

function gotData(data) {
  var values = data.val();
  var keys = Object.keys(values);
  console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var eventName = values[k].eventName;
    var description = values[k].description;
    console.log(eventName, description);
  }
}

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
