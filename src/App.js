import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import Home from './Home'
import Footer from './components/Footer'
import Navigation from './components/navigation'
import RecipePage from './RecipePage'

function App() {
  const [searchToggle, setSearchToggle] = useState(0)
  const [search, setSearch] = useState()
  const [recipes, setRecipes] = useState()
  const [initial, setInitial] = useState()
  const [catFilter, setCatFilter] = useState([])
  const [filterMatch, setFilterMatch] = useState()
  const history = useHistory();

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };


//HELPER FUNCTIONS
  const searchHandler = (searchquery) => {
    history.push('/')
    if (searchquery.length > 0) {
    setSearchToggle(1)
    setSearch(searchquery)
    resetFilter()
    }
  }
     
  const filterHandler = (filter) => {
    setSearchToggle(0)
    setCatFilter(filter)
    if (filter.length === 0) {
    fetch(`https://saucy-secret.herokuapp.com/`, requestOptions)
      .then(response => response.json())
      .then(result => setRecipes(result))
      .catch(error => console.log('error', error));
    } 
    else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    filter.map((cat, index) => 
          urlencoded.append(index, cat)
    )

    var requestOptionsFilter = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("https://saucy-secret.herokuapp.com/filter/", requestOptionsFilter)
      .then(response => response.json())
      .then(result => setRecipes(result))
      .catch(error => console.log('error', error));
    }
  }
  
  const resetFilter = () => {
    setCatFilter([])
    setFilterMatch()
    filterHandler([])
  }

 useEffect(()=>{
    fetch("https://saucy-secret.herokuapp.com/", requestOptions)
    .then(response => response.json())
    .then(result => setInitial(result))
    .catch(error => console.log('error', error));

    if (searchToggle === 1){
      fetch(`https://saucy-secret.herokuapp.com/search/${search}`, requestOptions)
      .then(response => response.json())
      .then(result => setRecipes(result))
      .catch(error => console.log('error', error));
      }
    
    else if (!filterMatch) {
      fetch("https://saucy-secret.herokuapp.com/", requestOptions)
      .then(response => response.json())
      .then(result => setRecipes(result))
      .catch(error => console.log('error', error));
    }

  },[search, searchToggle])
  

  // RETURN
  return (
    <div>
      <Navigation onSearch={searchHandler} getFilter={filterHandler}/>
      {!recipes?'': 
      <Switch>
        <Route path='/:recipe' render={props => <RecipePage gotRecipes={recipes} initial={initial} {...props} />} />
        <Route exact path='/' render={props => <Home initial={initial} gotRecipes={recipes} searchToggle={searchToggle} search={search} filters={catFilter} resetFilter={resetFilter} {...props} />} />
      </Switch>
      }
      <Footer />
    </div>
  );
}

export default App;



