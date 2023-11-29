'use client';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { process_comma_separated_text, fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation'
import Alert from 'react-bootstrap/Alert';

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
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetchDataPOST(
                "/room/create/",
                {
                    name: e.target[0].value,
                    campus_id: currCampus.campus_id
                }
            );
            router.refresh();
            handleClose();
        } catch (err) {
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
            <p>{"Error: " + err.message}</p>
            </Alert>)
        }
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
                    {errorDisplay}
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