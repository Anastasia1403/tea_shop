import React from "react";
import PropTypes from "prop-types";
import EditFormTablePackageSize from "./EditFormTablePackageSize";

class EditTeaForm extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    tea: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      package_size: PropTypes.arrayOf(PropTypes.number),
      description: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.arrayOf(PropTypes.number),
      category: PropTypes.string,
    }),
    updateTea: PropTypes.func,
    deleteFromProductList: PropTypes.func,
    currentSelectOptionsTea: PropTypes.shape({
      display: PropTypes.bool,
    })
  };

  changeTea = (event) => {
    const updatedTea = {
      ...this.props.tea,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateTea(this.props.index, updatedTea);
  };

  render() {
    let { name, status, description, image, category } = this.props.tea;
    let { display } = this.props.currentSelectOptionsTea;

    return (
      <div>
        <h4 className="tea-title" onClick={() => this.props.toggleFormDisplay(this.props.index)}>
          {name}
          <button
            className="show-form-button"
            
          >
            {display === true ? "−" : "+"}
          </button>
        </h4>

        {display === true ? (
          <form className="tea-form" index={this.props.index}>
            <label htmlFor="title" className="tea-form__name">
              Title
            </label>
            <input
              id="title"
              className="tea-form__name-input"
              onChange={this.changeTea}
              name="name"
              type="text"
              value={name}
            />
            <div className="tea-form__label-wrapper">
              <label htmlFor="status" className="tea-form__status">
                Status
              </label>
              <label htmlFor="category" className="tea-form__category">
                Category
              </label>
            </div>
            <div className="tea-form__select-wrapper">
              <select
                id="status"
                onChange={this.changeTea}
                name="status"
                value={status}
              >
                <option>available</option>
                <option>unavailable</option>
              </select>

              <select
                id="category"
                onChange={this.changeTea}
                name="category"
                className="tea-form__category"
                value={category}
              >
                <option>black</option>
                <option>green</option>
                <option>herbal</option>
              </select>
            </div>

            <label htmlFor="img" className="tea-form__image">
              Image URL
            </label>
            <input
              className="tea-form__image-input"
              id="img"
              onChange={this.changeTea}
              name="image"
              type="text"
              value={image}
            />

            <EditFormTablePackageSize
              tea={this.props.tea}
              index={this.props.index}
              addNewPackageSize={this.props.addNewPackageSize}
              changeTea={this.changeTea}
              updateTea={this.props.updateTea}
              deletePackageSize={this.props.deletePackageSize}
            />

            <label htmlFor="desc" className="tea-form__description">
              {" "}
              Description{" "}
            </label>
            <textarea
              id="desc"
              className="tea-form__description-textarea"
              name="desc"
              onChange={this.changeTea}
              value={description}
            ></textarea>

            <button
              onClick={() => this.props.deleteFromProductList(this.props.index)}
              className="tea-form__delete"
              type="submit"
            >
              Delete from product list
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}
export default EditTeaForm;
