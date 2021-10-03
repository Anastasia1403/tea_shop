import React from "react";
import PropTypes from "prop-types";

class tea extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    info: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      package_size: PropTypes.arrayOf(PropTypes.number),
      description: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.arrayOf(PropTypes.number),
    }),
    currentSelectOptionTea: PropTypes.shape({
      quantity: PropTypes.number,
      size_index: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
    updatePackageSize: PropTypes.func,
    changeQuantity: PropTypes.func,
  };

  render() {
    const { name, status, package_size, description, image } = this.props.info;

    const { quantity } = this.props.currentSelectOptionTea;
    const price =
      this.props.info.price[this.props.currentSelectOptionTea.size_index];

    let isAvailable = status === "available";

    const changePriceForSize = (event) => {
      let size_index = package_size.indexOf(+event.target.value);
      this.props.updatePackageSize(this.props.index, size_index);
    };

    return (
      <li key={this.props.index} className="tea">
        <div className="tea__wrapper">
          <div className="tea__img-wrapper">
            <img className="tea__img" src={image} alt={name} />
          </div>
          <div className="tea__info">
            <h2 className="tea__title"> {name} </h2>

            <label className="tea__select-size">
              {" "}
              Package size in grams:
              <select
                onChange={(event) => changePriceForSize(event)}
                className="tea__package-size"
              >
                {package_size.map((size) => {
                  return (
                    <option
                      key={package_size.indexOf(size)}
                      size_index={package_size.indexOf(size)}
                      className="tea__select-size-option"
                      value={size}
                    >
                      {size}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className="tea__price">Price: ${price} </div>
            <label className="tea__quantity">
              Quantity
              <input
                type="number"
                onChange={(event) => {
                  this.props.changeQuantity(
                    this.props.index,
                    +event.target.value
                  );
                }}
                min="1"
                value={quantity}
              />
            </label>
            <button
              onClick={() => this.props.addToOrder(this.props.index)}
              className="tea__order-button"
              disabled={!isAvailable}
            >
              Add to order
            </button>
          </div>
        </div>
        <div className="tea__description">{description}</div>
      </li>
    );
  }
}

export default tea;
