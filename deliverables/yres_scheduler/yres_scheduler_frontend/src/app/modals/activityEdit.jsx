import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Activities
 * 
 * */
function ActivityEdit({item, show, setShow}) {
    const handleClose = () => setShow(false);
    //state for modal values
    const [nameValue, setNameValue] = useState(item.name);
    const nameValueChange = (event) => {
        setNameValue(event.target.value);
    }
    const [durationValue, setDurationValue] = useState(item.duration);
    const durationValueChange = (event) => {
        setDurationValue(event.target.value);
    }
    const [typeValue, setTypeValue] = useState(item.type);
    const typeValueChange = (event) => {
        setTypeValue(event.target.value);
    }
    const [occurencesValue, setOccurencesValue] = useState(item.num_occurences);
    const occurencesValueChange = (event) => {
        setOccurencesValue(event.target.value);
    }
    const handleSubmit = () => {
        item.name = nameValue
        item.duration = durationValue
        item.type = typeValue
        item.num_occurences = occurencesValue
        handleClose() //needs to be before setStudentData
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Activity"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlName"
                    >
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={item.name}
                        value={nameValue} 
                        onChange={nameValueChange} 
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
                        placeholder={item.duration}
                        value={durationValue} 
                        onChange={durationValueChange} 
                    />
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlType"
                    >
                    <Form.Label>Type of Activity</Form.Label>
                    {/* <Form.Control
                        type="number"
                        placeholder={item.type}
                        value={typeValue} 
                        onChange={typeValueChange} 
                    /> */}
                    <Form.Check value="common" type="radio" label="Common" 
                    onChange={typeValueChange} checked={typeValue === "common"}/>
                    <Form.Check value="filler" type="radio" label="Filler" 
                    onChange={typeValueChange} checked={typeValue === "filler"}/>
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlOccurences"
                    >
                    <Form.Label>Number of Occurences</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder={item.num_occurences}
                        value={occurencesValue} 
                        onChange={occurencesValueChange} 
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

export default ActivityEdit;
