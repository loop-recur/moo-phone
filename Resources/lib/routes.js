Routes = (function() {

_joinCoords = function(coords) {
	return [coords.latitude, coords.longitude].join(",");
}

openGoogleMapDirections = function(dest_coords, address) {
	Geolocator.getCurrentCoordinates(function(resp) {
		if(resp.success) {
			var saddress = _joinCoords(resp.coords);
			var daddress = dest_coords ? _joinCoords(dest_coords) : address.replace(/\n/g, " ");
			Ti.Platform.openURL("http://maps.google.com/maps?saddr="+saddress+"&daddr="+daddress);
		}
	});
}
	
return {openGoogleMapDirections: openGoogleMapDirections}

})();
