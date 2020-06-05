import React from 'react'
import './NavSearch.css'


const NavSearch = ({ onSearch, closeCategories}) =>{

    return (
        <>
            <div className="navbar_search">
                <form onSubmit={(e)=>{e.target[0].value.length <1? alert("Please enter a search term."):e.preventDefault();onSearch(e.target[0].value)}}>
                    <input className="navbar_search" type="text" placeholder="Search for recipe.."></input>
                    <button className="navbar_search">OK</button>
                </form>
            </div>
        </>
    )
}
export default NavSearch
