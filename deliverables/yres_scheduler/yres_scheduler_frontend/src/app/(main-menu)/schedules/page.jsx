import * as React from 'react';
import Schedule from '../../components/scheduleTable'
import Alert from '@/app/components/alert';
import GroupsTable from '../../components/groupsTable'
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import { Button } from 'react-bootstrap';
import { fetchDataPOST } from '@/app/helper';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;


async function getSchedule() {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/getCurrent/`, { cache: 'no-store' });
        const data = await res.json();
        if(data.error){
            throw data;
        }
        return {
            error: false,
            schedule: data.schedule,
            err_message: ""
        };
    } catch (error) {
        return {
            error: true,
            schedule: "nil",
            err_message: error.message
        };
    }
}

async function getRooms(){
    try {
        const res = await fetch(`${URI}/room/all/`, { cache: 'no-store' });
        const data = await res.json();
        return {
            error: false,
            rooms: data.rooms,
            err_message: ""
        };
    } catch (error) {
        return {
            error: true,
            rooms: [],
            err_message: error.message
        };
    }
}
/** 
 * Schedules page that generates and displays schedule and groups
**/
export default async function Schedules() {
    const schedule_object = await getSchedule();
    const room_object = await getRooms();
    
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
    const rooms = room_object.rooms;
    const schedule = schedule_object.schedule

    return (
        <div className='split-page'>
            <div className='left'>
                <FloorplanCanvas/>
            </div>
            <div className='right'>
            {errorDisplay}
                <Schedule schedule={schedule} rooms={rooms}/>
            </div>
        </div>
    );
}
