function currentLocation(){
navigator.geolocation.getCurrentPosition(function(location) {
  var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    var map = L.map('map', { zoomControl:false }).setView(latlng, 25);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3dhcm4yMDk5IiwiYSI6ImNqZG1nY2ZqMjBtNmQzM285bTF2Y2RhaHkifQ.r-WQDZYDHBF5ahyCamotiA', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets-basic',
        accessToken: 'pk.eyJ1Ijoic3dhcm4yMDk5IiwiYSI6ImNqZG1nY2ZqMjBtNmQzM285bTF2Y2RhaHkifQ.r-WQDZYDHBF5ahyCamotiA'
    }).addTo(map);

    L.marker(latlng).addTo(map)
  .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
  var popup = L.popup();

});
};
