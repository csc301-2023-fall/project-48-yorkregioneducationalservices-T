import * as React from 'react';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import RoomsCreate from '@/app/modals/roomsCreate';
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const DUMMY_ROOM_DATA = [{
    room_id: "C1",	
    name: "Classroom 1",		
    activity_ids: [] //Isn't needed for frontend configuration so wont fill out		
},{
    room_id: "C2",	
    name: "Classroom 2",		
    activity_ids: []		
},{
    room_id: "C3",	
    name: "Classroom 3",		
    activity_ids: []		
},{
    room_id: "G",	
    name: "Gym",		
    activity_ids: []		
}]
const DUMMY_ACTIVITY_DATA = [{
    activity_id: "M1",	
    name: "Math 1",		
    duration: 1,
    type: "filler",
    num_occurences: 1
},{
    activity_id: "S1",	
    name: "Science 1",		
    duration: 1,
    type: "filler",
    num_occurences: 1
},{
    activity_id: "B",	
    name: "Basketball",		
    duration: 1,
    type: "filler",
    num_occurences: 1
},{
    activity_id: "R",	
    name: "Reading",		
    duration: 1,
    type: "filler",
    num_occurences: 1
},{
    activity_id: "V",	
    name: "Volleyball",		
    duration: 1,
    type: "filler",
    num_occurences: 1
}]

async function Floorplan() {
    const rooms = DUMMY_ROOM_DATA;
    const activities = DUMMY_ACTIVITY_DATA;
    const curr_campus = {
        camp_id: null
    }
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

