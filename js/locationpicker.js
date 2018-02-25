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


  // Write event data to Firebase
  var ref = firebase.database().ref('Event');

  var data = {
    eventName: strEventName.value,
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

  // //I'll comment this stuff so yall can read through it easier
  // console.log(strEventName.value); //event name
  // console.log(strUser); //category
  // console.log(date.value); //date
  // console.log(strStartTime.value); //start time
  // console.log(endtime.value); //end time
  // console.log(strDescription.value); //description
  // console.log()
}
