import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteSportsSelection = () => {
    const[leagues, setLeagues] = useState([]);
    const[error, setError] = useState(null);
    
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
                console.log("API Response:", response.data);
                if (response.data && response.data.leagues) {
                    const footballLeagues = response.data.leagues.filter(league => league.strSport === 'Soccer');
                        setLeagues(footballLeagues);
                } else {
                    setError('No league data found');
                }
            } catch (error) {
                console.error('Failed to fetch leagues', error);
                setError('Failed to fetch leagues');
            }
        };
    
        fetchLeagues();
    }, []);
    
      return (
        <div>
        <form className="max-w-md mx-auto">   
    <label htmlFor="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search sports leagues" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
{error && <p className="text-red-500">{error}</p>}
<div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Choose your favourite football leagues</h2>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {leagues.map((league) => (
            <li key={league.idLeague}>
              <div className="flex items-center gap-x-6">
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{league.strLeague}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
      </div>
      );
    };

export default FavoriteSportsSelection;
