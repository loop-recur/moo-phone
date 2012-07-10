NativeMap = function() {
var view = null;

var removeAllAnnotations = function() {
	view.removeAllAnnotations();
}

var createView = function(attrs) {
	view = Ti.Map.createView(attrs);
	return view;
}

var createAnnotation = function(attrs, cb) {
	var annotation = Ti.Map.createAnnotation(attrs);
	cb(annotation);
	return annotation;
}

var addAnnotation = function(annotation) {
	view.addAnnotation(annotation);
}

var selectAnnotation = function(annotation) {
	view.selectAnnotation(annotation);
}

var setLocation = function(attrs) {
	view.setLocation(attrs);
}

return {createAnnotation: createAnnotation
				, addAnnotation: addAnnotation
				, removeAllAnnotations: removeAllAnnotations
				, setLocation: setLocation
				, selectAnnotation: selectAnnotation
				, createView: createView
				, ANNOTATION_RED: Ti.Map.ANNOTATION_RED
				, STANDARD_TYPE: Ti.Map.STANDARD_TYPE }
}
