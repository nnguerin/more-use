import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Loader from "react-loader-spinner";

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
          {clSearch.results.length>0
          ? <ul>
            {clSearch.results.map( result => {
            return  <li key={result.id}>
                      <img src={result.img} /><br/>
                      <a href={result.link}>Title: {result.title}</a>
                      <p>Price: {result.price}</p>
                      <p>Location: {result.location}</p>
                      <p>Date Posted: {result.date}</p>
                    </li>
            })}
            </ul>
          : <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
