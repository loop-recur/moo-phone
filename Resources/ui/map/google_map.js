GoogleMap = function() {
var markers = []	
, infowindow = null
, google = null
, the_map = null
, loaded = false;
	
var createView = function(attrs) {
	loaded = false;
	var view = Ti.UI.createWebView(merge({url: "/ui/map/map.html"},attrs));
	view.addEventListener('load', function() {
		loaded = true;
	});
	return view;
}

var createAnnotation = function(attrs, cb) {
	if(!loaded) return setTimeout(function(){ createAnnotation(attrs, cb); }, 250);
	Ti.App.fireEvent("createAnnotation", attrs);
	var trackMarker = function(e) {
		var marker = {index: e.index};
		if(markers.indexOf(marker) < 0) {
			markers.push(marker);
			cb(marker);
		}
		Ti.App.removeEventListener(attrs.title, trackMarker);
	}
	Ti.App.addEventListener(attrs.title, trackMarker);
}

var addAnnotation = function(marker) {
	Ti.App.fireEvent("addAnnotation", {marker_index: marker.index});
}

var removeAllAnnotations = function() {
	Ti.App.fireEvent("removeAllAnnotations");
}

var setLocation = function(location) {
	if(!loaded) return setTimeout(function(){ setLocation(location); }, 250);
	Ti.App.fireEvent("setLocation", location);
}

var selectAnnotation = function(marker, attrs) {
	Ti.App.fireEvent("selectAnnotation", merge({marker_index: marker.index},attrs));
}

return {createAnnotation: createAnnotation
				, addAnnotation: addAnnotation
				, removeAllAnnotations: removeAllAnnotations
				, setLocation: setLocation
				, selectAnnotation: selectAnnotation
				, createView: createView
				, ANNOTATION_RED: "red"
				, STANDARD_TYPE: "standard" }
}
