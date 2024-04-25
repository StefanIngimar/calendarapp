import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarComponent from './CalendarComponent.jsx';
import StarterPage from './StarterPage';
import './index.css'
import TopNavBar from './components/Navbar';
import FavoriteSportsSelection from './FavSportSelect.jsx';

function App(){

  const url_countries = "www.thesportsdb.com/api/v1/json/3/all_countries.php";
  const url_sports = "www.thesportsdb.com/api/v1/json/3/all_sports.php";
  const url_leagues = "www.thesportsdb.com/api/v1/json/3/all_leagues.php";

  return(
    <Router>
      <Routes>
        <Route path='/starter' element={<StarterPage/>} />
        <Route path="/" element={<TopNavBar><CalendarComponent/></TopNavBar>} />
        <Route path='/select' element={<FavoriteSportsSelection/>}/>
      </Routes>
    </Router>
  )
}

export default App;