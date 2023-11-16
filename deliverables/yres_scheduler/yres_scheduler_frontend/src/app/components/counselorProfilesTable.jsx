import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import CounselorEdit from '../modals/counselorEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';

/** 
 * Counselor Table that displays:
*class Counselor {
   *counselor_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    campus_id (string) 		// <UI> The ID of the campus this counselor will teach in
}
 * Props: 
        counselorData - a list of counselor objects with above attributes
**/
function CounselorProfilesTable({ counselorData }) {
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        counselor_id: -1,
        firstname: null,
        lastname: null,
        campus_id: -1
    });

    const columns = [{
        dataField: 'counselor_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'campus_id',
        text: 'Campus'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    counselorData.forEach(item => {
        //creates a modal and button for editing and deleting each counselor
        const showEditModal = () => {
            setEditItem(item);
            setShowEdit(true);
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>View/Edit Counselor</Tooltip>}>
                    <Button variant="success" onClick={showEditModal} className='action-button'>
                        <FaPencilAlt />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>Delete Counselor</Tooltip>}>
                    <Button variant="danger" className='action-button'>
                        <BsTrash />
                    </Button>
                </OverlayTrigger>
            </div>
        )
    })

    return (
        <>
            <YresTable keyCol={'counselor_id'} data={counselorData} columns={columns} disableHover={true}/>
            <CounselorEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
                type={'Counselor'}
            />
        </>
    )   
}

export default CounselorProfilesTable;