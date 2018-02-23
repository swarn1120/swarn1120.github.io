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
  window.alert("Create account method ran");

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}
