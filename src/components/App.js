import React from "react";
import AdminPanel from "./AdminPanel";
import Order from "./Order";
import teas from "../teas";
import Header from "./Header";
import ProductList from "./ProductList";
import FilterProductList from "./FilterPriductList";

class App extends React.Component {
 
  state = {
    teas: {},
    order: {},
    currentSelectOptions: {},
    category: 'all',
  };

  componentDidMount() { 

    this.setState({ teas });
    const currentSelectOptions = {...this.state.currentSelectOptions};
    Object.keys(teas).map(key => { 
      return currentSelectOptions[key] = {
        size_index: 0,
        quantity: 1,
        display: false,
    }
    })
    this.setState( { currentSelectOptions } );
  };

  selectCategory = (event) => {
let category = event.target.value;
this.setState({ category });
  }

  addToOrder = (key) => {
    const order = { ...this.state.order };
    const teaOptions =  this.state.currentSelectOptions[key];
    const teaOrderAlias = `${key}_${teaOptions.size_index}`; //tea1_1

    order[teaOrderAlias] = order[teaOrderAlias] || {};
    order[teaOrderAlias].key = key;
    order[teaOrderAlias].size_index = teaOptions.size_index;
    order[teaOrderAlias].quantity = order[teaOrderAlias].quantity + teaOptions.quantity || teaOptions.quantity;
    this.setState({ order });
  };

  updateTea = (key, updatedTea) => {
      const teas = { ...this.state.teas };
      teas[key] = updatedTea;
      this.setState( { teas })
  }

  updatePackageSize = (key, size_index) => {
  const currentSelectOptions = { ...this.state.currentSelectOptions };
  currentSelectOptions[key].size_index = size_index;
  this.setState( {currentSelectOptions} );
  }

  changeQuantity = (key, value) => {
    const currentSelectOptions = { ...this.state.currentSelectOptions };
    currentSelectOptions[key].quantity = value;
    this.setState( {currentSelectOptions} );
  }

  toggleFormDisplay = (key) => {

    const currentSelectOptions = { ...this.state.currentSelectOptions };
    currentSelectOptions[key].display = !currentSelectOptions[key].display;
    this.setState( { currentSelectOptions} )
}

  deleteFromProductList = (key) => {
      const teas = { ...this.state.teas};
      delete teas[key];
      this.setState( { teas } )
  }

  deleteFromOrder = (key) => {
      const order = { ...this.state.order};
      delete order[key];
      this.setState({order})
  }

  addNewPackageSize = (key) => {
    const tea = { ...this.state.teas[key]};
    tea.price.push('');
    tea.package_size.push('');
    this.setState({tea})

  };

  deletePackageSize = (key, size_index) => {
    const teas = { ...this.state.teas};
    const currentSelectOptions = { ...this.state.currentSelectOptions };
        delete teas[key].price[size_index];
    delete teas[key].package_size[size_index];

    if (currentSelectOptions[key].size_index === +size_index) {
      const index = teas[key].package_size.findIndex(size => size != null);
     if (index === -1) {
      teas[key].status = 'unavailable' ; currentSelectOptions[key].size_index = teas[key].package_size.length
     } else {
      currentSelectOptions[key].size_index = index;
     }      
    }
    this.setState({teas, currentSelectOptions})
  }

  render() {

      return (
      <div className="main">
        <div>
        <Header/>     
        <FilterProductList selectCategory={this.selectCategory}/>
        <ProductList
        teas={this.state.teas}
        currentSelectOptions = {this.state.currentSelectOptions}
        addToOrder={this.addToOrder} 
        updatePackageSize={this.updatePackageSize}    
        changeQuantity={this.changeQuantity} 
        category={this.state.category} />        
        </div>
        <Order order={this.state.order} 
                teas={this.state.teas}
                currentSelectOptions = {this.state.currentSelectOptions}
                deleteFromOrder={this.deleteFromOrder} />
        <AdminPanel
          teas={this.state.teas}
          updateTea = {this.updateTea}
          deleteFromProductList = {this.deleteFromProductList}
          addNewPackageSize = {this.addNewPackageSize}
          deletePackageSize = {this.deletePackageSize}
          currentSelectOptions = {this.state.currentSelectOptions}
          toggleFormDisplay = {this.toggleFormDisplay}
        />
      </div>
    );
  }
}

export default App;
