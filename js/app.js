function currentLocation(){
navigator.geolocation.getCurrentPosition(function(location) {
  var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
  L.mapbox.accessToken = 'pk.eyJ1IjoiY3RpcHBldHQiLCJhIjoiS3lpTnN4MCJ9.YG_uH8r7IgwgcSWEPYROMA';
  var map = L.mapbox.map('map', null, {
      zoomControl: false,
      attributionControl: true
    })
    .setView(latlng, 18);
  L.marker([location.coords.latitude, location.coords.longitude]).addTo(map)
    .bindPopup('Shit will go here')
  var layers = {
    Streets: L.mapbox.tileLayer('mapbox.streets'),
  };
  layers.Streets.addTo(map);

});
};
