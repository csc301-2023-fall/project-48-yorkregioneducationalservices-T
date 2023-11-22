import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
    const handleClose = () => setShow(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        /**
         * API post requests
         * use event.target[0] to index through the fields
         */
        await fetchDataPOST(
            "/rooms/editRoomById/",
            {
                room_id: item.room_id,
                name: e.target[0].value,
                campus_id: item.campus_id
            }
        );
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
                        defaultValue={item.name} 
                        autoFocus
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

export default RoomsEdit;