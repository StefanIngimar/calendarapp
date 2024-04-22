import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useSportsStore from './stores/useSportsStore';
import useFilterStore from './stores/useFilterStore';
import useLeaguesStore from './stores/useLeaguesStore';

const FavoriteSportsSelection = () => {
    const [sports, setSports] = useState([]);
    const [error, setError] = useState(null);
    const { fetchLeagues } = useLeaguesStore((state) => ({
        fetchLeagues: state.fetchLeagues,
      }));
      const { fetchSports } = useSportsStore((state) => ({
        fetchSports: state.fetchSports,
      }));
    
    useEffect(() => {
        fetchSports('https://www.thesportsdb.com/api/v1/json/3/all_sports.php');
        fetchLeagues("https://www.thesportsdb.com/api/v1/json/2/all_leagues.php");
    }, [fetchSports, fetchLeagues]);

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
