NavGroup = function(attrs) {
	if(Ti.Platform.osname == 'iphone') return Titanium.UI.iPhone.createNavigationGroup(attrs);
	
	var win = attrs.window;
	var oldOpen = function() { win.open(); }
	
	win.open = function(other) {
		other ? win.add(other) : oldOpen();
	}
	
	win.window = win;
			
	return win;
}
