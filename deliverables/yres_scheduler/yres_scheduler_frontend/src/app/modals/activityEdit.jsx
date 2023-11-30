import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

/**
 * Editing Modal for Activities
 * class Activity {
   *activity_id (string)	// The auto generated unique ID
    name (string) 		// <UI> The name of the activity
    duration (int) 		// <UI> The number of hours this activity takes
    type (string) 		// <UI> The type of the activity (filler / common)
    num_occurences (int) 	// <UI> The number of times this activity should be scheduled for each group. It is fixed for a common activity, or the minimum number of times for a filler activity.
}
 * Props: 
        show - boolean value determines if modal should be displayed
        setShow - function that toggles show
        item - activity object to be edited
 **/
function ActivityEdit({item, show, setShow }) {
    const router = useRouter();
    let errorDisplay = <></>;
    const handleClose = () => setShow(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            /**
             * API post request for updating activity
             */
            await fetchDataPOST(
                `/activity/${item.activity_id}/edit/`, 
                {
                    name: event.target[0].value,
                    duration: event.target[1].value,
                    type: event.target[3].checked ? "filler" : "common",
                    num_occurences: event.target[4].value,
                    camp_id: item.camp_id,
                    room_ids: "" //process_comma_separated_text(event.target[2].value);
                }
            )
            router.refresh();
            handleClose();
        } catch (err) {
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
                <Alert.Heading>{"Status: " + err.status}</Alert.Heading>
            <p>{"Error: " + err.message}</p>
            </Alert>)
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Activity"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorDisplay}
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.name} 
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
                        defaultValue={item.duration} 
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlRoomIDs"
                    >
                    <Form.Label>(optional) Possible Rooms (comma seperated)</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        placeholder={'Disabled'}
                        defaultValue={''/*item.room_ids.join(",")*/}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlType"
                    >
                    <Form.Label>Type of Activity</Form.Label>
                    <Form.Check type="checkbox" label="Filler" defaultChecked={item.type === "filler"}/>
                    </Form.Group>

                    <Form.Group
                    className="mb-3"
                    controlId="activityForm.ControlOccurences"
                    >
                    <Form.Label>Number of Occurences</Form.Label>
                    <Form.Control
                        type="number"
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
