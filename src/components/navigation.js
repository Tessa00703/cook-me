import React, { useState } from 'react';
import NavSearch from './NavSearch'
import Categories from './categories';
import { Link, useHistory } from "react-router-dom";
import { ClickAwayListener, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './navigation.css';


function Navigation({ onSearch,  getFilter }) {
    const [cat_toggler, setCat_toggler] = useState(false)
    const history = useHistory();

// FUNCTION TO TOGGLE CATEGORY DIV & CLICK AWAY
    const toggleCategories = () => {
      cat_toggler===true?setCat_toggler(false):setCat_toggler(true)
    }

    const clickAway = () => {
      cat_toggler===true?setCat_toggler(false):setCat_toggler("")
    }


    return (
    <div>
      <ClickAwayListener onClickAway={clickAway}>
        <div className='navbar-contain'>
          <div className="navbar">
            <Link to='/' style={{textDecoration: 'none'}} onClick={()=>{setTimeout(history.push('/'),100); window.location.reload()}}>
              <h1 className="navbar_cat_title"><strong>Secret</strong> Sauce</h1>
            </Link>

            <Hidden xsDown>
              <button className="navbar_cat_title" id="category_button" onClick={toggleCategories}>Categories</button>
            </Hidden>
            <Hidden smUp>
              <MenuIcon onClick={toggleCategories} style={{cursor: 'pointer'}}/>
            </Hidden>

            <Hidden xsDown>
              <NavSearch onSearch={onSearch} closeCategories={toggleCategories}/>
            </Hidden>
            
          </div>
          {cat_toggler===true?<Categories getFilter={getFilter} closeCategories={toggleCategories} onSearch={onSearch} />:""}
        </div>
      </ClickAwayListener>
    </div>
    );
  }
  
  export default Navigation;
