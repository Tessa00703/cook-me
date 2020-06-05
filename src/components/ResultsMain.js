import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { CardMedia } from '@material-ui/core';
import './ResultsMain.css';



const ResultsMain = (props) => {
    const history = useHistory();
    const [selectedFilter, setSelectedFilter] = useState()

    useEffect( () => {
        if (props.filters !== undefined)
        {
        var urlencoded = new URLSearchParams();
        props.filters.map((cat, index) => 
              urlencoded.append(index, cat)
        )
        
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };

        fetch("https://saucy-secret.herokuapp.com/cat/title", requestOptions)
        .then(response => response.json())
        .then(result => setSelectedFilter(result.map(x=>x.category_title)))            
        .catch(error => console.log('error', error));
        }
    }, [props.filters]
    )


    return (
        <>
            <div className='results-cards'>
                {props.searchToggle === 1?<h1 className='main-results'> {`Searched: ${props.search}`}</h1>:<h1 className='main-results'>{"Latest Recipes"}</h1>}


                {/* {if(props.searchToggle === 1){ return(
                    <h1 className='main-results'> {`Searched: ${props.search}`}</h1>)
                } else if (selectedFilter.length > 1) { return(
                    <h1 className='main-results'>{""}</h1>)}           
                else { return ( 
                    <h1 className='main-results'>{"Latest Recipes"}</h1>
                )}} */}
                                    
                {props.filters.length>0?
                <div className="matches">
                    <h2 className='filter-results'>Filtered by 
                    <span> {!selectedFilter?"":selectedFilter.toString().replace(/,/g, ", ") } </span> 
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
                            <h1>There are no matching no recipes.</h1>
                            <button onClick={()=>window.location.reload()} style={{width:"100px", height:"39px"}}>Back</button>
                        </div>}
                </div>
            </div>
        </>
        
    )
};

export default ResultsMain;