// specific implementation wrapper of http client for our app.
Api = (function() {
	
	var _callApi = function(method, path, callbacks, params, options) {
		params = params || {};
		options = options || {};
		options.success = function(r) { callbacks.success(r); };
		options.error = function(r) { callbacks.error(r); };

		Api.http_client[method](path, params, options);
	};
	
	var _default_error = function() {
		alert("We couldn't establish an internet connection");
	}
	
	var get = function(path, callbacks, params, options) {
		params = params || {};
		options = options || {};
		
		var oldSuccess = callbacks.success || callbacks;
		var oldError = callbacks.error || _default_error;
				
		var error = function(r) {
			if(!r || !r.responseText) return;
			if(r) oldError(r.responseText);
		};
		
		var success = function(r) {
			if(!r || !r.responseText) return;
			var json = JSON.parse(r.responseText);
			oldSuccess(json);
		};
		
		_callApi('get', path, {success: success, error: error}, params, options);
	};

  var stubCall = function(func) {
		var old_client = Api.http_client;
		Api.http_client = HttpClient("http://localhost:3000");
		func.apply(func, arguments);
		Api.http_client = old_client;
  };

	return {get: get, stubCall: stubCall}	
})();
