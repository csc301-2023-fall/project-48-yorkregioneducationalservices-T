import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { validRelationship, process_comma_separated_text, send_post_request  } from '@/app/helper';
import { useRouter } from 'next/navigation';

/**
 * Addition Modal for Students
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
        item - student object to be added (blank)
        students - a list of all student objects with attributes described above
 * */
function StudentAdd({show, setShow, item, students}) {
    const [error, setError] = useState(<></>);
    const router = useRouter();
    const handleClose = () => {
        setError(<></>)
        setShow(false)
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        let friends = event.target[5].value;
        let enemies = event.target[6].value;
        if (validRelationship(friends, "Friends", setError, students) && validRelationship(enemies, "Enemies", setError, students)){
            send_post_request(
                "/students/createStudent/", 
                {
                    student_ui_id: event.target[0].value, 
                    firstname: event.target[1].value, 
                    lastname: event.target[2].value, 
                    age: event.target[3].value, 
                    sex: event.target[4].value,
                    friend_ids: process_comma_separated_text(event.target[5].value),
                    enemy_ids: process_comma_separated_text(event.target[6].value),
                }
            )
            handleClose()
        }
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add a Student"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlId"
                    >
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item._student_ui_id}
                        autoFocus
                    />
                    </Form.Group> 
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlFirstName"
                    >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.firstname}
                    />
                    </Form.Group>   
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlLastName"
                    >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.lastname}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlAge"
                    >
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={item.age}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlSex"
                    >
                    <Form.Label>Sex</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.sex}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlFriends"
                    >
                    <Form.Label>Friend IDs (please seperate by commas)</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.friends_id}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlEnemies"
                    >
                    <Form.Label>Enemie IDs (please seperate by commas)</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.enemy_id}
                    />
                    </Form.Group>
                    {error}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
  
}

export default StudentAdd;

