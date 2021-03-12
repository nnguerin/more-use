import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import Item from "components/Item/Item.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Searchbar from "material-ui-search-bar";
import Results from './Sections/Results'

const useStyles = makeStyles(styles);

const Search = () => {
  const classes = useStyles();
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState({
    craigslist: []
  })


    const handleChange = (newSearch) => {
        setSearch(newSearch)
    }

    const sendSearchRequest = () => {
        if (search) {
          axios
            .get('http://localhost:3001/api/craigslistsearch', { params: { search: search }})
            .then( response => {
              setResults({ ...results, craigslist: response.data.results})

            })
            .catch( error => {
              console.log(error);
            })
            .then( () => {
              console.log('ran axios');
            })
        }
    }    

    console.log("search", search);
    console.log("results", results);

  return (    
    <div>
      <Searchbar
        value={search}
        onChange={(newSearch) => handleChange(newSearch)}
        onRequestSearch={() => sendSearchRequest(search)}
      />
      <Results results={results} />
    </div> 
  )
}

export default Search