import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { validRelationship, process_comma_separated_text, fetchDataPOST  } from '@/app/helper';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import YresTable from '../components/table';

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
    const [removeFriends, setremoveFriends] = useState([]);
    const router = useRouter();
    const studentFriendData = students.map((item) => ({_student_id: item._student_id, _student_ui_id: item._student_ui_id, firstname: item.firstname, lastname: item.lastname}));
    const handleClose = () => {
        setError(<></>)
        setShow(false)
        setremoveFriends([]);
    };
    const columns = [{
        dataField: '_student_ui_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]
    var init_friend_table;
    if(item.friend_ids){
        init_friend_table = studentFriendData.filter((student) => item.friend_ids.includes(student._student_id) && !removeFriends.includes(student._student_ui_id));
    }
    else{
        init_friend_table = []
    }
    
    const friend_table = init_friend_table;
    console.log("this is the freind table".concat(friend_table));
    if(friend_table.length > 0){
        friend_table.forEach(friend => {
            const removeFriend = () =>{ 
                var updatedList = removeFriends.map((item) => item);
                updatedList.push(friend._student_ui_id)
                setremoveFriends(updatedList);
            }
            friend.actions = (
                <div className='table-actions'>
                    <OverlayTrigger placement="right-start" overlay={<Tooltip>Remove From Friends</Tooltip>}>
                        <Button variant="danger" onClick={removeFriend} className='action-button'>
                        </Button>
                    </OverlayTrigger>
                </div>
            )
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        let enemies = event.target[6].value;
        try {
            await fetchDataPOST(
                "/students/editStudentById/", 
                {
                    student_id: item._student_id,
                    student_ui_id: event.target[0].value, 
                    firstname: event.target[1].value, 
                    lastname: event.target[2].value, 
                    age: event.target[3].value, 
                    sex: event.target[4].value,
                    friend_ids: friend_table.map((friend) => friend._student_ui_id),
                    enemy_ids: process_comma_separated_text(enemies),
                }
            )
            router.refresh();
            handleClose();
        } catch (err) {
            //TODO: Display Error in component
            console.log(err);
        }
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

                    <Form.Label>Friends (please seperate by commas)</Form.Label>
                    <YresTable keyCol={'_student_ui_id'} data={friend_table} columns={columns} disableHover={true} friend_table={true}/>
                    
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

