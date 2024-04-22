import axios from "axios";
import {create} from 'zustand';

const url_leagueOfCountry = "www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=";

const useFilterStore = create((set) =>({
    searchInput: "",
    shouldFilter: false,
    showCountriesOptions: false,
    showSportsOptions: false,
    filteredCountries: [],
    filteredLeagues: [],
    filteredSports: [],

    setSearchInput: (searchValue) =>{
        set({searchInput: searchValue});
    },
    setShouldFilter: (filtering) =>{
        set(() => ({
            shouldFilter: filtering ? true:false,
        }));
    },
    toggleCountries: () =>{
        set((state) => ({showCountriesOptions: !state.showCountriesOptions}));
    },
    toggleSports: () =>{
        set((state) => ({showSportsOptions: !state.showCountriesOptions}));
    },

    fetchFilteredLeagues: async (country) => {
        await axios.get(`${url_leagueOfCountry}${country}`).then((response) =>{
            if(response.data.countries !== null || response.data.countries > 0){
                set((state) => ({
                    filteredLeagues:[
                        ...response.data.countries.sort((a,b) =>
                        a.strLeague.localeCompare(b.strLeague)
                        ),
                    ],
                }));
            }
        });
    },

    addFilteredCountry: (country) => {
        set((state) =>({
            filteredSports:[...state.filteredCountries, country],
        }));
    },

    addFilteredSport: (sport) => {
        set((state) =>({
            filteredSports:[...state.filteredSports, sport],
        }));
    },

    clearFilterValues: () =>{
        set(() => ({
            filteredCountries: [],
            filteredLeagues: [],
            filteredSports: [],
            showCountriesOptions: false,
            showSportsOptions: false,
        }));
    },

    removeFilteredCountries: (country) =>{
        set((state) => ({
            filteredCountries: state.filteredCountries.filter((s) => s !== country),
        }));
    },

    clearFilteredCountries: () => {
        set(() => ({
            filteredCountries: [],
            filteredLeagues: [],
        }));
    },

    removeFilteredSport: (sport) => {
        set((state) => ({
            filteredSports: state.filteredSports.filter((s) => s !== sport),
        }));
    },

    clearFilteredSports: () => {
        set(() => ({
            filteredSports: [],
        }));
    },
}));

export default useFilterStore;