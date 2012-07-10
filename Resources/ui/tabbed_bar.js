TabbedBar = function(attrs) {
	if(Ti.Platform.osname == 'iphone') return Ti.UI.iOS.createTabbedBar(attrs);
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	
	var buttons = [];
	var registry = {};

	var table = Ti.UI.createTableView(merge(attrs, {width: "100%", height: 'auto', backgroundColor: "black"}));
	var row = Ti.UI.createTableViewRow(merge({touchEnabled: false, width: Ti.UI.FILL},attrs));
	if(!row.backgroundColor) row.backgroundImage = "/images/bar_bg_580.png";
	
	
	var halfOfScreenSize = function() {
	return (screenWidth/2);	
	}
	
	var sumOfWidths = function() {
		var i = 0;
		attrs.labels.map(function(l){ if(parseInt(l.width) && !l.right) i += l.width;});
		return i;
	}
	
	var getFirstLeft = function() {
		return halfOfScreenSize() - (sumOfWidths() / 2);
	}
	
	var getLeftFromRight = function(right, width) {
		var viewSoFar = getFirstLeft() + sumOfWidths();
		var spaceAvailableOnRight = screenWidth - viewSoFar;
		return spaceAvailableOnRight - (right + width);
	}

	var makeRow = function(l) {
		var index = attrs.labels.indexOf(l);
		
		if(l.right) {
			l.left = getLeftFromRight(l.right, l.width);
			l.right = null;
		}

		var button = Ti.UI.createButton(merge(l,{id: index,
																							index: index,
																							zIndex:90,
																							backgroundImage: (l.backgroundImage || '/images/empty_up.png'),
																							backgroundSelectedImage: (l.backgroundSelectedImage ||  '/images/empty_down.png'),
																							color: 'white',
																							height: (l.height || Ti.UI.FILL)
																						}));
		if(!index) {
			button.left = getFirstLeft();
		} else {
			button.left = getFirstLeft() + l.width;
		}
		row.add(button);
		return button;
	}
	
	var setInactive = function(button) {
		button.backgroundImage = registry[button.id].backgroundImage;
	}
	
	var setActive = function(button) {
		button.backgroundImage = registry[button.id].backgroundSelectedImage;
	}

	var toggleButtonState = function(button) {
		buttons.map(setInactive);
		setActive(button);
	}

	var addListeners = function(button) {
		button.addEventListener('click', function(){
			toggleButtonState(button);
		});
	}
	
	var makeActivatable = function(button) {
		registry[button.id] = {};
		registry[button.id].backgroundImage = button.backgroundImage;
		registry[button.id].backgroundSelectedImage = button.backgroundSelectedImage;
		return button;
	}
	
	var init = function(button) {
		addListeners(button);
		makeActivatable(button);
	}

	buttons = attrs.labels.map(makeRow);
	
	table.setData([row]);
	buttons.map(init);
	setActive(buttons[0]);
	
	table.setActiveTab = function(i) {
		toggleButtonState(buttons[i]);
	}
	
	table.oldAddEventListener = table.addEventListener;
	
	table.addEventListener = function(name, fun) {
		table.oldAddEventListener(name, function(e) {
			e.index = e.source.index;
			fun(e);
		});
	}
	
	return table;
}