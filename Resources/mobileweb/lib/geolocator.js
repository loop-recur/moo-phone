Geolocator = (function() {
	
var geo_options = {
	timeout: (5 * 1000),
	maximumAge: (1000 * 60 * 15),
	enableHighAccuracy: true
}

var _getLatLong = function(success, error) {
	var _successFun = function(position) {
		if(position) success({success: true, coords: position.coords});
	}
	navigator.geolocation.getCurrentPosition(_successFun, error, geo_options);
}

var servicesIsEnabled = function() {
	return navigator.geolocation;
}

var getCurrentCoordinates = function(success) {
	success({success: true, coords: {latitude:45.5, longitude:10.5}});
}

return {getCurrentCoordinates : getCurrentCoordinates, servicesIsEnabled: servicesIsEnabled}

})();
