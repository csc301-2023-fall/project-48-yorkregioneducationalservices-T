'use client';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import RoomsEdit from '../modals/roomsEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { send_post_request } from '../helper';
import { useRouter } from 'next/navigation'
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

function RoomsTable({ roomData }) {
    const router = useRouter();
    const [rooms, setRooms] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        room_id: -1,
        name: null,
        activity_ids: []
    });

    useEffect(() => {
        setRooms(roomData);
    }, [roomData])

    const columns = [{
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'actions',
        text: 'Actions'
    }]

    const deleteRoom = (id) => {
        send_post_request(
            "/rooms/deleteRoomById/",
            { room_id: id }
        );
        router.refresh();
    }

    rooms.forEach(item => {
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
            <YresTable keyCol={'room_id'} data={rooms} columns={columns} disableHover={true}/>
            <RoomsEdit item={editItem} show={showEdit} setShow={setShowEdit}/>
        </>
    )   
}

export default RoomsTable;