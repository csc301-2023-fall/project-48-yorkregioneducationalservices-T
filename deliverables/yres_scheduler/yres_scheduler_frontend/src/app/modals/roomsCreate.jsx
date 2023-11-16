'use client';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { process_comma_separated_text } from '../helper';
import { useRouter } from 'next/navigation'
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

/**
 * Create modal for Rooms
 * class Room {
   *room_id (string) 		// The auto generated unique ID
    name (string) 		// <UI> The name of the room
    activity_ids (set<string>) 	// <UI> The IDs of the activities that can take place in this room
}
 * Props: 
     currCampus - The current campus being loaded
 * */
function RoomsCreate({ currCampus }) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleSubmit = e => {
        e.preventDefault();
        const new_room = {
            name: e.target[0].value,
            //activities: process_comma_separated_text(e.target[1].value)
            campus_id: currCampus.campus_id
        }
        fetch(`${URI}/rooms/createRoom/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_room)
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
        handleClose();
    }
  
    return (
        <>
            <Button onClick={() => setShow(true)} 
                    variant="primary">
                Add Room
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Add New Room"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                        />
                        </Form.Group> 
                        <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Activities in this room (comma separated)</Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            placeholder={'Disabled'}
                        />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
  }

export default RoomsCreate;