var provider = new firebase.auth.GoogleAuthProvider();
var google = new firebase.auth(google)

function googleSignin() {
   firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      localStorage.setItem("player" , user);
      console.log("Success")
      console.log(result)
      if(token){
        window.location = "/www/map.html";
      }

   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
   });
}
function returnUser(){
  var playerReady = localStorage.getItem('player');
  console.log(playerReady.value);
  document.getElementById('player').innerHTML = playerReady;
}
