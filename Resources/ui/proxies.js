Ti.Platform.openURL_ = function(s){ Ti.Platform.openURL(s); }

UI.createActivityIndicator = function(props){
	var ind = Ti.UI.createActivityIndicator(props);
	if(isIPhone) {
		makeFirstClassAndComposable(ind, 'show');
		makeFirstClassAndComposable(ind, 'hide');
	} else {
		ind.show_ = id;
		ind.hide_ = id;
	}
	return ind;
}

UI.createButton = function(props) {
  return Ti.UI.createButton(Scaler(props));
};

UI.createButtonBar = function(props) {
	return Ti.UI.createButtonBar(Scaler(props));
};

UI.createImageView = function(props) {
	return Ti.UI.createImageView(Scaler(props));
}

UI.createLabel = function(props) {
	return Ti.UI.createLabel(Scaler(props));
}

UI.createMapView = function(props) {
	var mv = Ti.Map.createView(Scaler(props));
	mv.annotate = function(x) { mv.addAnnotation(x); return x; }
	mv.assignRegion = function(x) {
		mv.setLocation(x); return x;
	}
	return mv;
}

UI.createNavigationGroup = function(props) {
	var v = NavGroup(Scaler(props));
	return makeFirstClassAndComposable(v, 'open', 'close');
}

UI.createScrollView = function(props) {
	return Ti.UI.createScrollView(Scaler(props));
}

UI.createSearchBar = function(props) {
	return SearchBar(Scaler(props));
}

UI.createTab = function(props) {
	var tab = Ti.UI.createTab(props); // no need for scaler here
	return makeFirstClassAndComposable(tab, 'open');
}

UI.createTabbedBar = function(props) {
	props.labels = map(Scaler, props.labels);
	return TabbedBar(Scaler(props));
}

UI.createTableView = function(props) {
	var view = Ti.UI.createTableView(Scaler(props));
	view.set = function(d){
		view.setData(d);
		return d;
	}
  makeFirstClassAndComposable(view, 'appendRow', 'add');
	return view;
}

UI.createTableViewRow = function(props) {
  var row = Ti.UI.createTableViewRow(Scaler(props));
  return makeFirstClassAndComposable(row, 'add');
}

UI.createTextField = function(props) {
	return Ti.UI.createTextField(Scaler(props));
}

UI.createToolbar = function(props) {
	return Toolbar(Scaler(props));
}

UI.createView = function(props) {	
	return Ti.UI.createView(Scaler(props));
}

UI.createWebView = function(props) {	
	return Ti.UI.createWebView(Scaler(props));
}

UI.createWindow = function(props) {
	var win = Ti.UI.createWindow(Scaler(props));
	return makeFirstClassAndComposable(win, 'open', 'close');
}

var overWriteFun = function(obj, name) {
	var old = function(x){ obj[name](x); }
	obj[name+'_'] = function(x) {
		old(x);
		return x
	}
	return obj;
}

function makeFirstClassAndComposable(/* obj, names */) {
	var args = argsToList(arguments), obj = first(args), names = rest(args);
	reduce(overWriteFun, obj, names);
	return obj;
}
