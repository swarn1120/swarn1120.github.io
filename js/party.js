// Gets object data from Firebase
function getData() {
  var ref = firebase.database().ref('Event');
  console.log(ref);
  ref.on('value', gotData, errData);
}

function gotData(data) {
    var d = new Date();
    var n = d.toDateString();
    document.getElementById("demo").innerHTML = n;

  var values = data.val();
  var keys = Object.keys(values);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var eventName = values[k].eventName;
    var category = values[k].category;
    var host = values[k].host;
    var info = values[k].info;
    var featuredSelect = values[k].featured;
    var description = values[k].description;
    var date = values[k].date;
    var location = values[k].location;
    var startTime = values[k].startTime;
    var endTime = values[k].endTime;
    var longitude = values[k].longCoord;
    var latitude = values[k].latCoord;
    var image = values[k].image;
    var pos = {
      lat: latitude,
      lng: longitude
    };

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var m = month[d.getMonth()];
    var y = d.getFullYear();
    var day = d.getDate();

    var checkDate = day + ' ' + m + ', ' + y;
    var navLink = 'https://www.google.com/maps/place/' + location;
    console.log(navLink);

    if (category == "Parties") {
      var featuredCard = '<div class="animated zoomIn"><div class="card" id="rcorners2"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + image + '" id="img"><div class="top-left"><h6>' + category + '</h6></div><div class="top-left2"><h5>' + eventName + '</h5></div><div class="bottom-left">'+date +'</div><div class="bottom-right">'+startTime+' | '+endTime+'</div></div><div class="card-reveal"><span class="card-title grey-text text-darken-4"><b>'+eventName+'</b><i class="material-icons right activator">close</i></span><br><p>' + description + '</p><br><div class="row center-align"><div class="col s6"><a class="button is-medium blue-text grey lighten-3" id="rcorners3" href="'+info+'" target="_blank">More Info</a></div><div class="col s6 "><a class="button is-medium white-text blue" id="rcorners3"  href="'+navLink+'" target="_blank">Directions</a></div></div><br></div></div></div>';
      console.log(featuredCard);
      var card = document.getElementById ("cards");
      card.innerHTML += featuredCard;
    }
  }
}


function errData(err) {
  console.log('Error occured!');
  console.log(err);
}
