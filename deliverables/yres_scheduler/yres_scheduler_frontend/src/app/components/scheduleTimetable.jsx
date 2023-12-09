'use client';
import * as React from 'react';
import TimeTable from "react-timetable-events";
import RefinedDropdown from './refinedDropDowns';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from './loading';   


/**
 * Renders a timetable schedule component.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.schedule - The schedule data.
 * @param {Array} props.rooms - The room data.
 * @param {Array} props.groups - The group data.
 * @returns {JSX.Element} The rendered ScheduleTimetable component.
 */
function ScheduleTimetable ({ schedule, rooms, groups }) {
  const [hydrated, setHydrated] = useState(false);
  const MONDAY = 0, TUESDAY = 1, WEDNESDAY = 2, THURSDAY = 3, FRIDAY = 4;
  const BLUE = 0, GREEN = 1, YELLOW = 2, PURPLE = 3, RED = 4, ORANGE = 5, PINK = 6, GREY = 7, BROWN = 8, BLACK = 9;
  const TIME_ADJUSTMENT = 9;
  const [DisplaySched, setDisplaySched] = useState("Group 0");
  const handleSelect = (e) => {
      setDisplaySched(e);
  }

  useEffect(() => {
		setHydrated(true);
	}, [])

  let tempSchedArray;
  if (schedule[0][DisplaySched.split(" ")[1]]?.schedule === undefined) {
    tempSchedArray = [];
  } else {
    tempSchedArray = schedule[0][DisplaySched.split(" ")[1]].schedule;
  }
  let tempSched = [];
  tempSchedArray.forEach((day) => {
      tempSched.push(...day);
  })

  tempSched.sort((a, b) => (a.day*8 + a.time - b.day*8-b.time));

  const week = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  }
  let colour_index = 0;
  const timetable_colours = new Map();
  tempSched.forEach((row) => {
    const room = rooms.find((room_i) => room_i.room_id.toString() === row.room_id.toString());
    let start_time = row.time + TIME_ADJUSTMENT;
    if (start_time < 10) {
      start_time = `0${start_time}`;
    }
    let end_time = row.time + TIME_ADJUSTMENT + row.activity.duration;
    if (end_time < 10) {
      end_time = `0${end_time}`;
    }

    if (!timetable_colours.has(row.activity.name)) {
      timetable_colours.set(row.activity.name, colour_index);
      colour_index++;
    }

    const event = {
      group: DisplaySched,
      activity: row.activity.name,
      location: "Room ".concat(room ? room.name : "unknown"),
      startTime: new Date(`2018-02-23T${start_time}:00:00`),
      endTime: new Date(`2018-02-23T${end_time}:00:00`)
    }

    switch(row.day) {
      case MONDAY:
        week.monday.push(event)
        break
      case TUESDAY:
        week.tuesday.push(event)
        break;
      case WEDNESDAY:
        week.wednesday.push(event)
        break
      case THURSDAY:
        week.thursday.push(event)
        break;
      case FRIDAY:
        week.friday.push(event)
        break;
    }
  });

  // Component prototype for hour headers on left
  const hour_header = ({ hour, ...otherProperties }) => {
    return (
      <div {...otherProperties} className="timetable-hour" key={hour}>
        {hour}
      </div>
    );
  };

  // Component prototype for each event item in the timetable
  const event_item = ({ event, defaultAttributes }) => {
    const parseMin = (time) => time.getMinutes().toString().padStart(2, '0');

    const start = `${event.startTime.getHours()}:${parseMin(event.startTime)}`;
    const end = `${event.endTime.getHours()}:${parseMin(event.endTime)}`;

    let colour;

    switch (timetable_colours.get(event.activity)) {
      case BLUE:
        colour = "blue";
        break;
      case GREEN:
        colour = "green";
        break;
      case YELLOW:
        colour = "yellow";
        break;
      case PURPLE:
        colour = "purple";
        break;
      case RED:
        colour = "red";
        break;
      case ORANGE:
        colour = "orange";
        break;
      case PINK:
        colour = "pink";
        break;
      case GREY:
        colour = "grey";
        break;
      case BROWN:
        colour = "brown";
        break;
      default:
        colour = "white";
    }
  
    return (
      <div {...defaultAttributes} key={event.id} className={`timetable-event ${colour}`}>
        <span className="timetable-event-info">{event.activity}</span>
        <span className="timetable-event-info">{event.group}</span>
        <span className="timetable-event-info">{event.location}</span>
        <span className="timetable-event-info">
          {start} - {end}
        </span>
      </div>
    );
  };


  // Download as PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('schedule-timetable');
    
    if (element) {
      import('html2pdf.js').then(({ default: html2pdf }) => {
        html2pdf().from(element).save('ScheduleTimetable.pdf');
      });
    }
  };

  if (!hydrated) {
    return <Loading />;
  }

  return (
    <div id="schedule-pane">
      <div style={{ display: 'flex' }}>
        <Button className={"btn btn-primary"} onClick={handleDownloadPDF}> Download as PDF</Button>
        <div style={{ marginTop: '20px' }}> 
          <RefinedDropdown 
            handleSelect={handleSelect}
            displayText={DisplaySched}
            groups={groups}
          />
        </div>
      </div>
      <div id="schedule-timetable">
        <TimeTable
          hoursInterval={{ from: 8, to: 18 }}
          events={week}
          renderEvent={event_item}
          renderHour={hour_header}
          headerAttributes={{ className: "timetable-header" }}
          style={{ height: "85vh" }}
        />
      </div>
    </div>
  )
}

export default ScheduleTimetable;
