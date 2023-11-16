import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Addition Modal for Students
 * class Student {
   *student_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    age (int) 			// <UI>
    sex (string) 		// <UI>
    friend_ids (set<string>) 	// The set of student_ids of students that this student prefer to work with
    enemy_ids (set<string>) 	// The set of student_ids of students that this student doesn't want to work with
}
 * Props: 
     show - boolean value determines if modal should be displayed
     setShow - function that toggles show
 * */
function RoomsCreate({show, setShow }) {
    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        handleClose()
    }
  
    return (
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
    );
  }

export default RoomsCreate;