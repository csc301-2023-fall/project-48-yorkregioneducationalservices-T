import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import RoomsEdit from '../modals/roomsEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState, useEffect } from 'react';

const DUMMY_ROOM_DATA = [{
    room_id: 1,
    name: "BA1160",
    activity_ids: [1, 2, 3]
}, {
    room_id: 2,
    name: "BA2230",
    activity_ids: [1]
}, {
    room_id: 3,
    name: "BA2270",
    activity_ids: [3]
}]
/** 
 * Rooms Table that displays:
 * class Room {
   *room_id (string) 		// The auto generated unique ID
    name (string) 		// <UI> The name of the room
    activity_ids (set<string>) 	// <UI> The IDs of the activities that can take place in this room
}
**/
function RoomsTable() {
    const [roomData, setRoomData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        room_id: -1,
        name: null,
        activity_ids: []
    });

    useEffect(() => {
        setRoomData(DUMMY_ROOM_DATA);
    }, []);

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
                    <Button variant="danger" className='action-button'>
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