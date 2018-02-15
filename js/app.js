function foodLocation() {
  navigator.geolocation.getCurrentPosition(function(location) {
    var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    var map = L.map('map', {
      zoomControl: false,
    }).setView(latlng, 25);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3dhcm4yMDk5IiwiYSI6ImNqZG1nY2ZqMjBtNmQzM285bTF2Y2RhaHkifQ.r-WQDZYDHBF5ahyCamotiA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets-basic',
      accessToken: 'pk.eyJ1Ijoic3dhcm4yMDk5IiwiYSI6ImNqZG1nY2ZqMjBtNmQzM285bTF2Y2RhaHkifQ.r-WQDZYDHBF5ahyCamotiA'
    }).addTo(map);
    var LeafIcon = L.Icon.extend({
      options: {
        iconSize: [50, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
      }
    });
    var greenIcon = new LeafIcon({
      iconUrl: '../img/marker.png'
    });
    L.marker(latlng, {
      icon: greenIcon
    }).addTo(map).bindPopup("<h1 class='title is-4'>Event Name</h1><hr color='black'><span class=''>Description goes here</span><hr color='black'><a class='button is-rounded is-medium theme waves-effect waves-light red lighten-1 white-text'><span class='animated inifinte pulse'>&nbsp &nbsp &nbsp Group Chat &nbsp &nbsp &nbsp</span></a>").openPopup();
    var popup = L.popup();
  });
};

function addEvent() {
  window.open("../www/event.html", "_self");
}