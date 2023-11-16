'use client'
import * as React from 'react';
import dynamic from 'next/dynamic';
import Button from 'react-bootstrap/Button';
import exampleTable from '../../data/example.json'
import Schedule from '../../components/scheduleTable'
import GroupsTable from '../../components/groupsTable'
import Alert from '@/app/components/alert';

const FloorPlanCanvas = dynamic(() => import('../../components/floorPlanCanvas'), {
    ssr: false,
});

// Dummy promise to simulate API request. Remove once request implemented
function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}

export default function Schedules() {
    const DUMMY_GROUP_DATA = [{
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
    const zeroBlocks = [
    {
        block_id: 5767867,		
        schedule_id: 0,	
        room_id: "C1", 		
        activity_id: "M1", 	
        start_time: "9:00",	
        end_time: "10:00" 	
    },{
        block_id: 768977,		
        schedule_id: 0,	
        room_id: "C2", 		
        activity_id: "S1", 	
        start_time: "10:00",	
        end_time: "11:00" 	
    },{
        block_id: 234743,		
        schedule_id: 0,	
        room_id: "G", 		
        activity_id: "B", 	
        start_time: "11:00",	
        end_time: "12:00" 	
    }]
    const oneBlocks = [
    {
        block_id: 907764,		
        schedule_id: 1,	
        room_id: "C2", 		
        activity_id: "R", 	
        start_time: "9:00",	
        end_time: "10:00" 	
    },{
        block_id: 457854,		
        schedule_id: 1,	
        room_id: "G", 		
        activity_id: "V", 	
        start_time: "10:00",	
        end_time: "11:00" 	
    },{
        block_id: 124245,		
        schedule_id: 1,	
        room_id: "C3", 		
        activity_id: "S1", 	
        start_time: "11:00",	
        end_time: "12:00" 	
    }]
    const DUMMY_SCHEDULE_DATA = [{
        schedule_id: 0,	
        group_id: "AX001",		
        blocks: zeroBlocks,		
        start_time: "9:00", 	
        end_time: "12:00" 
    },{
        schedule_id: 1,	
        group_id: "BY002",		
        blocks: oneBlocks,		
        start_time: "9:00", 	
        end_time: "12:00"
    }]
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
    const [data, setData] = React.useState([]);
    const [groupData, setGroupData] = React.useState([]);
    
    // API request to get Data to fill both tables
    const getTableData = () => {
        simulateNetworkRequest().then(() => {
            setData([]);
        })
    }

    // API request to generate a schedule and update the table
    const generateSchedule = () => {
        //API call to generate the schedule
        //API call to Schedule
        const schedules = DUMMY_SCHEDULE_DATA
        //API call to Activity
        const activities = DUMMY_ACTIVITY_DATA
        //API call to Group
        const groups = DUMMY_GROUP_DATA
        //API call to Room
        const rooms = DUMMY_ROOM_DATA
        //Creating objects that are usable by the table
        let table = []
        schedules.forEach(schedule => {
            schedule.blocks.forEach(block =>{
                const tableObject = {};
                tableObject.classNum = schedule.group_id;
                let name = "NAME FAILED"; //could also directly asign tableObject.name in the for loop
                activities.forEach(activity => {
                    if(activity.activity_id == block.activity_id){
                        name = activity.name
                    }
                })
                tableObject.name = name;
                tableObject.time = block.start_time + " - " + block.end_time; //adjust based on actual API call returned format
                let location = "LOCATION FAILED";
                rooms.forEach(room => {
                    if(room.room_id == block.room_id){
                        location = room.name
                    }
                })
                tableObject.location = location;
                table.push(tableObject)
            })
        });
        simulateNetworkRequest().then(() => {
            setData(table);
            setGroupData(groups);
        })
        
    }

    // Resets table for D2 TA testing. 
    const resetTable = () => {
        setData([]);
        setGroupData([]);
    }
    
    // On component load, get data
    React.useEffect(() => {
        getTableData();
    }, []);

    return (
        <div className='split-page'>
            <div className='left'>
                <FloorPlanCanvas/>
            </div>
            <div className='right'>
                <h3 className='header-title '>Groups</h3>
                <GroupsTable data={groupData}/>
                <h3 className='header-title '>Schedule</h3>
                <Schedule schedule={data}/>
                <Button className='right-btn'
                        variant="primary" 
                        onClick={generateSchedule}>
                            Generate Schedule
                </Button>
                <Button variant="danger" 
                        onClick={resetTable}>
                            Reset Schedule 
                </Button>
            </div>
        </div>
    );
}