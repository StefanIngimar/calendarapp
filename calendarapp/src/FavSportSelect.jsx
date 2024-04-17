import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteSportsSelection = () => {
    const [sports, setSports] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');

    useEffect(() => {
        const getSports = () => {
            const url = 'https://www.thesportsdb.com/api/v1/json/3/all_sports.php';
            console.log("Fetching sports from:", url);
      
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
              })
              .then(data => {
                console.log("Fetched sports data:", data);
                setSports(data.sports);
              })
              .catch(error => {
                console.error("Failed to fetch sports:", error);
              });
          };
      
          getSports();
        }, []);
    
      return (
        <div>
      <h1>Select Your Favorite Sports</h1>
      {sports.length > 0 ? (
        <ul>
          {sports.map((sport) => (
            <li key={sport.idSport}>
              <img src={sport.strSportThumb} alt={sport.strSport} style={{width: 100, height: 100}} />
              <p>{sport.strSport}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sports found</p>
      )}
    </div>
      );
    };

export default FavoriteSportsSelection;
