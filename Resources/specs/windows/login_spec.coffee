require('../helpers/SpecHelper');

describe("Windows/Login", () ->
	view_proxy = null
	open = jasmine.createSpy('open')
	close = jasmine.createSpy('close')

	beforeEach(() ->
		spyOn(Windows.Application, 'open').andCallThrough()
		base_win = UI.createWindow()
		view_proxy = Windows.Login(open, close)
	)
	
	it('opens the login window with the passed in function', () ->
	  expect(open).toHaveBeenCalled()
	)
	
	it('opens the application and closes the window', () ->
		view_proxy.submit_button.fireEvent('click')
		expect(close).toHaveBeenCalled()
		expect(Windows.Application.open).toHaveBeenCalled()
	)
	
)
