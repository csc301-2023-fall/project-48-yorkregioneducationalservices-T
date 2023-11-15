import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import CounselorEdit from '../modals/counselorEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';

function CounselorProfilesTable({ counselorData, rowEvents }) {
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
            <YresTable keyCol={'counselor_id'} data={counselorData} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
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