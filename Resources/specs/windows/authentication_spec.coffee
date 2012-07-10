require('../helpers/SpecHelper');

describe("Windows/Authentication", () ->
	view_proxy = null

	beforeEach(() ->
		spyOn(Windows, 'Login')
		view_proxy = Windows.Authentication()
	)
	
	it('opens the login screen', () ->
		view_proxy.login_view.fireEvent('click')
		expect(Windows.Login).toHaveBeenCalled()
	)
	
)
