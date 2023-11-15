'use client'
import * as React from 'react';
import dynamic from 'next/dynamic';
import Button from 'react-bootstrap/Button';
import table from '../../data/example.json'
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
        group_id: 0,
        schedule_id: 0,
        student_ids: [1, 2, 3, 4],
        counselor_ids: [1, 3],
        //scrapped camp so no camp attribute
    },
    {
        group_id: 1,
        schedule_id: 1,
        student_ids: [4, 5, 6, 7],
        counselor_ids: [2, 4],
    }]

    const [data, setData] = React.useState([]);
    const [groupData, setGroupData] = React.useState([]);
    const [error, setError] = React.useState(<></>);
    
    // API request to get Data to fill both tables
    const getTableData = () => {
        simulateNetworkRequest().then(() => {
            setData([]);
        })
    }

    // API request to generate a schedule and update the table
    const generateSchedule = () => {
        if (Array.isArray(groupData) && groupData.length > 0) {
            //error checking needed to check if a group currently exists
            simulateNetworkRequest().then(() => {
                setData(table);
                setError(<></>);
            })
        } else {
            // Error cannot create a schedule with no groups
            setError(<Alert simpleMessage={"Error cannot create a schedule with no groups"} />);
        }
    }

    // Resets table for D2 TA testing. 
    const resetTable = () => {
        setData([]);
    }

    // generates groups
    const generateGroups = () => {
        setGroupData(DUMMY_GROUP_DATA);
    }

    // Resets group table
    const resetGroupTable = () => {
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
                <Button className='right-btn'
                        variant="primary" 
                        onClick={generateGroups}>
                            Generate Groups
                </Button>
                <Button variant="danger" 
                        onClick={resetGroupTable}>
                            Reset Groups
                </Button>
                <GroupsTable data={groupData}/>
                <h3 className='header-title '>Schedule</h3>
                {error}
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