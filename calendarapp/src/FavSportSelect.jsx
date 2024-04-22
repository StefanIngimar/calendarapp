import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useSportStore from './stores/useSportsStore';
import useFilterStore from './stores/useFilterStore';

const FavoriteSportsSelection = () => {
    const [sports, setSports] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchSports('https://www.thesportsdb.com/api/v1/json/3/all_sports.php');
    }, [fetchSports]);

    const handleSportSelect = (sport) => {
        addFilteredSport(sport);
        fetchFilteredLeagues(sport);
    };
    
      return (
        <div>
            <h1>Select your favourite sports</h1>
                <ul>
                    {sports.map((sport) => (
                        <li key={sport.idSport}>
                            <img src={sport.strSportThumb} alt={sport.strSport} style={{width: 100, height: 100}} />
                            <p>{sport.strSport}</p>
                        </li>
                    ))}
                </ul>
        </div>
      );
    };

export default FavoriteSportsSelection;
