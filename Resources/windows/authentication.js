Windows.Authentication = function() {
	var self = {
	      base_win: UI.createWindow({
	      }),
	      
				win : UI.createWindow({
					backgroundColor: "blue"
				}),

				login_view: UI.createView({
					bottom: 0,
					left: 0,
					width: 160,
					height: 82
				}),

				sign_up_view: UI.createView({
					bottom: 0,
					right: 0,
					width: 160,
					height: 82
				}),

				login_label: UI.createLabel({
					color: "white",
					text:'Login',
					width:Ti.UI.SIZE,
					height:Ti.UI.SIZE
				}),

				sign_up_label: UI.createLabel({
					color: "white",
					text:'Sign up!',
					width:Ti.UI.SIZE,
					height:Ti.UI.SIZE
				})
      };
	
	self.navigation = UI.createNavigationGroup({
	  window: self.win
	});
	
	self.base_win.add(self.navigation);
	self.login_view.add(self.login_label);
	self.sign_up_view.add(self.sign_up_label);
	self.win.add(self.login_view);
	self.win.add(self.sign_up_view);
	
	Controllers.Authentication(self);
	
	self.base_win.open();
	return self;
};
