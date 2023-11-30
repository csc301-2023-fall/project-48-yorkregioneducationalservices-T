import * as React from 'react';
import Schedule from '../../components/scheduleTable'
import Alert from '@/app/components/alert';
import GroupsTable from '../../components/groupsTable'
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import { Button } from 'react-bootstrap';
import { fetchDataPOST } from '@/app/helper';
import { fetchDataGET } from '@/app/helper';
import ScheduleTimetable from '@/app/components/scheduleTimetable';

/** 
 * Schedules page that generates and displays schedule and groups
**/
export default async function Schedules() {
    const schedule_object = await fetchDataGET("/schedule/getCurrent/");
    const room_object = await fetchDataGET("/room/all/");
    const students_object = await fetchDataGET("/student/all/");
    let errorDisplay = <></>;
    let err_message = ""
    if (room_object.error){
        err_message = "Rooms Error: " + room_object.err_message + "\n"
    }
    if (schedule_object.error){
        err_message = err_message + "Schedule Error: " + schedule_object.err_message + "\n"
    }
    if (err_message != ""){
        errorDisplay = <Alert simpleMessage={"Fetching Failed"} complexMessage={err_message}/>
    }
    const rooms = room_object.data.rooms;
    const schedule = schedule_object.data.schedule;
    const students = students_object.data.students;
    return (
        <div className='split-page'>
            <div className='left'>
                <ScheduleTimetable/>
            </div>
            <div className='right'>
            {errorDisplay}
                <Schedule schedule={schedule} rooms={rooms} students={students}/>
            </div>
        </div>
    );
}
