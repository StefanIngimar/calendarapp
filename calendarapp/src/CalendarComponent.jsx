import React,{useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';

function CalendarComponent() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const calendarRef = React.createRef();

  const customButtonAction = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

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

export default CalendarComponent;
