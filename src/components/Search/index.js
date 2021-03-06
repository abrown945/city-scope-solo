import React, { useState, useContext } from 'react'; 
import { getCityBySearchTerm } from '../../services/api/components/CityFromSearch';

import './styles.css'
import { ChosenCityContext } from '../../services/context/ChosenCityContext';

import { withRouter } from 'react-router-dom';

const SearchBar = withRouter(({history}) => {

    const [term, setTerm] = useState('');
    const { setChosenCity } = useContext(ChosenCityContext);

    const onInputChange = e => {
        setTerm(e.target.value);
    }

    const onTermSubmit = e => {
      e.preventDefault();

      const setCity = async term => {
        setChosenCity(await getCityBySearchTerm(term));
        history.push("/citypage");
      };

      setCity(term);
    };

    return (
      <form onSubmit={onTermSubmit}>
        <input
          placeholder="Search Your City..."
          value={term}
          onChange={onInputChange}
        />
      </form>
    ); 
})
 
export default SearchBar;