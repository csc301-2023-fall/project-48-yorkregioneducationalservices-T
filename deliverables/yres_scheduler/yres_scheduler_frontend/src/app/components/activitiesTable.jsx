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
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        activity_id: -1,
        name: null,
        duration: null,
        type: null,
        num_occurences: -1
    });
    const [activityData, setActivityData] = useState([{
        activty_id: 0,
        name: 'Session',
        duration: 100,
        type: 'filler',
        num_occurences: 5
    },
    {
        activty_id: 1,
        name: 'Se',
        duration: 10,
        type: 'filler',
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
    activityData.forEach(item => {
        //state for modal display
        const showEditModal = () => {
            setEditItem(item);
            setShowEdit(true);
        }
        const handleDelete = () =>{
            /**
             * delete logic
             */
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger
                    placement="right-start"
                    overlay={<Tooltip>View/Edit Activity</Tooltip>}
                >
                <Button variant="success" onClick={showEditModal} className='action-button'>
                    <FaPencilAlt />
                </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="right-start"
                    overlay={<Tooltip>Delete Activity</Tooltip>}
                >
                <Button variant="danger" onClick={handleDelete} className='action-button'>
                    <BsTrash />
                </Button>
            </OverlayTrigger>
            </div>
        )
    });
    return (
        <div id='profiles-table'>
            <YresTable keyCol={'activity_id'} data={activityData} columns={columns} disableHover={true}/>
            <ActivityEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
            />
        </div>
    )
}

export default ActivitiesTable;
