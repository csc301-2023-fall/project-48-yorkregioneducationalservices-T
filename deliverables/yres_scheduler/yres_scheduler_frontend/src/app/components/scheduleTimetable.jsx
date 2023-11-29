'use client';
import * as React from 'react';
import TimeTable from "react-timetable-events";

function ScheduleTimetable () {
  const hour_header = ({ hour }) => {
    return (
      <div className="timetable-hour" key={hour}>
        {hour}
      </div>
    );
  };

  const event_item = ({ event, defaultAttributes }) => {
    const parseMin = (time) => time.getMinutes().toString().padStart(2, '0');

    const start = `${event.startTime.getHours()}:${parseMin(event.startTime)}`;
    const end = `${event.endTime.getHours()}:${parseMin(event.endTime)}`;

    return (
      <div {...defaultAttributes} key={event.id} className="timetable-event">
        <span className="timetable-event-info">{event.name}</span>
        <span className="timetable-event-info">
          {start} - {end}
        </span>
      </div>
    );
  };

  return (
    <TimeTable 
      hoursInterval={{ from: 7, to: 19 }}
      events={DUMMY_ACTIVITY_DATA}
      style={{ height: '750px', borderRadius: '5px'}}
      renderEvent={event_item}
      renderHour={hour_header}
      headerAttributes={{ className: "timetable-header" }}
    />
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
