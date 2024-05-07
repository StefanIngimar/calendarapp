import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FavoriteSportsSelection = () => {
    const[countries, setCountries] = useState([]);
    const[selectedCountries, setSelectedCountries] = useState([]);
    const[leagues, setLeagues] = useState([]);
    const[selectedLeagues, setSelectedLeagues] = useState([]);
    const[teams, setTeams] = useState([]);
    const[selectedTeams, setSelectedTeams] = useState([]);
    const[error, setError] = useState(null);
    const[step, setStep] = useState(1);
    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_API;
    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/${apiKey}/all_countries.php`);
                if (response.data && response.data.countries) {
                        setCountries(response.data.countries);
                } else {
                    setError('No country data found');
                }
            } catch (error) {
                console.error('Failed to fetch countries', error);
                setError('Failed to fetch countries');
            }
        };
    
        fetchCountries();
    }, []);

    useEffect(() =>{
        const fetchLeagues = async() => {
            if(selectedCountries.length > 0){
                try{
                    const promises = selectedCountries.map(country =>
                        axios.get(`https://www.thesportsdb.com/api/v1/json/${apiKey}/search_all_leagues.php?c=${country}`)
                    );
                    const responses = await Promise.all(promises);
                    console.log("Raw API responses:", responses);
            
                    const allLeagues = responses.flatMap(response => response.data.countries || []);
                    setLeagues(allLeagues);
                    console.log("All leagues extracted:", allLeagues);
                } catch(error){
                    console.error('Failed to fetch leagues', error);
                    setError('Failed to fetch leagues');
                }
            };
        }
        if(step === 2){
            fetchLeagues();
        }
    }, [selectedCountries, step, apiKey]);
    console.log("Rendering leagues:", leagues);

    useEffect(() => {
        const fetchTeams = async() => {
            if (selectedLeagues.length > 0) {
                try{
                    const promises = selectedLeagues.map(leagueName =>
                        axios.get(`https://www.thesportsdb.com/api/v1/json/${apiKey}/search_all_teams.php?l=${encodeURIComponent(leagueName)}`));
                        const responses = await Promise.all(promises);
                        console.log("API Full Responses:", responses.map(r => r.data));
                        const allTeams = responses.flatMap(response => response.data.teams || []);
                        if(allTeams.length > 0){
                            setTeams(allTeams);
                        } else{
                            console.log('No teams data found');
                            setError('No teams data found');
                        }
                        console.log("Extracted Teams:", allTeams);
                } catch(error){
                    console.error('Failed to fetch teams', error);
                    setError("Failed to fetch leagues");
                }
            }
        };
            fetchTeams();
        
    },  [selectedLeagues, apiKey]);

    const handleCountrySelection = (countryName) => {
        setSelectedCountries(prev =>{
            if(prev.includes(countryName)){
                return prev.filter(name => name !== countryName);
            } else{
                return [...prev, countryName];
            }
        });
    };

    const handleLeagueSelection = (leagueId) => {
        setSelectedLeagues(prev => {
            if (prev.includes(leagueId)) {
                return prev.filter(id => id !== leagueId);
            } else {
                return [...prev, leagueId];
            }
        });
    };

    const savePreferences = async () =>{
        try{
            const response = await axios.post('/api/savePreferences', {
                countries: selectedCountries,
                leagues: selectedLeagues,
                teams: selectedTeams
            });
            console.log('preferences saved:', response.data);
            navigate('/');
        } catch(error){
            console.error('Failed to save preferences', error);
        }
    };
    
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
        <div className="max-w-md mx-auto">
        {step === 1 && (
                <div>
                    <h2>Select Countries</h2>
                    {countries.map((country) => (
                        <div key={country.name_en}>
                            <input
                                type="checkbox"
                                id={`country-${country.name_en}`}
                                checked={selectedCountries.includes(country.name_en)}
                                onChange={() => handleCountrySelection(country.name_en)}
                            />
                            <label htmlFor={`country-${country.name_en}`}>{country.name_en}</label>
                        </div>
                    ))}
                    <button onClick={() => setStep(2)}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Select Leagues</h2>
                    {leagues.length > 0 ? (
                    leagues.map(league => (
                        <div key={league.idLeague}>
                            <label htmlFor={`league-${league.idLeague}`}>{league.strLeague}</label>
                            <input
                                type="checkbox"
                                id={`league-${league.idLeague}`}
                                checked={selectedLeagues.includes(league.idLeague)}
                                onChange={() => handleLeagueSelection(league.idLeague)}
                            />
                        </div>
                    ))
                    ) : (
                        <p>No leagues found</p>
                    )}
                    <button onClick={() => setStep(3)}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Select Teams</h2>
                    {teams.length > 0 ? (
                        teams.map(team => {
                            <div key={team.idTeam}>
                                <h3>{team.strTeam}</h3>
                                <img src={team.strStadiumThumb} alt={`${team.strTeam} Stadium`}/>
                                <p>{team.strStadiumDescription}</p>
                            </div>
                        })
                    ) : (
                        <p>No teams found</p>
                    )}
                    <button onClick={savePreferences}>Save Preferences</button>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
        </div>
        </div>
        </div>
      );
    };

export default FavoriteSportsSelection;
