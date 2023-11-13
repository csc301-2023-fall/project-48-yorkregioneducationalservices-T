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
    //state for modal values
    let firstValue = item.firstname;
    const firstValueChange = (event) => {
        firstValue = event.target.value;
    }
    let lastValue = item.lastname;
    const lastValueChange = (event) => {
        lastValue = event.target.value;
    }
    let ageValue = item.age;
    const ageValueChange = (event) => {
        ageValue = event.target.value;
    }
    let sexValue = item.sex;
    const sexValueChange = (event) => {
        sexValue = event.target.value;
    }
    let friendsValue = item.friends_ids;
    const friendsValueChange = (event) => {
        friendsValue = event.target.value;
    }
    let enemiesValue = item.enemy_ids;
    const enemiesValueChange = (event) => {
        enemiesValue = event.target.value;
    }
    const handleSubmit = () => {
        item.firstname = firstValue
        item.lastname = lastValue
        item.age = ageValue
        item.sex = sexValue
        item.friends_ids = friendsValue.split(',')
        item.enemy_ids = enemiesValue.split(',')
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
                        value={firstValue} 
                        onChange={firstValueChange} 
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
                        value={lastValue} 
                        onChange={lastValueChange} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlAge"
                    >
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        value={ageValue} 
                        onChange={ageValueChange} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlSex"
                    >
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        type="text"
                        value={sexValue} 
                        onChange={sexValueChange} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlFriends"
                    >
                    <Form.Label>Friends (please seperate by commas without spaces)</Form.Label>
                    <Form.Control
                        type="text"
                        value={friendsValue} 
                        onChange={friendsValueChange} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlEnemies"
                    >
                    <Form.Label>Enemies (please seperate by commas without spaces)</Form.Label>
                    <Form.Control
                        type="text"
                        value={enemiesValue} 
                        onChange={enemiesValueChange} 
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

