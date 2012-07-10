Toolbar = function(attrs) {
	if(Ti.Platform.osname == 'iphone') return Ti.UI.iOS.createToolbar(attrs);
	
	var view = UI.createView(merge({
		height: 200,
		layout: "horizontal"
	},attrs));
	
	var append = function(i) { view.add(i); }
	
	attrs.items.map(append);
	
	return view;
}
