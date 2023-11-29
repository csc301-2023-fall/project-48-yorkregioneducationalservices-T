'use client';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import RoomsEdit from '../modals/roomsEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import { fetchDataDELETE } from '../helper';
import { useRouter } from 'next/navigation'
import Alert from 'react-bootstrap/Alert';

function RoomsTable({ roomData }) {
    const router = useRouter();
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        room_id: -1,
        name: null,
        activity_ids: []
    });

    const columns = [{
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'actions',
        text: 'Actions'
    }]

    const deleteRoom = async (id) => {
        try {
            await fetchDataDELETE(
                `/room/${id}/`
            );
            router.refresh();
        } catch (err) {
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
            <p>{"Error: " + err.message}</p>
            </Alert>)
        }
    }

    roomData.forEach(item => {
        const showEditModal = () => {
            setEditItem(item);
            setShowEdit(true);
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>View/Edit Room</Tooltip>}>
                    <Button variant="success" onClick={showEditModal} className='action-button'>
                        <FaPencilAlt />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>Delete Room</Tooltip>}>
                    <Button variant="danger" onClick={() => deleteRoom(item.room_id)} className='action-button'>
                        <BsTrash />
                    </Button>
                </OverlayTrigger>
            </div>
        )
    })
    return (
        <>
            {errorDisplay}
            <YresTable keyCol={'room_id'} data={roomData} columns={columns} disableHover={true}/>
            <RoomsEdit item={editItem} show={showEdit} setShow={setShowEdit}/>
        </>
    )   
}

export default RoomsTable;