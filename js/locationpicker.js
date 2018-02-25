var lon, lat;
$('#us2').locationpicker({
  enableAutocomplete: true,
  enableReverseGeocode: true,
  inputBinding: {
    locationNameInput: $('#us2-address')
  },
  onchanged: function(currentLocation) {
    var addressComponents = $(this).locationpicker('map').location.addressComponents;
    lon = currentLocation.longitude;
    lat = currentLocation.latitude;
  }
});


/** Add an event to Firebase database */
function getForm() {
  var strEventName = document.getElementById("eventname");
  var e = document.getElementById("category");
  var strUser = e.options[e.selectedIndex].text;
  var date = document.getElementById("date");
  var strStartTime = document.getElementById("starttime");
  var endtime = document.getElementById("endtime");
  var strDescription = document.getElementById("description");
  var location = document.getElementById("us2-address");
  var chatRoomDetails, chatRoomId;

  var data = JSON.stringify({
    "title": strEventName.value
  })
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      var testObj = this.responseText;
      chatRoomDetails = JSON.parse( testObj );
      chatRoomId = chatRoomDetails.id;
      console.log("The room id is: " + chatRoomId);

      // Write event data to Firebase
      var ref = firebase.database().ref('Event');

      var data = {
        eventName: strEventName.value,
        roomId: chatRoomId,
        category: strUser,
        date: date.value,
        description: strDescription.value,
        startTime: strStartTime.value,
        endTime: endtime.value,
        location: location.value,
        longCoord: lon,
        latCoord: lat
      }

      ref.push(data);
    }
  });
  xhr.open("POST", "https://api.ciscospark.com/v1/rooms");
  xhr.setRequestHeader("Authorization", "Bearer NGFhMDE4MTgtMWI1Ny00NWQ2LTljNjktOWJmZjUxZTA3MzYwNGUyMmViMTItN2Ix");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);

}
