'use strict';
var map;
function initMap () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:34.87, lng: -111.79},
        zoom: 6
    });
    var marker = new google.maps.Marker({
        position: {lat:34.87, lng: -111.79},
        map: map
    });
}