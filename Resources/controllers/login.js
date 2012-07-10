Controllers.Login = function(view_proxy, close) {
  view_proxy.submit_button.addEventListener('click', compose(close, Windows.Application.open));
};
