'use client'
import * as React from 'react';
import dynamic from 'next/dynamic';
import Button from 'react-bootstrap/Button';
import table from '../../data/example.json'
import Schedule from '../../components/scheduleTable'

const FloorPlanCanvas = dynamic(() => import('../../components/floorPlanCanvas'), {
    ssr: false,
});

// Dummy promise to simulate API request. Remove once request implemented
function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}

export default function Schedules() {
    const [data, setData] = React.useState([]);

    // API request to get Data to fill the table
    const getTableData = () => {
        simulateNetworkRequest().then(() => {
            setData([]);
        })
    }

    // API request to generate a schedule and update the table
    const generateSchedule = () => {
        console.log('hi');
        simulateNetworkRequest().then(() => {
            setData(table);
        })
    }

    // Resets table for D2 TA testing. 
    const resetTable = () => {
        setData([]);
    }

    // On component load, get data
    React.useEffect(() => {
        getTableData();
    }, []);

    return (
        <div id='schedules'>
            <FloorPlanCanvas/>
            <div>
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