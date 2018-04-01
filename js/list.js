// Gets object data from Firebase
function getData() {
  var ref = firebase.database().ref('Event');
  console.log(ref);
  ref.on('value', gotData, errData);
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
    var card = '<div class="card"><div class="card-content"><div class="media-content"><p class="title is-4">'+ eventName + '</p></div></div><div class="content">'+ description +'</div></div></div>';
    totalContentString.push(card);
    for (var j = 0; j < totalContentString.length; j++) {
      var cardFilled = totalContentString[j];
    }
  }
}
window.onload = gotData;






















function errData(err) {
  console.log('Error occured!');
  console.log(err);
}
