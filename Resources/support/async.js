map_p = function(fn, cb, array) {
  var results = []
	, pending = array.length;
	
	var semaphore = function(e, r) {
		results.push(r);
		if (!--pending) cb(e, flatten(results));
	};
	
	array.forEach(function(a) {
		fn(a, semaphore);
	});	
}


reduce_p = function(fn, cb, acc, array) {
	var pending = array.length;
	
	var semaphore = function(e, r) {
		if (!--pending) cb(e, r);
	};
	
	array.forEach(function(x) {
		fn(acc, x, semaphore);
	});	
}
