import React from "react";
import PropTypes from 'prop-types';
import EditTeaForm from "./EditTeaForm";

class AdminPanel extends React.Component {

  static propTypes = {
          teas: PropTypes.object,
          updateTea: PropTypes.func,
          deleteFromProductList: PropTypes.func,
          addNewPackageSize: PropTypes.func,
          deletePackageSize: PropTypes.func,
          toggleFormDisplay: PropTypes.func,
          currentSelectOptions: PropTypes.object,

  }
  render() {
    return (
    <div className="admin-panel">
      
  <h2 className='admin-panel__title'>Admin Panel</h2>

  {Object.keys(this.props.teas).map( (key) => <EditTeaForm
                                                          key={key}
                                                          index={key} 
                                                          tea={this.props.teas[key]}
                                                          updateTea = {this.props.updateTea}
                                                          deleteFromProductList={this.props.deleteFromProductList}
                                                          addNewPackageSize={this.props.addNewPackageSize}
                                                          deletePackageSize={this.props.deletePackageSize}
                                                          currentSelectOptionsTea = {this.props.currentSelectOptions[key]}
                                                          toggleFormDisplay = {this.props.toggleFormDisplay}
        
                />)}
 
    </div>
    )
  }
}

export default AdminPanel;