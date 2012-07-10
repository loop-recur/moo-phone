Windows.Application = (function() {
	var self = {
				win: UI.createWindow(),
        navigation: UI.createNavigationGroup({window: Windows.MerchantList().win}),
      };

		
	self.open = function() {
		self.win.add(self.navigation);
		self.win.open();
		if(isMobileweb) self.navigation.window.fireEvent('open')
	}

	return self;
})();
