import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Editing Modal for Rooms
 *class Student {
   *student_id (string) 	    // The auto generated unique ID
    firstname (string) 		    // <UI>
    lastname (string) 		    // <UI>
    age (int) 			        // <UI>
    sex (string) 		        // <UI>
    friend_ids (set<string>) 	// The set of student_ids of students that this student prefer to work with
    enemy_ids (set<string>) 	// The set of student_ids of students that this student doesn't want to work with
}
 * Props: 
        show - boolean value determines if modal should be displayed
        setShow - function that toggles show
        item - room object to be edited
 * */
function RoomsEdit({item, show, setShow}) {
    const handleClose = () => setShow(false);
    const handleSubmit = (event) => {
        /**
         * API post requests
         * use event.target[0] to index through the fields
         */
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        handleClose() //needs to be before setStudentData
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Room"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        defaultValue={item.name} 
                        autoFocus
                    />
                    </Form.Group> 
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Activities in this room (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        placeholder={'Disabled'}
                        defaultValue={''/*item.activity_ids.join(",")*/} 
                    />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
  }

export default RoomsEdit;