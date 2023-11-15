import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Activities
 * 
 * */
function ActivityCreate({show, setShow}) {
    const handleClose = () => setShow(false);
    const handleSubmit = (event) => {
        /**
         * API post request for adding new activity
         */
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        let rooms = event.target[2].value.split(",");
        rooms.forEach((element) => {
            console.log("Room with id".concat(element));
        });
        console.log(event.target[3].value);
        console.log(event.target[4].value);
        handleClose() 
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add new Activity"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                    />
                    </Form.Group> 

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlDuration"
                    >
                    <Form.Label>Duration (hours)</Form.Label>
                    <Form.Control
                        type="number"
                    />
                    </Form.Group>
                    
                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlRoomIDs"
                    >
                    <Form.Label>(Optional) Possible Rooms (comma seperated)</Form.Label>
                    <Form.Control
                        type="text"
                    />
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlType"
                    >
                    <Form.Label>Type of Activity</Form.Label>
                    <Form.Check type="checkbox" label="Filler"/>
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlOccurences"
                    >
                    <Form.Label>Number of Occurences</Form.Label>
                    <Form.Control
                        type="number"
                    />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Create New Activity
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
  }

export default ActivityCreate;
