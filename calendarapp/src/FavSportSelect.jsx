import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteSportsSelection = () => {
    const [sports, setSports] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');

    useEffect(() => {
        axios.get('/api/sports')
            .then(response => setSports(response.data.sports))
            .catch(error => console.error('Error fetching sports:', error));
    }, []);

    const handleSportSelect = (sportId) => {
        setSelectedSport(sportId);
        axios.get(`/api/leagues/${sportId}`)
            .then(response => setLeagues(response.data.leagues))
            .catch(error => console.error('Error fetching leagues:', error));
    };

    return (
        <div>
            <select onChange={(e) => handleSportSelect(e.target.value)}>
                {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
            </select>
            <ul>
                {leagues.map(league => (
                    <li key={league.id}>{league.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteSportsSelection;
