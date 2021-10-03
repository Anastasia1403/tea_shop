import React from 'react';
import PropTypes from 'prop-types';

class Shipment extends React.Component {

static propTypes = {
    totalPrice: PropTypes.number
}

    render() {
        const { totalPrice } = this.props;

        let deliveryCost = totalPrice < 30 ? 5 : 1;

        return (
            <div className='shipment'>
                <div>Delivery cost: ${deliveryCost}</div>
                {deliveryCost === 5 ? <div className='shipment__discount' >Add tea for ${30 - totalPrice} to get discount on delivery </div> : null}           
                <div className='shipment__total-price'>Total price: ${totalPrice + deliveryCost}</div>
            </div>
             
        
        )
}
}

export default Shipment;