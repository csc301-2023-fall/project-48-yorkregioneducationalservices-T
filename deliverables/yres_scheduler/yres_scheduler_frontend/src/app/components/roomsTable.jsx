'use client';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import RoomsEdit from '../modals/roomsEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import { fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation'
import Alert from 'react-bootstrap/Alert';

/** 
 * Table that allows for the display and deletion of Rooms
 * class Room {
   *room_id (string) 		// The auto generated unique ID
    name (string) 		// <UI> The name of the room
    activity_ids (set<string>) 	// <UI> The IDs of the activities that can take place in this room
}
 * Props: 
        roomData - a list of room objects with above attributes
**/
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
            await fetchDataPOST(
                "/rooms/deleteRoomById/",
                { room_id: id }
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