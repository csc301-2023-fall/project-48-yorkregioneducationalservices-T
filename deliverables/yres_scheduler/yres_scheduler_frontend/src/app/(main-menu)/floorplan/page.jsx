import * as React from 'react';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import RoomsCreate from '@/app/modals/roomsCreate';
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import Alert from '@/app/components/alert';
import { fetchDataGET, fetchDataPOST } from '@/app/helper';
import exampleFloorPlan from '@/app/data/school_floorplan_example.jpg'
import ImageAdd from '@/app/modals/imageAdd';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

/**
 * GET rooms frontend server side
 * returns object with boolean to indicate error, error message and rooms list if sucessful
 **/
async function getRooms() {
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
 * GET activities frontend server side
 * returns object with boolean to indicate error, error message and activites list if sucessful
 **/
async function getActivities() {
    try {
        const res = await fetch(`${URI}/activity/all/`, { cache: 'no-store' });
        const data = await res.json();
        return {
            error: false,
            activities: data.activities,
            err_message: ""
        };
    } catch (error) {
        const promiseRes = await response.text()
        const jsonErrMsg = JSON.parse(promiseRes);
        throw new Error(`${response.status} ${response.statusText} Error: ${jsonErrMsg.message}`)
    }
}

/**
 * GET campuses frontend server side
 * returns object with boolean to indicate error, error message and campus list if sucessful
 **/
async function getCurrCampus() {
    try {
        const res = await fetch(`${URI}/campus/all/`);
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

/**
 * FloorPlan page
 * Fetches data through helper function, error checks then creates activities and rooms tables
 **/
async function Floorplan() {
    const rooms_object = await fetchDataGET("/room/all/");
    const activities_object = await fetchDataGET("/activity/all/");
    const curr_campus_object = await fetchDataGET("/campus/all/");

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
    const rooms = !rooms_object.data.rooms ? [] : rooms_object.data.rooms
    const activities = !activities_object.data.activities ? [] : activities_object.data.activities
    const curr_campus = curr_campus_object.data.campuses
    return (    
        <div className='split-page'>
            <div className='left'>
                <ImageAdd />
                <div className='floorplan-box'>
                    <img src={exampleFloorPlan.src} alt="No floorplan found"/>
                </div>
            </div>
            <div className='right'>
                {errorDisplay}
                <div className='right-align'>
                    <h3 className='header-title'>Rooms</h3>
                    <RoomsCreate currCampus={curr_campus}/>
                    <RoomsTable roomData={rooms}/>
                    <h3 className='header-title'>Activities</h3>
                    
                </div>
                <ActivityCreate currCampus={curr_campus}/>
                <ActivitiesTable currCampus={curr_campus} activityData={activities}/>
            </div>
        </div>
    )
}

export default Floorplan;

