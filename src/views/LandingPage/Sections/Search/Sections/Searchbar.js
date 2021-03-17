import MaterialSearchbar from "material-ui-search-bar";
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import DollarSign from '@material-ui/icons/AttachMoney';
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Paginations from "components/Pagination/Pagination.js";
import endpoints from 'services/endpoints'

const Searchbar = (props) => {
  const { handleResults, handleLoading } = props
    const [ search, setSearch ] = useState({
      term: '',
    })
    const [ price, setPrice] = useState({
      min: null,
      max: null,
    });
  
    const handlePriceChange = (event) => {
      setPrice({
        ...price,
        [event.target.id]: event.target.value
      })
    };

    const handleSearchChange = (newSearchTerm) => {
        setSearch({ ...search, term: newSearchTerm })
    }

    const sendSearchRequest = () => {
        if (search.term) {
          handleLoading(true)
          axios
            .get(endpoints.craigslist, { params: { search: search, price: price }})
            .then( response => {
                console.log("response", response);
              handleResults({ craigslist: response.data.results })
              handleLoading(false)
            })
            .catch( error => {
              console.log(error);
            })
            .then( () => {
              console.log('ran axios');
            })
        } else {
          handleResults({ craigslist: [] })
        }
    }

    return (
      <GridContainer alignItems='center' >
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <MaterialSearchbar
                value={search.term}
                onChange={(newSearchTerm) => handleSearchChange(newSearchTerm)}
                onRequestSearch={() => sendSearchRequest(search)}
            />
          </GridItem>
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
            <Button round color='primary' onClick={sendSearchRequest}>Go</Button>
          </GridItem>
        </GridContainer>
    )


}

export default Searchbar