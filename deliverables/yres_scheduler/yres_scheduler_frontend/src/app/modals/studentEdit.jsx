import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { validRelationship } from '@/app/helper';

/**
 * Editing Modal for Students
 * Props: 
        show - boolean value determines if modal should be displayed
        setShow - function that toggles show
        item - student object to be edited
        students - a list of all student objects with attributes described above
 * */
function StudentEdit({item, show, setShow, students}) {
    const [error, setError] = useState(<></>);
    const handleClose = () => {
        setError(<></>)
        setShow(false)
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        let friends = event.target[5].value;
        let enemies = event.target[6].value;
        
            const bodyData = new URLSearchParams(
                {
                    'student_ui_id': event.target[0].value, 
                    'firstname': event.target[1].value, 
                    'lastname': event.target[2].value, 
                    'age': parseInt(event.target[3].value), 
                    'sex': event.target[4].value,
                    // 'friend_ids': !friends ? []: event.target[5].value.split(',').map(s => s.trim().replace(/\s/, ' ')),
                    // 'enemy_ids': !enemies ? []: event.target[6].value.split(',').map(s => s.trim().replace(/\s/, ' '))
                }).toString();
            fetch(process.env.NEXT_PUBLIC_BACKEND_URI.concat("/students/editStudentById/"), {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyData,
            })
            window.location.reload(false);
            handleClose()

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Student"}</Modal.Title>
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
                        autoFocus
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
                    <Form.Label>Friends (please seperate by commas)</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.friend_ids}
                        disabled
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlEnemies"
                    >
                    <Form.Label>Enemies (please seperate by commas)</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={item.enemy_ids}
                        disabled
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

export default StudentEdit;

