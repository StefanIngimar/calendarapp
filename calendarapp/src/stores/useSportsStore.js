import axios from "axios";
import {create} from 'zustand';

const useSportStore = create((set) => ({
    sports: [],
    fetchSports: async (url) => {
        try{
            const response = await axios.get('https://www.thesportsdb.com/api/v1/json/2/all_sports.php');
            if(response.data && response.data.sports){
                const sortedSports = response.data.sports.sort((a,b) => a.strSport.localeCompare(b.str.Sport));
                set({sports:sortedSports});
            } else{
                throw new Error('No sports data found');
            }
        } catch(error){
            console.error('Failed to fetch sports', error);
        }
    },
}));

export default useSportStore;