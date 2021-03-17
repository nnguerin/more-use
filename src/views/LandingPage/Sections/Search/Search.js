import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner";
import Item from "components/Item/Item.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Searchbar from "./Sections/Searchbar";
import Results from './Sections/Results'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import DollarSign from '@material-ui/icons/AttachMoney';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const Search = () => {
  const classes = useStyles();
  const [ loading, setLoading ] = useState(false)
  const [ results, setResults ] = useState({
    craigslist: []
  })

  const allResults = results.craigslist

  const handleResults = (newResults) => {
    setResults({ ...results, craigslist: newResults.craigslist })
  }

  const handleLoading = (loading) => {
    setLoading(loading)
  }

  console.log("display results", allResults);

  return (    
    <div>
      <Searchbar handleResults={handleResults} handleLoading={handleLoading}/>
      {loading
        ? <Loader
            style={{ textAlign: 'center' }}
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        : <Results results={allResults} />
      }
    </div> 
  )
}

export default Search