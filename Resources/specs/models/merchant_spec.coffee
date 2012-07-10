require('../helpers/SpecHelper');

describe("Models/Merchant", () ->
  merchant = null
  
  beforeEach(() ->
    merchant = Factory('merchant', {name: "two", credit: {available: 2, earnings: {startWith: 1, spend: 20, earn: 2, remaining: 2}}, address: {line1: '2488 Channing Way', line2: '#3', city: 'Berkeley', state: 'CA', zip: '94704'}})
  )
  
  
  it('returns the address', () ->
    expect(merchant.getAddress()).toEqual("2488 Channing Way\n#3\nBerkeley, CA\n94704")
  )
  
  describe("credit", () ->
    it('returns earnings', () ->
      expect(merchant.earn).toEqual("$2.00")
    )  
  
    it('returns available', () ->
      expect(merchant.available).toEqual("$2.00")
    )
  
    it('returns remaining', () ->
      expect(merchant.remaining).toEqual("$2.00")
    )
  
    it('returns spend', () ->
      expect(merchant.spend).toEqual("$20.00")
    )
  
    it('doesnt blow up on null', () ->
      merchant.spend = null;
      expect(merchant.spend).toEqual(null)
    )
  )
)
