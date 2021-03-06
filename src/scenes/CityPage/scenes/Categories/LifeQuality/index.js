import './styles.css';

import React, { useState, useEffect, useContext } from 'react';
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { fetchLifeQualityScores } from '../../../../../services/api/components/categories/LifeQuality';

import GraphBar from './component/GraphBar';
import { ComparisonContext } from '../../../../../services/context/ComparisonContext';
import { ListLoader } from '../../../../../components/Loading';

const LifeQuality = ({ secondCity }) => {
  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;
    (async function() {
      setScores(await fetchLifeQualityScores(city.urbanScores));
      setIsLoading(false);
    })();
  }, [chosenCity, comparison, secondCity]);


  if (isLoading) {
    return <ListLoader/>
  }
  else if (scores.length) {
    const bars = scores.map(x => (
      <GraphBar color={x.color} key={x.name} name={x.name} score={x.score} />
    ));

    return (
      <>
        <h1 className="quality-header">Life Quality Scores*</h1>
        <div className="quality-data">
          {bars}
          <p>
            *based off of comparison to other cities in Teleport's City Database
          </p>          
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
};
 
export default LifeQuality;