import MaterialSearchbar from "material-ui-search-bar";
import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Searchbar = (props) => {
    const [ search, setSearch ] = useState({
        term: '',
    })
    const { handleResults, handleLoading } = props

    const handleSearchChange = (newSearchTerm) => {
        setSearch({ ...search, term: newSearchTerm })
    }

    const sendSearchRequest = () => {
        if (search.term) {
          handleLoading(true)
          axios
            .get('http://localhost:3001/api/craigslistsearch', { params: { search: search }})
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
            <MaterialSearchbar
                value={search.term}
                onChange={(newSearchTerm) => handleSearchChange(newSearchTerm)}
                onRequestSearch={() => sendSearchRequest(search)}
                onCancelSearch={ () => handleResults({ craigslist: [] })}
            />
    )


}

export default Searchbar