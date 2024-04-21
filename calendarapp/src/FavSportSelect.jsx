import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteSportsSelection = () => {
    const [sports, setSports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSports = async () => {
          const url = 'https://www.thesportsdb.com/api/v1/json/3/all_sports.php';
          console.log("Fetching sports from:", url);
          try {
            const response = await axios.get(url);
            console.log("Fetched sports data:", response.data);
            if (response.data && response.data.sports) {
                setSports(response.data.sports);
              } else{
                  throw new Error("No sports data found")
              }
          } catch (error) {
            console.error("Failed to fetch sports:", error);
            setError(error.message);
          }
        };
    
        getSports();
      }, []);
    
      return (
        <div>
            <h1>Select your favourite sports</h1>
            {error ? (
                <p>Error: {error}</p>
            ):sports.length > 0 ? (
                <ul>
                    {sports.map((sport) => (
                        <li key={sport.idSport}>
                            <img src={sport.strSportThumb} alt={sport.strSport} style={{width: 100, height: 100}} />
                            <p>{sport.strSport}</p>
                            <p>{sport.strSportDescription}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading sports...</p>
            )}
        </div>
      );
    };

export default FavoriteSportsSelection;
