import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Addition Modal for Students
 * 
 * */
function CounselorAdd({show, setShow, item}) {
    const handleClose = () => setShow(false);
    //state for modal values
    let firstValue = item.firstname;
    const firstValueChange = (event) => {
        firstValue = event.target.value;
    }
    let lastValue = item.lastname;
    const lastValueChange = (event) => {
        lastValue = event.target.value;
    }
    let campusValue = item.campus_id;
    const campusValueChange = (event) => {
        campusValue = event.target.value;
    }
    const handleSubmit = () => {
        item.firstname = firstValue
        item.lastname = lastValue
        item.campus_id = campusValue
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add a Counselor"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                    className="mb-3"
                    controlId="counselorForm.ControlFirstName"
                    >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                    />
                    </Form.Group>   
                    <Form.Group
                    className="mb-3"
                    controlId="counselorForm.ControlLastName"
                    >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="counselorForm.ControlCampus"
                    >
                    <Form.Label>Campus ID</Form.Label>
                    <Form.Control
                        type="number"
                    />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
  }

export default CounselorAdd;

