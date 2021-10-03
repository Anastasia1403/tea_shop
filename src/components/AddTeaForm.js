import React from "react";
import PropTypes from 'prop-types';

class AddTeaForm extends React.Component {

static propTypes = {
  addTea: PropTypes.func
}

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();


  createTea = (event) => {
    event.preventDefault();
    const tea = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value || 0),
      status: this.statusRef.current.value,
      description: this.descRef.current.value,
      image: this.imageRef.current.value,
    }
    this.props.addTea(tea);
    event.currentTarget.reset();
  };

  render() {
    return (
    <form onSubmit={this.createTea} className="tea-form">
      <input className='tea-form__name' type='text' placeholder='Name' ref={this.nameRef}/>
      <input className='tea-form__price' type='text' placeholder='Price' ref={this.priceRef}/>
      <select className='tea-form__status' ref={this.statusRef}>
        <option className='tea-form__avaliable'>Avaliable</option>
        <option className='tea-form__unavaliable'>Unavaliable</option>
      </select >
      <textarea className='tea-form__desc' placeholder='Description' ref={this.descRef}></textarea>
      <input className='tea-form__image' type='text' placeholder='image URL' ref={this.imageRef}/>
      <button className='tea-form__submit' type='submit'>Add to menu</button>
    </form>
    )
  }
}

export default AddTeaForm;