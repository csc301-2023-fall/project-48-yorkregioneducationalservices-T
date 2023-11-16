'use client';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import RoomsEdit from '../modals/roomsEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

function RoomsTable({ roomData }) {
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        room_id: -1,
        name: null,
        activity_ids: []
    });

    const columns = [{
        dataField: 'room_id',
        text: 'ID'
    },{
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'activity_ids',
        text: 'Activities'
    }, {
        dataField: 'actions',
        text: 'Actions'
    }]

    const deleteRoom = (id) => {
        fetch(`${URI}/rooms/deleteRoomById/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room_id: id })
        })
        .then(res => {
            if (res.status === 200) {
                router.refresh();
                return res.json();
            } else {
                // Show error alert
            }
        }).catch(err => {
            console.log(err);
        });
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
            <YresTable keyCol={'room_id'} data={roomData} columns={columns} disableHover={true}/>
            <RoomsEdit item={editItem} show={showEdit} setShow={setShowEdit}/>
        </>
    )   
}

export default RoomsTable;