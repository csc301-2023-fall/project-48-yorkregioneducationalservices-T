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
    const [firstValue, setFirstValue] = useState();
    const firstValueChange = (event) => {
        setFirstValue(event.target.value);
    }
    const [lastValue, setLastValue] = useState();
    const lastValueChange = (event) => {
        setLastValue(event.target.value);
    }
    const [ageValue, setAgeValue] = useState();
    const ageValueChange = (event) => {
        setAgeValue(event.target.value);
    }
    const [sexValue, setSexValue] = useState();
    const sexValueChange = (event) => {
        setSexValue(event.target.value);
    }
    const [friendsValue, setFriendsValue] = useState();
    const friendsValueChange = (event) => {
        setFriendsValue(event.target.value);
    }
    const [enemiesValue, setEnemiesValue] = useState();
    const enemiesValueChange = (event) => {
        setEnemiesValue(event.target.value);
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

