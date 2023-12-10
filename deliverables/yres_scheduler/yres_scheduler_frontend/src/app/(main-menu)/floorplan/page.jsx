import * as React from 'react';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import RoomsCreate from '@/app/modals/roomsCreate';
import Alert from '@/app/components/alert';
import { fetchDataGET } from '@/app/helper';
import exampleFloorPlan from '@/app/data/school_floorplan_example.jpg'
import options from '@/app/api/auth/[...nextauth]/options';
import ImageAdd from '@/app/modals/imageAdd';
import { getServerSession } from 'next-auth';

/**
 * FloorPlan page
 * Fetches data through helper function, error checks then creates activities and rooms tables
 **/
async function Floorplan() {
    const session = await getServerSession(options);
    const rooms_object = await fetchDataGET("/room/all/", session.backend_t);
    const activities_object = await fetchDataGET("/activity/all/", session.backend_t);
    const curr_campus_object = await fetchDataGET("/campus/all/", session.backend_t);

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
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URI}/res/floorplan.jpg`} alt="No floorplan found"/>
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
                <ActivityCreate currCampus={curr_campus} rooms={rooms}/>
                <ActivitiesTable currCampus={curr_campus} activityData={activities} rooms={rooms}/>
            </div>
        </div>
    )
}

export default Floorplan;

