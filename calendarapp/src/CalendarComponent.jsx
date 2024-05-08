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
  const { isSignedIn, user, isLoaded } = useUser();
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  const apiKey = import.meta.env.VITE_API;
  const calendarRef = React.createRef();

  useEffect(() =>{
    const fetchMatchesByTeam = async() =>{
      if(!user) return;
      const eventsByTeam = await Promise.all(
        user.favTeamsmap(teamId=>
          axios.get(`www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=${teamId}`)
        )
      );

      const formattedEvents = allMatches.flatMap(response => response.data.events.map(event => ({
        title: `${event.strHomeTeam} vs ${event.strAwayTeam}`,
        start: event.dateEvent,
        allDay: true,
        url: event.strThumb,
      })));
      setEvents(formattedEvents);
    };
    fetchMatchesByTeam();
  }, [user]);

  const customButtonAction = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

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
      dateClick={handleDateClick}
    />
    </header>
  );
}

if(!isSignedIn){
  return <div>Not signed in</div>
}
}

export default CalendarComponent;
