import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Activities
 * 
 * */
function ActivityCreate({show, setShow}) {
    const handleClose = () => setShow(false);
    //state for modal values
    const [nameValue, setNameValue] = useState();
    const nameValueChange = (event) => {
        setNameValue(event.target.value);
    }
    const [durationValue, setDurationValue] = useState(1);
    const durationValueChange = (event) => {
        setDurationValue(event.target.value);
    }
    const [typeValue, setTypeValue] = useState("common");
    const typeValueChange = (event) => {
        setTypeValue(event.target.value);
    }
    const [occurencesValue, setOccurencesValue] = useState(1);
    const occurencesValueChange = (event) => {
        setOccurencesValue(event.target.value);
    }
    const handleSubmit = () => {
        /**
         * API post request for adding new activity
         */
        handleClose() 
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add New Activity"}</Modal.Title>
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
                Create Activity
            </Button>
            </Modal.Footer>
        </Modal>
    );
  }

export default ActivityCreate;
