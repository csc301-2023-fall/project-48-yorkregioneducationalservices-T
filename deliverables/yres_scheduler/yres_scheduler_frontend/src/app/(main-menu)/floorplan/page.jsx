import * as React from 'react';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import RoomsCreate from '@/app/modals/roomsCreate';
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import Alert from '@/app/components/alert';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

// GET rooms frontend server side
async function getRooms() {
    try {
        const res = await fetch(`${URI}/rooms/getAllRooms/`, { cache: 'no-store' });
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

// GET activities frontend server side
async function getActivities() {
    try {
        const res = await fetch(`${URI}/activities/getAllActivities/`, { cache: 'no-store' });
        const data = await res.json();
        return {
            error: false,
            activities: data.activities,
            err_message: ""
        };
    } catch (error) {
        return {
            error: true,
            activities: [],
            err_message: error.message
        };
    }
}

// GET current campus frontend server side
async function getCurrCampus() {
    try {
        const res = await fetch(`${URI}/campus/getAll/`);
        const data = await res.json();
        return {
            error: false,
            campuses: data.campuses[0],
            err_message: ""
        };
    } catch (error) {
        return {
            error: true,
            campuses: [],
            err_message: error.message
        };
    }
}

async function Floorplan() {
    const rooms_object = await getRooms();
    const activities_object = await getActivities();
    const curr_campus_object = await getCurrCampus();
    
    let errorDisplay = <></>;
    let err_message = ""
    if (rooms_object.error){
        err_message = "Rooms Error: " + rooms_object.err_message + "\n"
    }
    if (activities_object.error){
        err_message = err_message + "Activities Error: " + activities_object.err_message + "\n"
    }
    if (curr_campus_object.error){
        err_message = err_message + "Campuses Error: " + curr_campus_object.err_message + "\n"
    }
    if (err_message != ""){
        errorDisplay = <Alert simpleMessage={"Fetching Failed"} complexMessage={err_message}/>
    }
    const rooms = rooms_object.rooms
    const activities = activities_object.activities
    const curr_campus = curr_campus_object.campuses
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

