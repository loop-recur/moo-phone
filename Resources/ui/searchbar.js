SearchBar = function(attrs) {
	if(Ti.Platform.osname == 'mobileweb') {
		var view = UI.createView(merge({
			top:0,
			height: 80,
			width: "100%",
			layout: "horizontal",
			backgroundColor: "black"
		},attrs));

		var text_field = UI.createTextField(merge({
			width: "95%",
			paddingLeft:15,
			paddingBottom:5,
			borderRadius:4,
			left: 10,
			height: "90%"
		},attrs));
		
		text_field.addEventListener('return', function(){
			view.fireEvent('return', {value: text_field.value});
		});
		
		view.add(text_field);
		
		view.unfocus = function() { text_field.blur(); }
		view.cancel = function() {
			text_field.value = "";
			text_field.blur();
		}
		
	} else {
		var view = Ti.UI.createSearchBar(attrs);
		view.unfocus = function() { view.fireEvent('cancel'); }
		view.cancel = function() {
			view.value = "";
			view.blur();
		}
	}

	view.addEventListener('cancel', view.cancel);
		
	return view;	
}
