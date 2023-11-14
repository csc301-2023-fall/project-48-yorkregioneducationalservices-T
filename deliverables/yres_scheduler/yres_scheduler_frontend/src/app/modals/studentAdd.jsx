import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Addition Modal for Students
 * 
 * */
function StudentAdd({show, setShow, item}) {
    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add a Student"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlFirstName"
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
                    controlId="studentForm.ControlLastName"
                    >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.lastname}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlAge"
                    >
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={item.age}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlSex"
                    >
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.sex}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlFriends"
                    >
                    <Form.Label>Friends (please seperate by commas without spaces)</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.friends_id}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlEnemies"
                    >
                    <Form.Label>Enemies (please seperate by commas without spaces)</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.enemy_id}
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

export default StudentAdd;

