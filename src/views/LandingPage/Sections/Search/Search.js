import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import Item from "components/Item/Item.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Searchbar from './Sections/Searchbar'

const useStyles = makeStyles(styles);

const Search = () => {
  const classes = useStyles();
    const [ clSearch, setCLSearch ] = useState({
    results: []
  })

  useEffect( () => {
    const response = axios
    .get('http://localhost:3001/api/craigslistsearch')
    .then( response => {
      console.log("response from api", response.data);
      setCLSearch(response.data)
    })
    .catch( error => {
      console.log(error);
    })
    .then( () => {
      console.log('ran axios');
    })
  }, [])
    

  return (    
    <div>
      <Searchbar />
      <GridContainer justify="center">
        {clSearch.results.length>0
          ? clSearch.results.map( result => {
            return (
              <GridItem xs={12} sm={12} md={4}>
                <Item key ={result.id} item={result}/>
              </GridItem>
            )})
          : <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
        }
      </GridContainer>
    </div> 
  )
}

export default Search