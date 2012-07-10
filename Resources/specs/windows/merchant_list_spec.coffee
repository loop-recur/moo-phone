require('../helpers/SpecHelper');

describe("Windows/MerchantList", () ->
	view_proxy = null
	merchants = [Factory('merchant', {name: "one"}), Factory('merchant', {name: "two"})]
	
	beforeEach(() ->
		spyOn(Windows.Application.navigation, 'open_')
		spyOn(Repo.Merchant, 'all').andCallFake((cb)-> cb(merchants))
		view_proxy = Windows.MerchantList()
		view_proxy.win.open()
	)
	
	it('populates the table with merchants on load', () ->
		expect(first(view_proxy.table.data).merchant.name).toEqual("one")
	)
	
	it("opens up the merchant detail with the clicked row's merchant", () ->
		spyOn(Windows, "MerchantDetail").andCallThrough()
		view_proxy.table.fireEvent('click', {row: first(view_proxy.table.data)})
		expect(Windows.MerchantDetail).toHaveBeenCalledWith(first(merchants))
	)
)
