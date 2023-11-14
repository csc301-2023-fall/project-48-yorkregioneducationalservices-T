import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';

/**
 * Addition Modal for Students
 * 
 * */
function StudentAdd({show, setShow, item, students}) {
    const [error, setError] = useState(<></>);
    const handleClose = () => {
        setError(<></>)
        setShow(false)
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        let friends = event.target[4].value;
        let enemies = event.target[5].value;
        if (validRelationship(friends, "Friends") && validRelationship(enemies, "Enemies")){
            handleClose()
        }
    }
        
    function validRelationship(string, field) {
        if(string === ''){
            return true
        }
        const studentNames = students.map(student => {return student.firstname + " " + student.lastname})
        const names = string.split(',').map(s => s.trim().replace(/\s/, ' '));
        for (const name of names) {
            if (!studentNames.includes(name)){
                console.log(name)
                console.log(students)
                console.log(studentNames)
                setError(<Alert simpleMessage={field + " field invalid, " + name + " isn't a known student"}/>)
                return false
            }
        }
        return true
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
                        defaultValue={item.friends_id}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="studentForm.ControlEnemies"
                    >
                    <Form.Label>Enemies (please seperate by commas)</Form.Label>
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

