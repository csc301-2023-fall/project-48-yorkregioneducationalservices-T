'use client';
import React, { Component } from "react";
import TimeTable from "react-timetable-events";
import moment from "moment";
import { events } from "./data";

const Hour = ({ hour, defaultAttributes, classNames }) => {
  return (
    <div
      {...defaultAttributes}
      key={hour}
      style={{
        textAlign: "center",
        textDecoration: "underline"
      }}
    >
      {hour}
    </div>
  );
  
};


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
  return (<TimeTable 
    hoursInterval={{ from: 7, to: 19 }}
    events={events}
    style={{ height: '750px', borderRadius: '5px'}}
    // renderHour={Hour}
    renderEvent={Event}
  />)
}

export default ScheduleTimetable;
