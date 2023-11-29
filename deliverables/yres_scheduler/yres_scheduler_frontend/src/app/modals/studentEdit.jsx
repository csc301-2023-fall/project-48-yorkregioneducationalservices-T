import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { validRelationship, process_comma_separated_text, fetchDataPOST  } from '@/app/helper';
import { FaMinus } from 'react-icons/fa';
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
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [removeFriends, setRemoveFriends] = useState([]);
    const [removeEnemies, setRemoveEnemies] = useState([]);
    const router = useRouter();
    const studentFriendData = students.map((item) => ({_student_id: item._student_id, _student_ui_id: item._student_ui_id, firstname: item.firstname, lastname: item.lastname}));
    const handleClose = () => {
        setErrorDisplay(<></>)
        setShow(false)
        setRemoveFriends([]);
        setRemoveEnemies([]);
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
    (item.friend_ids) ? init_friend_table = 
    studentFriendData.filter((student) => item.friend_ids.includes(student._student_id) && !removeFriends.includes(student._student_ui_id)) 
    : init_friend_table = [];
    const friend_table = init_friend_table;
    if(friend_table.length > 0){
        friend_table.forEach(friend => {
            const removeFriend = () =>{ 
                var updatedList = removeFriends.map((item) => item);
                updatedList.push(friend._student_ui_id)
                setRemoveFriends(updatedList);
            }
            friend.actions = (
                <div className='table-actions'>
                    <OverlayTrigger placement="right-start" overlay={<Tooltip>Remove From Friends</Tooltip>}>
                        <Button variant="danger" onClick={removeFriend} className='action-button'>
                            <FaMinus/>
                        </Button>
                    </OverlayTrigger>
                </div>
            )
        })
    }

    var init_enemy_table;
    (item.enemy_ids) ? init_enemy_table = 
    studentFriendData.filter((student) => item.enemy_ids.includes(student._student_id) && !removeEnemies.includes(student._student_ui_id)) 
    : init_enemy_table = [];
    const enemy_table = init_enemy_table;
    if(enemy_table.length > 0){
        enemy_table.forEach(enemy => {
            const removeEnemy = () =>{ 
                var updatedList = removeEnemies.map((item) => item);
                updatedList.push(enemy._student_ui_id)
                setRemoveEnemies(updatedList);
            }
            enemy.actions = (
                <div className='table-actions'>
                    <OverlayTrigger placement="right-start" overlay={<Tooltip>Remove From Enemies</Tooltip>}>
                        <Button variant="danger" onClick={removeEnemy} className='action-button'>
                        <FaMinus/>
                        </Button>
                    </OverlayTrigger>
                </div>
            )
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
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
                    enemy_ids: enemy_table.map((enemy) => enemy._student_ui_id)
                }
            )
            router.refresh();
            handleClose();
        } catch (err) {
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
                <p>{err}</p>
                </Alert>);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Edit Student"}</Modal.Title>
            </Modal.Header>
            {errorDisplay}
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

                    <Form.Label>Friends</Form.Label>
                    <YresTable keyCol={'_student_ui_id'} data={friend_table} columns={columns} disableHover={true} friend_table={true} disablesearch={true}/>
                    
                    <Form.Label>Enemies</Form.Label>
                    <YresTable keyCol={'_student_ui_id'} data={enemy_table} columns={columns} disableHover={true} friend_table={true} disablesearch={true}/>
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

