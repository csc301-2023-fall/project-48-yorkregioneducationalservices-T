'use client';
import React from 'react';
import Timetable from 'react-timetable-events';

export default function ScheduleTimetable(schedule) {
  const events = {
    monday: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom",
        startTime: new Date("2018-02-23T11:30:00"),
        endTime: new Date("2018-02-23T13:30:00"),
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  };

  const style = { height: '500px' };

  return (
    <Timetable events={events} style={style} />
  );
}
