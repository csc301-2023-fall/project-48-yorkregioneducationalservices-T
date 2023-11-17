import * as React from 'react';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import RoomsCreate from '@/app/modals/roomsCreate';
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

// GET rooms frontend server side
async function getRooms() {
    const res = await fetch(`${URI}/rooms/getAllRooms/`, { cache: 'no-store' });
    const data = await res.json();
    return data.rooms;
}

// GET activities frontend server side
async function getActivities() {
    const res = await fetch(`${URI}/activities/getAllActivities/`, { cache: 'no-store' });
    const data = await res.json();
    return data.activities;
}

// GET current campus frontend server side
async function getCurrCampus() {
    const res = await fetch(`${URI}/campus/getAll/`, { cache: 'no-store' });
    const data = await res.json();
    return data.campuses[0];
}

async function Floorplan() {
    const rooms = await getRooms();
    const activities = await getActivities();
    const curr_campus = await getCurrCampus();
    console.log(curr_campus);
    return (    
        <div className='split-page'>
            <div className='left'>
                <FloorplanCanvas/>
            </div>
            <div className='right'>
                <div className='right-align'>
                    <h3 className='header-title'>Rooms</h3>
                    <RoomsCreate currCampus={curr_campus}/>
                    <RoomsTable roomData={rooms}/>
                    <h3 className='header-title'>Activities</h3>
                    <ActivityCreate currCampus={curr_campus}/>
                </div>
                <ActivitiesTable currCampus={curr_campus} activityData={activities}/>
            </div>
        </div>
    )
}

export default Floorplan;

