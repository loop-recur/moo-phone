Geolocator = (function() {		
	var isAndroid = Ti.Platform.osname == 'android';
	
	Ti.Geolocation.preferredProvider = "gps";
	if(!isAndroid) Ti.Geolocation.purpose = "Find location to nearby stores";

servicesIsEnabled = function() {
	if(!Ti.Geolocation.locationServicesEnabled) {
		return false;
	} else {
		if (!isAndroid) {
			var authorization = Ti.Geolocation.locationServicesAuthorization;
			if (authorization == Ti.Geolocation.AUTHORIZATION_DENIED) {
				return false;
			}
		}
	}
	return true;
}

// @typedef Coords = {latitude: Float, longitude: Float}
//+ getCurrentCoordinates :: ({success: Bool, coords: Coords} -> _) -> {success: Bool, coords: Coords}
getCurrentCoordinates = function(callback) {
	var lsa = Ti.Geolocation.locationServicesAuthorization;
	
	if(!servicesIsEnabled()) {
		alert('This feature requires Location Services, which have been disabled on your device. You can enable Location Services in the Settings app.');
		callback({success:false});
	} else if (!isAndroid && lsa === Ti.Geolocation.AUTHORIZATION_DENIED) {
      alert('This feature requires Location Services, which you have disabled for this app. You can enable Location Services in the Settings app.');
      callback({success:false});
  } else if (!isAndroid && lsa === Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
      alert('This feature requires Location Services. Your system has disallowed this app from using Location Services.');
      callback({success:false});
  }
	
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
	Ti.Geolocation.distanceFilter = 10;
	
	Ti.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) alert('We could not determine your current location. Please try again later.');
		callback(e);
	});
}
	
	return {getCurrentCoordinates : getCurrentCoordinates, servicesIsEnabled : servicesIsEnabled}
})();
