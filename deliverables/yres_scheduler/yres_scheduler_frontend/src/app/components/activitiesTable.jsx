'use client';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import ActivityEdit from '../modals/activityEdit';
import { fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';

/** 
 * Activities Table that displays:
 * class Activity {
   *activity_id (string)	// The auto generated unique ID
    name (string) 		// <UI> The name of the activity
    duration (int) 		// <UI> The number of hours this activity takes
    type (string) 		// <UI> The type of the activity (filler / common)
    num_occurences (int) 	// <UI> The number of times this activity should be scheduled for each group. It is fixed for a common activity, or the minimum number of times for a filler activity.
}
*/
function ActivitiesTable({ activityData }) {
    const router = useRouter();
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        activity_id: -1,
        name: null,
        duration: null,
        room_ids: [],
        type: null,
        num_occurences: -1
    });

    const columns = [{
        dataField: 'name',
        text: 'Activity Name'
    },{
        dataField: 'duration',
        text: 'Duration'
    },{
        dataField: 'room_ids',
        text: 'Possible Rooms'
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

    const deleteActivity = async (id) => {
        try {
            await fetchDataDELETE(
                `/activity/${id}/`
            );
            router.refresh();
        } catch (err) {
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
            <p>{"Error: " + err.message}</p>
            </Alert>)
        }
    }

    activityData.forEach(item => {
        //state for modal display
        const showEditModal = () => {
            setEditItem(item);
            setShowEdit(true);
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
                <Button variant="danger" onClick={() => deleteActivity(item.activity_id)} className='action-button'>
                    <BsTrash />
                </Button>
            </OverlayTrigger>
            </div>
        )
    });
    return (
        <>
            {errorDisplay}
            <YresTable keyCol={'activity_id'} data={activityData} columns={columns} disableHover={true}/>
            <ActivityEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
            />
        </>
    )
}

export default ActivitiesTable;
