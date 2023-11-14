import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Counselors
 * 
 * */
function CounselorEdit({item, show, setShow}) {
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
    const [campusValue, setCampusValue] = useState(item.campus_id);
    const campusValueChange = (event) => {
        setCampusValue(event.target.value);
    }
    const handleSubmit = () => {
        item.firstname = firstValue
        item.lastname = lastValue
        item.campus_id = campusValue
        handleClose() //needs to be before setCounselorData
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Counselor"}</Modal.Title>
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
                        placeholder={item.firstname}
                        value={firstValue} 
                        onChange={firstValueChange} 
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
                        placeholder={item.lastname}
                        value={lastValue} 
                        onChange={lastValueChange} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="counselorForm.ControlCampus"
                    >
                    <Form.Label>Campus ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder={item.campus_id}
                        value={campusValue} 
                        onChange={campusValueChange} 
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

export default CounselorEdit;

