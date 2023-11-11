import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import ActivityEdit from '../modals/activityEdit';

/** 
 * class Activity {
   *activity_id (string)	// The auto generated unique ID
    name (string) 		// <UI> The name of the activity
    duration (int) 		// <UI> The number of hours this activity takes
    type (string) 		// <UI> The type of the activity (filler / common)
    num_occurences (int) 	// <UI> The number of times this activity should be scheduled for each group. It is fixed for a common activity, or the minimum number of times for a filler activity.
}
*/
function ActivitiesTable() {
    // Dummy state data. TODO: Replace with GET data api call
    const [activityData, setActivityData] = useState([{
        activty_id: 0,
        name: 'Cum Session',
        duration: 100,
        type: '12',
        num_occurences: 5
    }]);
    const columns = [{
        dataField: 'activity_id',
        text: 'ID'
    },{
        dataField: 'name',
        text: 'Activity Name'
    },{
        dataField: 'duration',
        text: 'Duration'
    },{
        dataField: 'type',
        text: 'Type'
    },{
        dataField: 'num_occurences',
        text: '# of Occurences'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]
    const rowEvents = {
        onClick: (_, rowIndex) => {
        }
    };
    appendRowActions(activityData);
    return (
        <div id='profiles-table'>
            <YresTable keyCol={'activity_id'} data={activityData} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
        </div>
    )
}

// Helpers

/* 
 * Appends an edit and trash icon action to each row in <data> 
 * Also adds a tooltip for each icon
 */
function appendRowActions(data) {
    const renderEditTooltip = (props) => (
        <Tooltip {...props}>
            View/Edit
        </Tooltip>
    );
    const renderDeleteTooltip = (props) => (
        <Tooltip {...props}>
            Delete
        </Tooltip>
    );

    data.forEach(item => {
        //state for modal display
        const [show, setShow] = useState(false);
        const handleShow = () => setShow(true);
        const handleDelete = () => {
            /**
             * Delete logic for activity...
             */
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ renderEditTooltip }
                >
                    <Button variant="success" onClick={handleShow} className='action-button'>
                        <FaPencilAlt />
                    </Button>
                </OverlayTrigger>
                <ActivityEdit
                    item={item}
                    show={show}
                    setShow={setShow}
                />
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ renderDeleteTooltip }
                >
                    <Button variant="danger" onClick={handleDelete} className='action-button'>
                        <BsTrash />
                    </Button>
                </OverlayTrigger>
            </div>
        )
    });
}

export default ActivitiesTable;
