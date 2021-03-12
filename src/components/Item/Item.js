import React, {useState} from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Link from '@material-ui/core/Link';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import { AspectRatio } from 'react-aspect-ratio';
import CurrencyFormat from 'react-currency-format';
import InfoArea from "components/InfoArea/InfoArea.js";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

const Item = (props) => {
    const { item } = props
    const fallbackImage = require("assets/img/fallback.jpg").default

    const [ image, setImage ] = useState({
        src: item.img ? item.img : fallbackImage,
        error: false,
    })

    const handleImageError = () => {
        setImage({
            src: fallbackImage,
            error: true,
        })
    }

    console.log("loaded an item");

  const classes = useStyles();
  return (
    <Card style={{ width: "20rem"}}>
      <AspectRatio ratio="3/4" style={{ maxWidth: '20rem'}}>
        <a href={item.link}>
            <img
            className={classes.imgCardTop}
            src={image.src}
            onError={handleImageError}
            />
        </a>
      </AspectRatio>
      <CardBody>
        <h4 className={classes.cardTitle}>{item.title}</h4>
        <p>Located in {item.location}</p>
        <p>Posted on {item.date}</p>
        <Link href={item.link}>
            <Button color="primary" round >Go to site!</Button>
        </Link>
        <AttachMoneyIcon /><CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </CardBody>
    </Card>
  );
}

export default Item