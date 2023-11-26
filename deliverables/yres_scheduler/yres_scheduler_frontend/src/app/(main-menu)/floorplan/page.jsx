import * as React from 'react';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import RoomsCreate from '@/app/modals/roomsCreate';
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import Alert from '@/app/components/alert';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;
let errorDisplay = <></>

// GET rooms frontend server side
async function getRooms() {
    try {
        const res = await fetch(`${URI}/rooms/getAllRooms/`, { cache: 'no-store' });
        const data = await res.json();
        return data.rooms;
    } catch (error) {
        errorDisplay = <Alert simpleMessage={error._status_code} complexMessage={error.message}/>
    }
}

// GET activities frontend server side
async function getActivities() {
    try {
        const res = await fetch(`${URI}/activities/getAllActivities/`, { cache: 'no-store' });
        const data = await res.json();
        return data.activities;
    } catch (error) {
        errorDisplay = <Alert simpleMessage={error._status_code} complexMessage={error.message}/>
    }
}

// GET current campus frontend server side
async function getCurrCampus() {
    try {
        const res = await fetch(`${URI}/campus/getAll/`);
        const data = await res.json();
        return data.campuses[0];
    } catch (error) {
        errorDisplay = <Alert simpleMessage={error._status_code} complexMessage={error.message}/>
    }
}

async function Floorplan() {
    const rooms = await getRooms();
    const activities = await getActivities();
    const curr_campus = await getCurrCampus();
    
    return (    
        <div className='split-page'>
            <div className='left'>
                <FloorplanCanvas/>
            </div>
            <div className='right'>
                {errorDisplay}
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

