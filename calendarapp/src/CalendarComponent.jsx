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
    try {
      const allMatches = await Promise.all(
        teamIds.map(teamId =>
          axios.get(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=${teamId}`)
        )
      );
      console.log("API Responses:", allMatches);

      const formattedEvents = allMatches.flatMap(response => {
        console.log("Individual Response Data:", response.data);
        return response.data.events ? response.data.events.map(event => ({
          title: `${event.strHomeTeam} vs ${event.strAwayTeam}`,
          start: event.dateEvent,
          allDay: true,
          url: event.strThumb,
        })) : [];
      });
      console.log("Formatted Events:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  useEffect(() => {
    if (isSignedIn && user && Array.isArray(user.favouriteTeams)) {
      fetchMatchesByTeam(user.favouriteTeams);
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
