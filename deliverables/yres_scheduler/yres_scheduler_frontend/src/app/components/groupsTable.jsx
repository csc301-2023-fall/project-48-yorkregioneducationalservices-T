import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import ActivityEdit from '../modals/activityEdit';

/** 
 * Groups Table that displays:
 * class Group {
   *group_id (string) 		// The auto generated unique ID
    schedule_id (string) 	// The ID of the schedule of this group
    student_ids (set<string>) 	// The IDs of the students that beglong to this group
    counselor_ids (set<string>) // The IDs of the counselors that belongs to this group
    camp_id (string) 		// The ID of the camp this group belongs to
}
* Props: 
        data - a list of group objects with above attributes
**/
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
