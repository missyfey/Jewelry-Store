import React , {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class PaypalButton extends Component {
    render() {
		const onSuccess = (payment) => {
            alert("The payment was succeeded!", payment);
            this.props.clearCart()
            window.location.pathname = '/'
		}

		const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
		}

		const onError = (err) => {
			console.log("Error!", err);
		}

		let env = 'sandbox'; 
		let currency = 'USD'; 
		const client = {
			sandbox:    'AY4wkambUWUOhXErbEZQAJ7yS-hnODjOqN1P0HcVnDjdo-A_CFNNKBFMUzOBf76m3hdprQULSX0Q8P79',
			production: 'YOUR-PRODUCTION-APP-ID',
		}
        return (
            <PaypalExpressBtn 
            env={env} 
            client={client} 
            currency={currency} 
            total={this.props.total} 
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel} />
        );
    }
}