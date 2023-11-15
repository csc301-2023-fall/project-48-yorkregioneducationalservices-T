'use client';
import * as React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import RoomsTable from '@/app/components/roomsTable';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import FloorPlanCanvas from '@/app/components/floorPlanCanvas';

function Floorplan() {
    const [showActivityAdd, setshowActivityAdd] = useState(false);

    /* Multiple Campus Code
    const [currCampus, setCampus] = React.useState('StGeorge');
    const DUMMY_CAMPUS_DATA = [{
        campus_id: 0,
        name: 'StGeorge',
        camp_ids: [],
        room_ids: [],
    }, {
        campus_id: 1,
        name: 'Mississauga',
        camp_ids: [],
        room_ids: [],
    },{
        campus_id: 2,
        name: 'Scarborough',
        camp_ids: [],
        room_ids: [],
    }]
    const handleSelectType = (e) => {
        setCampus(e);
    }
    */

    return (    
        <div className='split-page'>
            <div className='left'>
                {/* Multiple Campus Code
                    <RefinedDropdown 
                        handleSelect={handleSelectType}
                        displayText={currCampus}
                        groups={DUMMY_CAMPUS_DATA.map(campus => campus.name)}
                    />
                    <div className='left-align'>
                        <Button onClick={handleShow} variant="primary"><FaPlus /> Add a new campus</Button>
                        <Button variant="danger"><BsTrash /> Delete this campus</Button>
                    </div>
                */} 
                <FloorPlanCanvas/>
            </div>
            <div className='right'>
                <div className='right-align'>
                    <h3 className='header-title '>Rooms</h3>
                    <Button 
                            variant="primary">
                        Add Room
                    </Button>
                    <RoomsTable/>
                    <h3 className='header-title '>Activities</h3>
                    <Button onClick={() => setshowActivityAdd(true)} 
                            variant="primary">
                        Add Activity
                    </Button>
                    <ActivityCreate
                        show={showActivityAdd}
                        setShow={setshowActivityAdd}
                    />
                </div>
                <ActivitiesTable/>
            </div>
        </div>
    )
}

export default Floorplan;

