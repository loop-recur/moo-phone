Windows.MerchantList = function() {
  var self = {
        win: UI.createWindow({title: 'Merchants', barColor:'#000'}),

        table: UI.createTableView({
          layout: 'vertical',
          height: Ti.UI.FILL,
          width: Ti.UI.FILL,
          showVerticalScrollIndicator: true
        }),
				
				empty_row: UI.createTableViewRow({
					title: "No results found"
				})
      };


  self.win.add(self.table);
  Controllers.MerchantList(self);
	
  return self;
};

