FactoryDefinitions = {
	merchant: function(props) {
	  props.address = props.address || {address: {line1: '2488 Channing Way', line2: '#3', city: 'Berkeley', state: 'CA', zip: '94704'}}
		return Models.Merchant(props);
	}
}
