import React from 'react';
import PropTypes from 'prop-types';

const FilterProductList = (props) => { 
   
    return (
        <label className="category"> Category
        <select onChange={event => props.selectCategory(event)} className="category__select">
            
     <option value='all'>all</option>;
     <option value='black'>black</option>;
     <option value='green'>green</option>;
     <option value='herbal'>herbal</option>;
     </select>
     </label>   
    )
}

FilterProductList.propTypes = {
    selectCategory: PropTypes.func
}

export default FilterProductList;