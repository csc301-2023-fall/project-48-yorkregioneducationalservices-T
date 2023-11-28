'use client';
import * as React from 'react';
import TimeTable from "react-timetable-events";
import moment from "moment";

const Event = ({ event, defaultAttributes, classNames }) => {
  const { id, name, startTime, endTime } = event;
  const start = moment(startTime).format("HH:mm");
  const end = moment(endTime).format("HH:mm");

  const openEventModal = () => {
    alert(`${name}\n${start} - ${end}`);
  };
  return (
    React.createElement(
      "div",
      {
        ...defaultAttributes,
        title: name,
        key: id,
        className: `${defaultAttributes.className} event`,
        onClick: openEventModal
      },
      React.createElement("span", { className: classNames.event_info }, name),
      React.createElement(
        "span",
        { className: classNames.event_info },
        `${start} - ${end}`
      )
    )
  );
};


function ScheduleTimetable () {
  return (
    <TimeTable 
      hoursInterval={{ from: 7, to: 19 }}
      events={events}
      style={{ height: '750px', borderRadius: '5px'}}
      renderEvent={Event}
    />
  )
}

export default ScheduleTimetable;

const DUMMY_ACTIVITY_DATA = {
  monday: [
    {
      id: 1,
      name: "Homework",
      startTime: moment("2018-02-23T11:30:00").toDate(),
      endTime: moment("2018-02-23T13:30:00").toDate()
    },

    {
      id: 2,
      name: "Classwork",
      startTime: moment("2018-02-23T09:30:00").toDate(),
      endTime: moment("2018-02-23T11:00:00").toDate()
    },
    {
      id: 3,
      name: "Test",
      startTime: moment("2018-02-22T14:30:00").toDate(),
      endTime: moment("2018-02-22T15:30:00").toDate()
    },
    {
      id: 4,
      name: "Test",
      startTime: moment("2018-02-22T15:30:00").toDate(),
      endTime: moment("2018-02-22T16:30:00").toDate()
    }
  ],
  tuesday: [
    {
      id: 5,
      name: "Homework",
      startTime: moment("2018-02-22T09:30:00").toDate(),
      endTime: moment("2018-02-22T11:30:00").toDate()
    },
    {
      id: 6,
      name: "Classwork",
      startTime: moment("2018-02-23T12:00:00").toDate(),
      endTime: moment("2018-02-23T13:00:00").toDate()
    },
    {
      id: 7,
      name: "Classwork",
      startTime: moment("2018-02-23T13:30:00").toDate(),
      endTime: moment("2018-02-23T14:30:00").toDate()
    },
    {
      id: 8,
      name: "Classwork",
      startTime: moment("2018-02-23T15:30:00").toDate(),
      endTime: moment("2018-02-23T17:30:00").toDate()
    }
  ],
  wednesday: [
    {
      id: 9,
      name: "Classwork",
      startTime: moment("2018-02-23T13:30:00").toDate(),
      endTime: moment("2018-02-23T14:30:00").toDate()
    },
    {
      id: 10,
      name: "Test",
      startTime: moment("2018-02-22T15:30:00").toDate(),
      endTime: moment("2018-02-22T16:30:00").toDate()
    }
  ],
  thursday: [
    {
      id: 11,
      name: "Classwork",
      startTime: moment("2018-02-23T09:30:00").toDate(),
      endTime: moment("2018-02-23T12:30:00").toDate()
    },
    {
      id: 12,
      name: "Test",
      startTime: moment("2018-02-22T14:30:00").toDate(),
      endTime: moment("2018-02-22T18:30:00").toDate()
    }
  ],
  friday: [
    {
      id: 13,
      name: "Classwork",
      startTime: moment("2018-02-23T11:30:00").toDate(),
      endTime: moment("2018-02-23T14:30:00").toDate()
    },
    {
      id: 14,
      name: "Test",
      startTime: moment("2018-02-22T15:30:00").toDate(),
      endTime: moment("2018-02-22T16:30:00").toDate()
    }
  ],
  saturday: [
    {
      id: 15,
      name: "Classwork",
      startTime: moment("2018-02-23T08:30:00").toDate(),
      endTime: moment("2018-02-23T09:30:00").toDate()
    },
    {
      id: 16,
      name: "Test",
      startTime: moment("2018-02-22T16:30:00").toDate(),
      endTime: moment("2018-02-22T17:30:00").toDate()
    }
  ],
  sunday: []
};
