Models.Merchant = function(merchant){
  
  merchant.getAddress = function() {
    var city_state = join(', ', [merchant.address.city, merchant.address.state]);
    return join('\n', [merchant.address.line1, merchant.address.line2, city_state, merchant.address.zip]);
  }
  
  if(merchant.credit) {
    merchant.earn =  accounting.formatMoney(merchant.credit.earnings.earn);
    merchant.spend =  accounting.formatMoney(merchant.credit.earnings.spend);
    merchant.remaining =  accounting.formatMoney(merchant.credit.earnings.remaining);
    merchant.available =  accounting.formatMoney(merchant.credit.available);
  }
  
  return merchant;
};
