import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { CardMedia } from '@material-ui/core';
import './ResultsMain.css';


const ResultsMain = (props) => {
    const history = useHistory();
    return (
        <>
            <div className='results-cards'>
                <h1 className='main-results'>{props.searchToggle===1?`Searched: ${props.search}`:"Latest Recipes"}</h1>
                {props.filters.length>0?
                <div className="matches">
                    <h2 className='filter-results'>Filtered by 
                    <span> {props.filters.toString().replace(/,/g, ", ") } </span> 
                    with {props.gotRecipes.length} match(es)...
                    </h2>

                    <button className='reset-filter' onClick={()=>props.resetFilter()}>Reset Filter</button>
                </div>:null}

                <div className='cards-wrap'>

                {props.gotRecipes.length>=1?
                    props.gotRecipes.map(recipe =>  
                        <Link
                            to= '/:recipe'
                            style={{textDecoration: 'none'}}
                            onClick={(e) =>{ history.push(`/${recipe.recipe_slug}`); window.scrollTo(0,0); e.preventDefault()}} 
                            key={recipe.recipe_id}
                            >
                            <CardMedia className='main-card' image={recipe.recipe_hero_image} />
                            <h3 className='recipe-card-title'>{recipe.recipe_title}</h3>
                        </Link>
                        ):
                        <div className="matches" style={{flexDirection: "column", textAlign:"center", alignItems:"center", padding:"200px 0"}}>
                            <h1>There are no recipes matching your search/filter.</h1>
                            <button onClick={()=>window.location.reload()} style={{width:"100px", height:"39px"}}>Back</button>
                        </div>}
                </div>
            </div>
        </>
        
    )
};

export default ResultsMain;