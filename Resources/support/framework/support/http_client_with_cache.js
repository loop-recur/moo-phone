HTTPClientWithCache = (function() {
	return (Ti.Platform.osname == 'mobileweb') ? HTTPClientWithCacheAdapater() : RealHTTPClientWithCache();
})();
