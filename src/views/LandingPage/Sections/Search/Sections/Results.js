import React, {useState} from 'react'
import InfoArea from "components/InfoArea/InfoArea.js";
import SearchIcon from '@material-ui/icons/Search';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loader from "react-loader-spinner";
import Item from "components/Item/Item.js";

const Results = (props) => {
    const { results } = props

    return (
        <GridContainer justify="center">
        {results.craigslist.length>0
          ? results.craigslist.map( result => {
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
    )
}

export default Results