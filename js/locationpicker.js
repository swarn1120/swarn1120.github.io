function initMap() {
  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  var place = autocomplete.getPlace();
  // get lat
  var lat = place.geometry.location.lat();
  // get lng
  var lng = place.geometry.location.lng();
}
function getForm(place) {
  var strEventName = document.getElementById("eventname");
  var date = document.getElementById("date");
  var strStartTime = document.getElementById("starttime");
  var endtime = document.getElementById("endtime");
  var strDescription = document.getElementById("description");
  var strCategory;
  if (document.getElementById('test1').checked) {
    strCategory = document.getElementById('test1').value;
  } else if (document.getElementById('test2').checked) {
    strCategory = document.getElementById('test2').value;
  } else if (document.getElementById('test3').checked) {
    strCategory = document.getElementById('test3').value;
  }
  console.log(place);
  console.log(strEventName.value);
  console.log(date.value);
  console.log(strStartTime.value);
  console.log(endtime.value);
  console.log(strDescription.value);
  console.log(strCategory.value);
}
