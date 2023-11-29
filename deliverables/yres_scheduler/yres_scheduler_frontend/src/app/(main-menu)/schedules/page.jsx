import * as React from 'react';
import Schedule from '../../components/scheduleTable'
import GroupsTable from '../../components/groupsTable'
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import { Button } from 'react-bootstrap';
import { fetchDataPOST } from '@/app/helper';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;


// GET groups frontend server side
async function getGroups() {
    const res = await { // fetch(`${URI}/groups/getAllGroups/`, { cache: 'no-store' });
        json: () => {
            return {
                groups: [{
                    group_id: "AX001",
                    schedule_id: 0,
                    student_ids: [1, 2, 3, 4],
                    counselor_ids: [1, 3]
                    //scrapped camp so no camp attribute
                },
                {
                    group_id: "BY002",
                    schedule_id: 1,
                    student_ids: [4, 5, 6, 7],
                    counselor_ids: [2, 4]
                }]
            }
        }
    };
    const data = await res.json();
    return data.groups;
}

// GET schedule frontend server side
async function getSchedule() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/`, { cache: 'no-store' });
    const data = await res.json();
    return data.schedule;
}

async function generateSchedule() {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/generate/`, { cache: 'no-store' });
        const data = await res.json();
        return data;
    }
    catch(err){
        return ["error", err];
    }
}

async function getRooms(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/rooms/getAllRooms/`, { cache: 'no-store' });
    const data = await res.json();
    return data.rooms;
}
/** 
 * Schedules page that generates and displays schedule and groups
**/
export default async function Schedules() {
    const sched = await generateSchedule();
    if(Array.isArray(sched)){
        return (<Alert variant="danger" dismissible>
        <p>{"Error: " + sched[1].message}</p>
        </Alert>)
    }
    const rooms = await getRooms();
    return (
        <div className='split-page'>
            <div className='left'>
                <FloorplanCanvas/>
            </div>
            <div className='right'>
                {/* {errorDisplay} */}
                <Schedule schedule={sched.schedule} rooms={rooms}/>
            </div>
        </div>
    );
}
