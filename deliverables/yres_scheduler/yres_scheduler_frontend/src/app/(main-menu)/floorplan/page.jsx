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

    return (    
        <div id="floorplan">
            <FloorPlanCanvas/>
            <div id='floor-manger'>
                <div className='right-align'>
                    <Button 
                            variant="primary">
                        Add Room
                    </Button>
                    <RoomsTable/>
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
    );
}

export default Floorplan;