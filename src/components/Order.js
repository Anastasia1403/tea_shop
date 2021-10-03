import React from "react";
import PropTypes from "prop-types";
import Shipment from "./Shipment";

class Order extends React.Component {
  static propTypes = {
    order: PropTypes.shape({
      key: PropTypes.string,
      quantity: PropTypes.number,
      size_index: PropTypes.number,
    }),
    teas: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      package_size: PropTypes.arrayOf(PropTypes.number),
      image: PropTypes.string,
      price: PropTypes.arrayOf(PropTypes.number),
    }),
    currentSelectOptions: PropTypes.object,
    deleteFromOrder: PropTypes.func,
  };

  renderOrder = (alias) => {
    const key = this.props.order[alias].key;
    const quantity = +this.props.order[alias].quantity;   
    const tea = this.props.teas[key];
    const size = tea.package_size[this.props.order[alias].size_index];
    const price = +tea.price[this.props.order[alias].size_index];

    if (tea && size && tea.status  === "available") {
      return (
        <li className='order__item' key={alias}>
          <div className='order__item-title'>{tea.name}</div>
          <div className='order__info'>
            <span>{quantity} {quantity===1 ? 'pack' : 'packs'} </span>
          <span>{size} g</span>

          
          <span>${price * quantity}</span>
          <button className='order__delete-button'
            onClick={() => {
              this.props.deleteFromOrder(alias);
            }}> × </button>
          </div>
          
        </li>
      );
    } else {
      return (
        <div className='order__out-of-stock'>
        <li key={alias}>
          Sorry, the {tea ? tea.name + ' of this package size' : 'tea'} is out of stock now.
        </li>

<button className='order__delete-button'
onClick={() => {
  this.props.deleteFromOrder(alias);
}}> × </button>
</div>
      );
    }
  };

  render() {
    const orderAliases = Object.keys(this.props.order);

    let totalPrice = orderAliases.reduce((sum, alias) => {
    const currentTea = this.props.order[alias]
    const key =  currentTea.key;
    const quantity = +currentTea.quantity;
    const tea = this.props.teas[key];
    const price = +tea.price[currentTea.size_index];
    const size = tea.package_size[this.props.order[alias].size_index];

    
      if (tea && size && tea.status === "available") {
        sum = sum + price * quantity;
      }
      return sum;
    }, 0);

    return (
      <div className="order">
        <h2 className="order__title">Your Order</h2>
        <ul className="order__list">
          {orderAliases.map((alias) => this.renderOrder(alias))}
        </ul>
        {totalPrice > 0 ? (
          <Shipment totalPrice={totalPrice} />
        ) : (
          <div className='order__nothing'>Please, choose tea and add to your order.</div>
        )}
      </div>
    );
  }
}

export default Order;
