import React, { useState, useEffect} from 'react'
import InfoArea from "components/InfoArea/InfoArea.js";
import SearchIcon from '@material-ui/icons/Search';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loader from "react-loader-spinner";
import Item from "components/Item/Item.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import DollarSign from '@material-ui/icons/AttachMoney';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const Results = (props) => {
    const { results } = props
    const [ displayResults, setDisplayResults ] = useState(results.craigslist)
    const [ price, setPrice] = useState({
      min: null,
      max: null,
    });

    console.log("price", price);
    console.log("dr", displayResults);

    const handlePriceChange = (event) => {
      setPrice({
        ...price,
        [event.target.id]: event.target.value
      })
    };

    const handleDisplayResults = () => {
      if (price.min > price.max) {
        return results.craigslist
      }
      var newResults = results.craigslist
      if (price.min) {
        newResults = newResults.filter( result => result.price >= price.min)
      }

      if (price.max) {
        newResults = newResults.filter( result => result.price <= price.max)
      }

      newResults.sort( (a,b) => (a.price > b.price) ? 1 : -1)

      setDisplayResults(newResults)
    }

    const classes = useStyles();
    return (
      <div>
        <GridContainer alignItems='center' >
          <GridItem xs={12} sm={5} md={5} lg={5}>
            <CustomInput
              value={ price.min }
              labelText="Minimum Price"
              id="min"
              formControlProps={{ fullWidth: true }}
              inputProps={{
                onChange: (event) => handlePriceChange(event),
                endAdornment: (
                  <InputAdornment position="end">
                    <DollarSign />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={5} md={5} lg={5}>
            <CustomInput
              value={ price.max }
              labelText="Maximum Price"
              id="max"
              formControlProps={{ fullWidth: true }}
              inputProps={{
                onChange: (event) => handlePriceChange(event),
                endAdornment: (
                  <InputAdornment position="end">
                    <DollarSign /><DollarSign />
                  </InputAdornment>
                )
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2} lg={2}>
            <Button round color='primary' onClick={handleDisplayResults}>Go</Button>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        {displayResults.length>0
          ? displayResults.map( result => {
            return (
              <GridItem key={`grid_for_${result.id}`}xs={12} sm={12} md={4}>
                <Item key ={result.id} item={result}/>
              </GridItem>
            )})
          : <h5 className={classes.description}>No results</h5>

        }
      </GridContainer>
      </div>
    )
}

export default Results