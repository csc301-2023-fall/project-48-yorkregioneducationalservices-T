import * as React from 'react'
import Timetable from 'react-timetable-events'

function ScheduleTable() {
    return (
        <Timetable {... prop attributes} />
    )
}

export default ScheduleTable;
export const Example () => <Timetable 
  events={{
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
  }}
  style={{ height: '500px' }}
/>