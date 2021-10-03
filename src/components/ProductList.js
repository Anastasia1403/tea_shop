import React from "react";
import PropTypes from "prop-types";
import Tea from "./Tea";

class ProductList extends React.Component {
  static propTypes = {
    teas: PropTypes.object,
    currentSelectionSettings: PropTypes.object,
    addToOrder: PropTypes.func,
    updatePackageSize: PropTypes.func,
    changeQuantity: PropTypes.func,
    category: PropTypes.string,

  };
  render() {
    return (
      <div className="product-list">
        <ul className="product-list__teas">
          {Object.keys(this.props.teas).map((key) => {
            if (
              this.props.teas[key].category === this.props.category ||
              this.props.category === "all"
            ) {
              return (
                <Tea
                  key={key}
                  index={key}
                  info={this.props.teas[key]}
                  currentSelectOptionTea={this.props.currentSelectOptions[key]}
                  addToOrder={this.props.addToOrder}
                  updatePackageSize={
                    this.props.updatePackageSize
                  }
                  changeQuantity={this.props.changeQuantity}
                />
              );
            } else return null
          })}
        </ul>
      </div>
    );
  }
}

export default ProductList;
