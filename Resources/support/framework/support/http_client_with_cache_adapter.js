HTTPClientWithCacheAdapater = function() {
	var node_proxy_server_address = "http://localhost:4001";
	
	var Client = function(attributes) {
		this.base_url = attributes.baseUrl;
		this.request_headers = [];
		this.options = {};
		this.xhr = Ti.Network.createHTTPClient();
		this.default_opts = {};
	}
	
	Client.prototype = {
		open : function(method, url) {
			this.options.method = method;
			this.options.url = node_proxy_server_address+'/'+encodeURIComponent(this.base_url + url);
		},
		
		setRequestHeader : function(key, value) {
      return this.request_headers.push([key, value]);
    },

		betterOnload : function(fun) {
			fun(this);
		},
		
		send : function(opts) {
			this.set_options(opts);
			Ti.App.fireEvent("show_activity_indicator");
			this.xhr.timeout = this.options.timeout;
			this.xhr.onload = this.betterOnload.p(this.options.onload);
			this.xhr.onerror = this.options.onerror;
      this.xhr.open(this.options.method, this.options.url);
			return this.xhr.send(this.options.data != null ? {json : this.options.data} : void 0);
		},
		
		set_options : function(opts) {
      var attrname;
      for (attrname in opts) { this.options[attrname] = opts[attrname]; }
		},
		
		_setRequestHeaders : function() {
      var pair, _i, _len, _ref, _results;
      _ref = this.request_headers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        _results.push(this.xhr.setRequestHeader(pair[0], pair[1]));
      }
      return _results;
    }
	}
	
	return Client;
		
};
