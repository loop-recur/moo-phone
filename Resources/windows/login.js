Windows.Login = function(open, close) {
	var self = {
				win: UI.createWindow({
					title: "Login",
					backgroundColor: "blue"
				}),

				credential_view: UI.createView({
					top: 10,
					width: 300,
					height: 130
				}),
				
        submit_button: UI.createButton({
					font: {fontSize:15, fontWeight:'bold'},
					title: "Submit",
					color: "white",
					top: 150,
					height: 38,
					width: 300
        }),

				username: UI.createTextField({
					height: 40,
					bottom: 60,
					width: 250,
	        font: {fontSize: 15},
	        hintText: 'enter username',
	        autocorrect: false,
	        keyboardType: Ti.UI.KEYBOARD_EMAIL,
	        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	        returnKeyType: Ti.UI.RETURNKEY_GO
				}),
			 
				password: UI.createTextField({
					height: 40,
					bottom: 10,
					width: 250,
	        font: {fontSize: 15},
	        hintText: 'enter password',
	        autocorrect: false,
	        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	        returnKeyType: Titanium.UI.RETURNKEY_SEND,
	        passwordMask: true
				})
			};
	
	self.credential_view.add(self.username);
	self.credential_view.add(self.password);
	self.win.add(self.credential_view);
	self.win.add(self.submit_button);
	
	Controllers.Login(self, close);

  open(self.win);
	return self;
};
