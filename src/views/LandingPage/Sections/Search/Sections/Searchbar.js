import React from 'react'
import InfoArea from "components/InfoArea/InfoArea.js";
import SearchIcon from '@material-ui/icons/Search';

const Searchbar = () => {

    return (
        <InfoArea
            title='This is the search bar'
            icon={SearchIcon}
            iconColor="primary"
        />
    )
}

export default Searchbar