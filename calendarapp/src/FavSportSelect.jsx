import React, { useState, useEffect } from 'react';
import { useClerk } from "@clerk/clerk-react";
import { fetchAllSports, fetchLeaguesBySport } from './sportsAPI';

const FavoriteSportsSelection = () => {
  const { user, setUser } = useClerk();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);

  useEffect(() => {
    const loadSports = async () => {
      const sportsData = await fetchAllSports();
      setSports(sportsData.sports);
    };
    loadSports();
  }, []);

  const handleSportSelect = async (sportId) => {
    setSelectedSport(sportId);
    const leaguesData = await fetchLeaguesBySport(sportId);
    setLeagues(leaguesData.leagues);
  };

  const handleLeagueToggle = (leagueId) => {
    setSelectedLeagues(prev => {
      if (prev.includes(leagueId)) {
        return prev.filter(id => id !== leagueId);
      } else {
        return [...prev, leagueId];
      }
    });
  };

  const savePreferences = async () => {
    await saveUserPreferences(user.id, selectedLeagues);
    alert('Preferences saved!');
  };

  return (
    <div>
      <h1>Select Your Favorite Sports and Leagues</h1>
      <select onChange={(e) => handleSportSelect(e.target.value)}>
        {sports.map(sport => (
          <option key={sport.id} value={sport.id}>{sport.name}</option>
        ))}
      </select>
      <div>
        {leagues.map(league => (
          <button key={league.id} onClick={() => handleLeagueToggle(league.id)}>
            {selectedLeagues.includes(league.id) ? 'Unselect' : 'Select'} {league.name}
          </button>
        ))}
      </div>
      <button onClick={savePreferences}>Save Preferences</button>
    </div>
  );
};

export default FavoriteSportsSelection;
