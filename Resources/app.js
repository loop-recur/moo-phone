isAndroid = Ti.Platform.osname == 'android';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Ti.include("initializers/init.js");
init();

Ti.UI.setBackgroundColor("#fff");

Api.http_client = HttpClient("http://localhost:3000");

Windows.Authentication();
