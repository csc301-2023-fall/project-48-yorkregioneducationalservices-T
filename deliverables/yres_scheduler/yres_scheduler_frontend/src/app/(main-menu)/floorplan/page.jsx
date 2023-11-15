'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
import { FaPlus } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import RefinedDropdown from '@/app/components/refinedDropDowns';

function Floorplan() {
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
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    return (    
    <div>
        <div id='profiles-header'>
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
            <div className='right-align'>
                <Button onClick={handleShow} variant="primary">Add Activity</Button>
                <ActivityCreate
                    show={show}
                    setShow={setShow}
                />
            </div>
        </div>
        <div className='center-align'>
            <ActivitiesTable/>
        </div>
    </div>
    );
}

export default Floorplan;

