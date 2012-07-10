Controllers.Authentication = function(view_proxy) {
  
  var close = view_proxy.base_win.close_;
  
  var open = view_proxy.navigation.open_;

  view_proxy.login_view.addEventListener('click', Windows.Login.p(open, close));
};
