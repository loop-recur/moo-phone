Repo = (function() {
  var Merchant = {
				// all :: ([Merchant] -> b) -> Maybe({school_id: Int} -> void
        all: function(cb, params){
					params = (params || {});
          Api.get('/merchants', compose(cb, map(Models.Merchant)), params);
        }
      };
      
	
	return {Merchant: Merchant};
})();

