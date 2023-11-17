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
    const handleSubmit = (event) => {
        event.preventDefault()
        const bodyData = new URLSearchParams(
            {
                'firstname': event.target[0].value, 
                'lastname': event.target[1].value, 
            }).toString();

        console.log(bodyData);
        fetch(process.env.NEXT_PUBLIC_BACKEND_URI.concat("/counselors/createCounselor/"), {
            method: "POST", 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData,
        })
        window.location.reload(false);
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add a Counselor"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} >
                    <Form.Group
                    className="mb-3"
                    controlId="counselorForm.ControlFirstName"
                    >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.firstname}
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
                        defaultValue={item.lastname}
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
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
  }

export default CounselorAdd;

