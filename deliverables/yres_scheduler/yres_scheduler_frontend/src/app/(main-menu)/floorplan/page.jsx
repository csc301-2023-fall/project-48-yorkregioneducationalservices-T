'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ActivitiesTable from '../../components/activitiesTable';
import ActivityCreate from '@/app/modals/activityCreate';
function Floorplan() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    return (    
    <div>
        <div id='profiles-header'>
            <div className='right-align'>
                <Button onClick={handleShow} variant="primary">Add Activity</Button>
                <ActivityCreate
                    show={show}
                    setShow={setShow}
                />
            </div>
        </div>
        <div>
            <ActivitiesTable/>
        </div>
    </div>
    );
}

export default Floorplan;