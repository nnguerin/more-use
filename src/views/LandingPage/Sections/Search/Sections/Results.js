import React, { useState, useEffect} from 'react'
import InfoArea from "components/InfoArea/InfoArea.js";
import SearchIcon from '@material-ui/icons/Search';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Loader from "react-loader-spinner";
import Item from "components/Item/Item.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Paginations from "components/Pagination/Pagination.js";


const useStyles = makeStyles(styles);

const Results = (props) => {
    const { results } = props

    const classes = useStyles();
    return (
      <GridContainer justify="center">
        {results.length>0
          ? results.map( result => {
            return (
              <GridItem key={`grid_for_${result.id}`}xs={12} sm={12} md={4}>
                <Item key ={result.id} item={result}/>
              </GridItem>
            )})
          : <h5 className={classes.description}>No results</h5>
        }
      </ GridContainer>
    )
}

export default Results