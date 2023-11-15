import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import ActivityEdit from '../modals/activityEdit';

/** 
 * 
}
*/
function GroupsTable({data}) {
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
        dataField: 'group_id',
        text: 'ID'
    },{
        dataField: 'schedule_id',
        text: 'Schedule'
    },{
        dataField: 'student_ids',
        text: 'Students'
    },{
        dataField: 'counselor_ids',
        text: 'Counselors'
    }]
    return (
        <div>
            <YresTable keyCol={'activity_id'} data={data} columns={columns} disableHover={true}/>
            <ActivityEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
            />
        </div>
    )
}

export default GroupsTable;
