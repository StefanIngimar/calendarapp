import axios from "axios";
import {create} from 'zustand';

const useSportStore = create((set) => ({
    sports: [],
    fetchSports: async (url) => {
        await axios.get(url).then((response) => {
            set({
                sports: response.data.sports.sort((a,b) => 
                a.strSport.localeCompare(b.strSport)
                ),
            });
        });
    },
}));

export default useSportStore;