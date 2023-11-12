import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Students
 * 
 * */
function StudentEdit({item, show, setShow, type}) {
    const handleClose = () => setShow(false);
    //state for modal values
    const [firstValue, setFirstValue] = useState(item.firstname);
    const firstValueChange = (event) => {
        setFirstValue(event.target.value);
    }
    const [lastValue, setLastValue] = useState(item.lastname);
    const lastValueChange = (event) => {
        setLastValue(event.target.value);
    }
    
    const [ageValue, setAgeValue] = useState(item.age);
    const ageValueChange = (event) => {
        setAgeValue(event.target.value);
    }
    const [sexValue, setSexValue] = useState(item.sex);
    const sexValueChange = (event) => {
        setSexValue(event.target.value);
    }
    //make the friends_ids array a string
    let string = item.friends_ids.join(',')
    const [friendsValue, setFriendsValue] = useState(string);
    const friendsValueChange = (event) => {
        setFriendsValue(event.target.value);
    }
    string = item.enemy_ids.join(',')
    const [enemiesValue, setEnemiesValue] = useState(string);
    const enemiesValueChange = (event) => {
        setEnemiesValue(event.target.value);
    }
    const handleSubmit = () => {
        item.firstname = firstValue
        item.lastname = lastValue
        item.age = ageValue
        item.sex = sexValue
        //needs error checking to make sure format is correct
        item.friends_ids = friendsValue.split(',')
        item.enemy_ids = enemiesValue.split(',')
        handleClose() //needs to be before setStudentData
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit " + type}</Modal.Title>
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
                        placeholder={item.firstname}
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
                        placeholder={item.lastname}
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
                        placeholder={item.age}
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
                        placeholder={item.sex}
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
                        placeholder={item.friends_id}
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
                        placeholder={item.enemy_id}
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

export default StudentEdit;

