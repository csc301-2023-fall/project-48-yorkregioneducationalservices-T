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
    let item_edit = item
    //state for modal values
    const handleSubmit = (event) => {
        /**
         * API post requests
         * use event.target[0] to index through the fields
         */
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        console.log(event.target[2].value);
        console.log(event.target[3].value);
        handleClose() //needs to be before setStudentData
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Activity"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={item.name}
                        defaultValue={item_edit.name} 
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
                        defaultValue={item.duration} 
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
                    <Form.Check type="checkbox" label="Filler" defaultChecked={item.type === "filler"}/>
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlOccurences"
                    >
                    <Form.Label>Number of Occurences</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder={item.num_occurences}
                        defaultValue={item.num_occurences} 
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

export default ActivityEdit;
