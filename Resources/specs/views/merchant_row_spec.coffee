require('../helpers/SpecHelper');

describe("Views/MerchantRow", () ->
	it('puts the merchant name on the page', () ->
    merchant = Factory('merchant', {name: "one"})
    view_proxy = Views.MerchantRow(merchant)
    expect(view_proxy.name_label.text).toEqual('one')
	)
	
	it("doesn't put the credit info on there if there is no credit info", () ->
    merchant = Factory('merchant', {name: "one"})
    view_proxy = Views.MerchantRow(merchant)
    expect(extractText(view_proxy.row)).not.toMatch(/Spend/)
  )
  
  it('puts the credit on the page if it gets it (if your logged in)', () ->
    merchant = Factory('merchant', {name: "one", credit: {available: 2, earnings: {startWith: 1, spend: 20, earn: 2, remaining: 2}}})
    view_proxy = Views.MerchantRow(merchant)
    expect(view_proxy.available.text).toEqual("$2.00")
    expect(view_proxy.spend.text).toEqual("Spend $20.00,")
    expect(view_proxy.earn.text).toEqual("Earn $2.00")
    expect(view_proxy.remaining.text).toEqual("$2.00 to go!")
	)
)
