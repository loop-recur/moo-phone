Views.MerchantRow = function(merchant) {
  var self = {
    row: UI.createTableViewRow({merchant: merchant, layout: "vertical", height: Ti.UI.SIZE}),
    
    name_label: UI.createLabel({
			text: merchant.name,
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
      left: 10,
      top: 10
    }),
    
    result_image: UI.createImageView({
      image: merchant.logo,
      height: 25,
      width: 25,
      left: 10,
      top: 5
    }),
    
    available: UI.createLabel(merge(Style.title,{
      height: Ti.UI.SIZE,
      top: 5,
      text: merchant.available
    })),

    spend: UI.createLabel(merge(Style.title,{
      height: Ti.UI.SIZE,
      top: 5,
      text: "Spend "+merchant.spend+","
    })),

    earn: UI.createLabel(merge(Style.title,{
      height: Ti.UI.SIZE,
      top: 5,
      text: "Earn "+merchant.earn
    })),

    remaining: UI.createLabel(merge(Style.title,{
      height: Ti.UI.SIZE,
      top: 5,
      text: merchant.remaining + " to go!"
    }))
  }
  
  self.row.add(self.result_image);
	self.row.add(self.name_label);
	
	if(merchant.credit) {
    self.row.add(self.available);
    self.row.add(self.spend);
    self.row.add(self.earn);
    self.row.add(self.remaining);
  }
  
  return self;
};
