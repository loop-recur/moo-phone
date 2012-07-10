isIPhone = true;
isAndroid = false;
isMobileweb = false;

require('../../initializers/init');
init('../', true);

require('../factory_definitions');
Factory = function(name, props) {
	props = (props || {});
	var obj = FactoryDefinitions[name](props);
	obj.id = Factory.id+=1;
	return obj;
}
Factory.id = 0;

extractText = compose(join(','), map('.text'), '.children');

expectThreaded = function(expectation, wait_time) {
	wait_time = (wait_time || 50);
	
	var fullExpectation = function() {
		expectation();
		asyncSpecDone();
	}

	setTimeout(fullExpectation, wait_time);
	asyncSpecWait();
}

sleep = function(millis) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
}