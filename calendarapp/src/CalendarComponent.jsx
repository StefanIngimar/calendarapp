import React,{useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import { useUser } from "@clerk/clerk-react";

function CalendarComponent() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const calendarRef = React.createRef();

  const customButtonAction = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const { isSignedIn, user, isLoaded } = useUser();

  if(isSignedIn){

  return (
    <header style={{ marginTop: '100px'}}>
    <FullCalendar
      plugins={[dayGridPlugin]}
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
