Controllers.MerchantList = function(view_proxy) {
	var populateTable = Repo.Merchant.all.p(compose(view_proxy.table.set, map(compose('.row', Views.MerchantRow))), {}),
	
			//+ openDetail :: {row: TableViewRow} -> IO
			openDetail = function(e) {
				compose(Windows.Application.navigation.open_, '.win', Windows.MerchantDetail, '.row.merchant')(e);
			}
	

  view_proxy.win.addEventListener('open', populateTable);
	view_proxy.table.addEventListener('click', openDetail);
};
