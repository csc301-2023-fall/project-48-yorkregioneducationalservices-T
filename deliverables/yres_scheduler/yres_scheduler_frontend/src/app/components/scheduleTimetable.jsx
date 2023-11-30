'use client';
import * as React from 'react';
import TimeTable from "react-timetable-events";
import RefinedDropdown from './refinedDropDowns';
import { useState } from 'react';

function ScheduleTimetable ({ schedule, rooms, groups }) {
  const [DisplaySched, setDisplaySched] = useState("Group 0");
  const handleSelect = (e) => {
      setDisplaySched(e);
  }
  
  const tempSchedArray = schedule[0][DisplaySched.split(" ")[1]].schedule;
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
    friday: [],
    saturday: [],
    sunday: []
  }

  tempSched.forEach((row) => {
    // Do not show activities with no time
    if (!row.time) {
      return;
    }
    const room = rooms.find((room_i) => room_i.room_id.toString() === row.room_id.toString());
    const event = {
      group: DisplaySched,
      activity: row.activity.name,
      location: room ? room.name : "unknown",
      startTime: new Date(`2018-02-23T${row.time + 9}:00:00`),
      endTime: new Date(`2018-02-23T${row.time + 9 + row.activity.duration}:00:00`)
    }

    switch(row.day) {
      case 0:
        week.monday.push(event)
        break
      case 1:
        week.tuesday.push(event)
        break;
      case 2:
        week.wednesday.push(event)
        break
      case 3:
        week.thursday.push(event)
        break;
      case 4:
        week.friday.push(event)
        break;
      case 5:
        week.saturday.push(event)
        break
      default:
        week.sunday.push(event)
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

    return (
      <div {...defaultAttributes} key={event.id} className="timetable-event">
        <span className="timetable-event-info">{event.activity}</span>
        <span className="timetable-event-info">{event.group}</span>
        <span className="timetable-event-info">{event.location}</span>
        <span className="timetable-event-info">
          {start} - {end}
        </span>
      </div>
    );
  };

  return (
    <div id="schedule-pane">
      <div>
        <RefinedDropdown 
          handleSelect={handleSelect}
          displayText={DisplaySched}
          groups={groups}
        />
      </div>
      <div id="schedule-timetable">
        <TimeTable
          hoursInterval={{ from: 7, to: 19 }}
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

const DUMMY_ACTIVITY_DATA = {
  monday: [
    {
      id: 1,
      name: "Homework",
      startTime: new Date("2018-02-23T11:30:00"),
      endTime: new Date("2018-02-23T13:30:00")
    },

    {
      id: 2,
      name: "Classwork",
      startTime: new Date("2018-02-23T09:30:00"),
      endTime: new Date("2018-02-23T11:00:00")
    },
    {
      id: 3,
      name: "Test",
      startTime: new Date("2018-02-22T14:30:00"),
      endTime: new Date("2018-02-22T15:30:00")
    },
    {
      id: 4,
      name: "Test",
      startTime: new Date("2018-02-22T15:30:00"),
      endTime: new Date("2018-02-22T16:30:00")
    }
  ],
  tuesday: [
    {
      id: 5,
      name: "Homework",
      startTime: new Date("2018-02-22T09:30:00"),
      endTime: new Date("2018-02-22T11:30:00")
    },
    {
      id: 6,
      name: "Classwork",
      startTime: new Date("2018-02-23T12:00:00"),
      endTime: new Date("2018-02-23T13:00:00")
    },
    {
      id: 7,
      name: "Classwork",
      startTime: new Date("2018-02-23T13:30:00"),
      endTime: new Date("2018-02-23T14:30:00")
    },
    {
      id: 8,
      name: "Classwork",
      startTime: new Date("2018-02-23T15:30:00"),
      endTime: new Date("2018-02-23T17:30:00")
    }
  ],
  wednesday: [
    {
      id: 9,
      name: "Classwork",
      startTime: new Date("2018-02-23T13:30:00"),
      endTime: new Date("2018-02-23T14:30:00")
    },
    {
      id: 10,
      name: "Test",
      startTime: new Date("2018-02-22T15:30:00"),
      endTime: new Date("2018-02-22T16:30:00")
    }
  ],
  thursday: [
    {
      id: 11,
      name: "Classwork",
      startTime: new Date("2018-02-23T09:30:00"),
      endTime: new Date("2018-02-23T12:30:00")
    },
    {
      id: 12,
      name: "Test",
      startTime: new Date("2018-02-22T14:30:00"),
      endTime: new Date("2018-02-22T18:30:00")
    }
  ],
  friday: [
    {
      id: 13,
      name: "Classwork",
      startTime: new Date("2018-02-23T11:30:00"),
      endTime: new Date("2018-02-23T14:30:00")
    },
    {
      id: 14,
      name: "Test",
      startTime: new Date("2018-02-22T15:30:00"),
      endTime: new Date("2018-02-22T16:30:00")
    }
  ],
  saturday: [
    {
      id: 15,
      name: "Classwork",
      startTime: new Date("2018-02-23T08:30:00"),
      endTime: new Date("2018-02-23T09:30:00")
    },
    {
      id: 16,
      name: "Test",
      startTime: new Date("2018-02-22T16:30:00"),
      endTime: new Date("2018-02-22T17:30:00")
    }
  ],
  sunday: []
};
