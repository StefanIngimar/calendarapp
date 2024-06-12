import React,{useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

function CalendarComponent() {
  const[events, setEvents] = useState([]);
  const { isSignedIn, user } = useUser();
  const apiKey = import.meta.env.VITE_API;
  const calendarRef = React.createRef();

  const fetchMatchesByTeam = async (teamIds) => {
    console.log("Fetching matches for team ID", teamIds);
    if(!teamIds.length){
      console.log("No team IDs available to fetch mathes");
      return;
    }
    try {
      const allMatches = await Promise.all(
        teamIds.map(teamId =>{
          const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=${teamId}`;
          console.log("Fetching from url:", url);
          return axios.get(url);
        })
      );
      console.log("API Responses:", allMatches);
      console.log("All matches fetched", allTeams);
      const formattedEvents = allMatches.flatMap(response => {
        if (response.data.events) {
            return response.data.events.map(event => ({
                title: `${event.strHomeTeam} vs ${event.strAwayTeam}`,
                start: event.dateEvent,
                allDay: true,
                url: event.strThumb,
            }));
        } else {
            console.error("No events found in response:", response);
            return [];
        }
    });
      console.log("Formatted Events:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const triggerEventImport = async () => {
    try {
      const result = await axios.get('/api/import-events');
      console.log(result.data.message);
    } catch (error) {
      console.error('Failed to trigger event import:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user && Array.isArray(user.favouriteTeams)) {
      fetchMatchesByTeam(user.favouriteTeams);
      triggerEventImport();
    }
  }, [isSignedIn, user]);

  const customButtonAction = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  if(isSignedIn){

  return (
    <header style={{ marginTop: '100px'}}>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      ref={calendarRef}
      headerToolbar={{
        left: 'prev,next today customButton',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }}
      customButtons={{
        customButton: {
          text: 'Custom Button',
          click: customButtonAction
        }
      }}
      events={events}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
    />
    </header>
  );
}

if(!isSignedIn){
  return <div>Not signed in</div>
}
}

export default CalendarComponent;
