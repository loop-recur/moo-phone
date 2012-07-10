Map = (function() {
	return isIPhone ? NativeMap() : GoogleMap();
})();
