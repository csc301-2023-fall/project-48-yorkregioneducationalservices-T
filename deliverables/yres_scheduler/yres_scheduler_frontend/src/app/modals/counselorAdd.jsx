import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { send_post_request } from '../helper';
import { useRouter } from 'next/navigation';

/**
 * Addition Modal for Counselors
 *class Counselor {
   *counselor_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    campus_id (string) 		// <UI> The ID of the campus this counselor will teach in
}
 * Props: 
        show - boolean value determines if modal should be displayed
        setShow - function that toggles show
        item - counselor object to be added (blank)
 * */
function CounselorAdd({show, setShow, item}) {
    const router = useRouter();
    const handleClose = () => setShow(false);
    const handleSubmit = (event) => {
        event.preventDefault()
        send_post_request(
            "/counselors/createCounselor/",
            {
                firstname: event.target[0].value,
                lastname: event.target[1].value
            }
        );
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add a Counselor"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit} >
                    <Form.Group
                    className="mb-3"
                    controlId="counselorForm.ControlFirstName"
                    >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.firstname}
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
                        defaultValue={item.lastname}
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

export default CounselorAdd;

