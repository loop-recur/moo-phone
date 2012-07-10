Windows.MerchantDetail = function(merchant) {
  var self = {

	    win: UI.createWindow({
	      title: merchant.name,
				barColor:'#000',
				backgroundColor: "white"
	    }),

	    detail: UI.createScrollView({
	      showHorizontalScrollIndicator:false,
	      showVerticalScrollIndicator:true,
	      layout: 'vertical',
	      height: Ti.UI.FILL,
	      contentWidth: 'auto',
	      contentHeight: 'auto'
	    }),

	    title: UI.createLabel(merge(Style.title,{
	      height: Ti.UI.SIZE,
	      top: 5,
	      text: merchant.name
	    })),
	    
	    map: Map.createView({
	      left:0,
  			height: 80,
  			width: 80,
  			visible: true,
  			userLocation: false,
  			borderColor: '#222'
      }),
      
      address: UI.createLabel({
        text: merchant.getAddress()
      }),
      
      directions: UI.createLabel({
        text: "directions"
      }),
      
      phone: UI.createLabel({
        text: merchant.phone
      })
		};


  self.detail.add(self.title);
  self.detail.add(self.map);
  self.detail.add(self.address);
  self.detail.add(self.directions);
  self.detail.add(self.phone);
  self.win.add(self.detail);
  
  Map.createAnnotation({
		latitude:merchant.coordinates.latitude,
		longitude:merchant.coordinates.longitude,
		title: merchant.name,
		animate:false
	}, Map.addAnnotation);    
  
	Controllers.MerchantDetail(self, merchant);
	
  return self;
};
