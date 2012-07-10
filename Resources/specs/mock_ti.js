stub = function(obj){
	if(obj) {
		return function(){ return obj };
	} else {
		return function(){};
	}
};

var Properties = (function() {
	var vals = {};
	
	return {
		getInt : function(n) {
			return vals[n];
		},
		setInt : function(n,v) {
			vals[n] = v;
		}
	};
})();

var EventRegistry = (function() {
	
	var register = function(obj, name, f) {
		obj[name+'event'] = f;
	}
	
	var fire = function(obj, name, e) {
		try { obj[name+'event'].apply(obj, flatten([(e || {})])); } catch(e){ }
	}
	
	return {register: register, fire: fire}
})();

var baseStubPrototype = function() {
	return {
		children: [],
		addEventListener: function(name, f){
			EventRegistry.register(this, name, f);
		},
		add: function(v){
			this.children.push(v);
		},
		remove: function(v) {
			this.children.splice(this.children.indexOf(v), 1);
		},
		fireEvent: function(name, e) {
			EventRegistry.fire(this, name, e)
		}
	};
}

var Window = {
	open: function() {
		this.fireEvent('open')
	},
	close: function() {
	  this.fireEvent('close')
	}
}

var Map = {
  addAnnotation: function(v) {
    this.add(v);
    this.annotations = (this.annotations || []);
    this.annotations.push(v);
  }
}

var Image = {
	start: jasmine.createSpy('start'),
	stop: jasmine.createSpy('stop'),
	animate: function(obj, cb) {
		if(obj.left < 0) log("[WARN] Hey man, this probably won't work on android");
	}
}

var Table = {
	setData: function(rs){
		self = this;
		rs.map(function(r){ self.add(r); });
		this.data = rs;
	}
}


var BaseViewStub = function(kind) {
	return function(props) {
		var view = baseStubPrototype();
		for(p in props) view[p] = props[p];
		if(kind) for(m in kind) view[m] = kind[m];
		return view;
	}
}

var Geolocation = function() {
  return {
    locationServicesAuthorization: 0,
    AUTHORIZATION_DENIED: 1,
    AUTHORIZATION_RESTRICTED: 2,
    locationServicesEnabled: true,
    getCurrentPosition: function(cb){ cb({success: true, coords: {latitude: 123, longitude: 345}}) }
  }
}

module.exports.mock = function() {
	Titanium = {
		App: {
			Properties: Properties
		},
		Database: {open: stub({execute: stub, close: stub})},
		Geolocation: Geolocation(),
		Map: {createView: BaseViewStub(Map), createAnnotation: BaseViewStub()},
		Platform: {osname: 'iphone', displayCaps: {platformHeight: 320, platformWidth: 480}, openURL: stub},
		include: function(path) { require('../'+path.replace(/\.js$/, "")); },
		API: {info: function(i){ console.log(i); }},
		Media: {createSound:stub({play: stub})},
		UI: {
			create2DMatrix: stub({rotate: stub}),
			createWindow: BaseViewStub(Window),
			createView: BaseViewStub(),
			createButton: BaseViewStub(),
			createImageView: BaseViewStub(Image),
			createLabel: BaseViewStub(),
			createProgressBar: stub({show: stub, value:0}),
			createTextField: BaseViewStub(),
			createScrollView: BaseViewStub(),
			createSlider: stub,
			createTableView: BaseViewStub(Table),
			createTableViewRow: BaseViewStub(),
			iPhone: {TableViewCellSelectionStyle : {}, createNavigationGroup: BaseViewStub(Window)}
		}
	};
	
	Ti = Titanium;
}
