Controllers.MerchantDetail = function(view_proxy, merchant) {
  
        //+ openRoute :: {success: Bool, coords: Coords} -> IO
    var openRoute = when('.success', compose(Routes.openGoogleMapDirections.p(merchant.coordinates), '.coords')),
        
        //+ IO
        openMapsWithDirections = Geolocator.getCurrentCoordinates.p(openRoute),
        
        //+ String -> IO
        callNumber = compose(Ti.Platform.openURL_, "'tel:'+", replace(/\D/g, ""));
         
  view_proxy.phone.addEventListener('click', callNumber.p(merchant.phone));
  view_proxy.directions.addEventListener('click', openMapsWithDirections);
  
};
