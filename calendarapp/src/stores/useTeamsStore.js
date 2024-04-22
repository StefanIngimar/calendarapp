import axios from "axios";
import {create} from 'zustand';

const url_teams = "www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=";

const useTeamsStore = create((set) => ({
    teams: [],
    team: {},
    filteredTeams: [],
    teamCompetitions: [],
    fetchTeams: async (leagueName) => {
        await axios.get(`${url_teams}${leagueName}`).then((response) => {
            set({
                teams: response.data.teams.sort((a,b) =>
                a.strLeague.localeCompare(b.strLeague)
                ),
            });
        });
    },
    setTeam: (teamName) => {
        set((state) => ({
            team: state.teams.filter((t) => t.strTeam === teamName)[0],
        }));
    },
    filterTeamByCountry: (country) => {
        set((state) => ({
            filteredTeams: state.teams.filter((teams) => team.strCountry === country),
        }));
    },
}));