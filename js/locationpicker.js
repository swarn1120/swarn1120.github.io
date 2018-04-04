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
  ``

/** Add an event to Firebase database */
function getForm() {
  var strEventName = document.getElementById("eventname");
  var e = document.getElementById("category");
  var strUser = e.options[e.selectedIndex].text;
  var org = document.getElementById("host");
  var link = document.getElementById("info");
  var date = document.getElementById("date");
  var strStartTime = document.getElementById("starttime");
  var endtime = document.getElementById("endtime");
  var strDescription = document.getElementById("description");
  var location = document.getElementById("us2-address");

  var data = JSON.stringify({
    "title": strEventName.value
  })


      // Write event data to Firebase
      var ref = firebase.database().ref('Event');

      var data = {
        eventName: strEventName.value,
        category: strUser,
        host: org.value,
        info: link.value,
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
