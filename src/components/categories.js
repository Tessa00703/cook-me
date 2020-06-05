import React from 'react';
import Category from './category'
import './categories.css';


function Categories({getFilter, closeCategories, onSearch}) {
    return (
        <div className="categories" id="categories">
        <Category getFilter={getFilter} closeCategories={closeCategories} onSearch={onSearch}/>
        </div>
    );
  }
  
  export default Categories;