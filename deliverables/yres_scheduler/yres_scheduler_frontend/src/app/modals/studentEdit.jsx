import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Students
 * 
 * firstValue, lastValue, ageValue, sexValue, firstValueChange, lastValueChange, ageValueChange, sexValueChange, 
    show, handleClose, handleSubmit
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
    const handleSubmit = () => {
        item.firstname = firstValue
        item.lastname = lastValue
        item.age = ageValue
        item.sex = sexValue
        handleClose() //needs to be before setStateData
        setStateData(stateData)
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
                    controlId="exampleForm.ControlFirstName"
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
                    controlId="exampleForm.ControlLastName"
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
                    controlId="exampleForm.ControlAge"
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
                    controlId="exampleForm.ControlSex"
                    >
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={item.sex}
                        value={sexValue} 
                        onChange={sexValueChange} 
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

