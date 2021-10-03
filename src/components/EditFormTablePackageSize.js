import React from "react";
import PropTypes from 'prop-types';


class EditFormTablePackageSize extends React.Component {
static propTypes = {
  
tea: PropTypes.shape({
  package_size: PropTypes.arrayOf(PropTypes.number),
  price: PropTypes.arrayOf(PropTypes.number),
}),
index: PropTypes.string,
addNewPackageSize: PropTypes.func,
changeTea: PropTypes.func,
updateTea: PropTypes.func,
deletePackageSize: PropTypes.func,
}

  addNewPackageSize = (event) => {
    event.preventDefault();
    this.props.addNewPackageSize(this.props.index);
  };

  changeTea = (event) => {
    const updatedTea = { ...this.props.tea };
    updatedTea[event.currentTarget.name][
      event.currentTarget.getAttribute("size_index")
    ] = +event.currentTarget.value;

    this.props.updateTea(this.props.index, updatedTea);
  };

  deletePackageSize = (event) => {
    event.preventDefault();
    const size_index =
      event.target.previousElementSibling.getAttribute("size_index");
    this.props.deletePackageSize(this.props.index, size_index);
  };
  render() {
    let { price, package_size } = this.props.tea;


    return (
      <div className ="tea-form-package">
         <div className='tea-form-package__labels'> 
         <div>Package size, g</div>
          <div>Price, $</div>
          </div>
        {package_size.map((item) => {
          let i = package_size.indexOf(item);
          return (
            <div className ="tea-form-package__row">
              <input
                className="tea-form-package__size"
                size_index={i}
                onChange={this.changeTea}
                name="package_size"
                type="text"
                value={item}
              />
              <input
                className="tea-form-package__price"
                size_index={i}
                onChange={this.changeTea}
                name="price"
                type="text"
                value={price[i]}
              />
              <button title ='Delete this package size' className='tea-form-package__delete-button' onClick={this.deletePackageSize}>×</button>
            </div>
          );
        })}

        <button className='tea-form-package__add-button'
          onClick={(event) => {
            this.addNewPackageSize(event);}}>
          Add new package size
        </button>
      </div>
    );
  }
}

export default EditFormTablePackageSize;
