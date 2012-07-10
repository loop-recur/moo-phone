require('../helpers/SpecHelper');

describe("Windows/MerchantDetail", () ->
  merchant = null
  view_proxy = null
  merchant_attrs =
    name: "one"
    coordinates:
      latitude: 37.867084
      longitude: -122.259699
    address:
      line1: '2488 Channing Way'
      line2: '#3'
      city: 'Berkeley'
      state: 'CA'
      zip: '94704'
    phone: '510-845-3766'
  
  beforeEach(()->
    spyOn(Routes, 'openGoogleMapDirections')
    spyOn(Ti.Platform, 'openURL')
    merchant = Factory('merchant', merchant_attrs)
    view_proxy = Windows.MerchantDetail(merchant)
  )

  it('puts the merchant name on the page', () ->
    expect(view_proxy.title.text).toEqual('one')
  )
  
  it('puts a map on the page', () ->
    expect(first(view_proxy.map.annotations).latitude).toEqual(merchant.coordinates.latitude)
  )
  
  it('puts an address on the page', () ->
    addressText = view_proxy.address.text;
    expect(addressText).toMatch("2488 Channing Way")
    expect(addressText).toMatch("#3")
    expect(addressText).toMatch("Berkeley, CA")
    expect(addressText).toMatch("94704")
  )
  
  it('opens directions', () ->
    view_proxy.directions.fireEvent('click')
    expect(Routes.openGoogleMapDirections).toHaveBeenCalledWith(merchant.coordinates, { latitude : 123, longitude : 345 })
  )
  
  it('calls store', () ->
    view_proxy.phone.fireEvent('click')
    expect(Ti.Platform.openURL).toHaveBeenCalledWith("tel:5108453766")
  )
)
