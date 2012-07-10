Scaler = (function() {
	var getHeight = function(height) {
		return height / 480;
	}
	
	var getWidth = function(width) {
		return width / 320;
	}

	var scale_height_factor = getHeight(Ti.Platform.displayCaps.platformHeight);
	var scale_width_factor = getWidth(Ti.Platform.displayCaps.platformWidth);
	
	var scaleWidth = function(n) {
		if(typeof n == "string") return n;
		return n * scale_width_factor;
	}
	
	var scaleHeight = function(n) {
		if(typeof n == "string") return n;
		return n * scale_height_factor;
	}
	
	var scaleables = { heights: ['contentHeight', 'height', 'top', 'bottom'], widths: ['contentWidth', 'width', 'left', 'fontSize', 'right'] }
	
	var scaleProps = function(props) {
		if(props.has_scaled) return props;
		props.has_scaled = true;

		for(p in props) {
			try{
				if(scaleables.widths.indexOf(p) >= 0) props[p] = scaleWidth(props[p]);
				if(scaleables.heights.indexOf(p) >= 0) props[p] = scaleHeight(props[p]);
				if(isObj(props[p])) props[p] = scaleProps(props[p]);
			} catch(e) { log("error scaling"); log(e);}
		}
		return props;
	}
	

	var scale = function(props) {
		if(!props || props.skip_scale) return props;
		return scaleProps(props);
	}
	
	return scale_width_factor > 1 ? scale : function(id){ return id };
})();
