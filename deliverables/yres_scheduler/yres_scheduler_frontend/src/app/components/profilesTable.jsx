import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';

function ProfilesTable({ type, defaultType }) {
    // Dummy state data. TODO: Replace with GET data api call
    const [stateData, setStateData] = useState([{
        student_id: 0,
        firstname: 'Tom',
        lastname: 'Bombadil',
        age: '12',
        sex: 'Male'
    }, {
        student_id: 1,
        firstname: 'Jack',
        lastname: 'Frost',
        age: 7,
        sex: 'Male'
    }]);

    appendRowActions(stateData, type);

    return (
        <div id='profiles-table'>
            {type !== defaultType ? <CounselorsTable display_data={stateData}/> : <StudentsTable display_data={stateData}/>}
        </div>
    )
}

/* Table subtypes */

function StudentsTable({ display_data, rowEvents }) {
    const columns = [{
        dataField: 'student_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'age',
        text: 'Age'
    },{
        dataField: 'sex',
        text: 'Sex'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    return (
        <YresTable keyCol={'student_id'} data={display_data} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
    )   
}

function CounselorsTable({ display_data, rowEvents }) {
    const columns = [{
        dataField: 'counselor_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'campus_id',
        text: 'Campus'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]

    return (
        <YresTable keyCol={'counselor_id'} data={display_data} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
    )   
}

// Helpers

/* 
 * Appends an edit and trash icon action to each row in <data> 
 * Also adds a tooltip for each icon for this specific user <type>
 */
function appendRowActions(data, type) {
    const renderEditTooltip = (props) => (
        <Tooltip {...props}>
            View/Edit {type}
        </Tooltip>
    );
    const renderDeleteTooltip = (props) => (
        <Tooltip {...props}>
            Delete {type}
        </Tooltip>
    );

    // TODO: Replace buttons with icons and add funcionality
    data.forEach(item => {
        //state for modal display
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        //state for modal values
        const [firstValue, setFirstValue] = useState(item.firstname);
        const firstValueChange = (event) => {
            setFirstValue(event.target.value);
        }
        const [lastValue, setLastValue] = useState(item.lastname);
        const lastValueChange = (event) => {
            setLastValue(event.target.value);
        }
        const [ageValue, setAgeValue] = useState(item.age);
        const ageValueChange = (event) => {
            setAgeValue(event.target.value);
        }
        const [sexValue, setSexValue] = useState(item.sex);
        const sexValueChange = (event) => {
            setSexValue(event.target.value);
        }
        const handleSubmit = () => {
            item.firstname = firstValue
            item.lastname = lastValue
            item.age = ageValue
            item.sex = sexValue
            handleClose() //needs to be before setStateData
            setStateData(stateData)
        }


        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ renderEditTooltip }
                >
                    <Button variant="success" onClick={handleShow} className='action-button'>
                        <FaPencilAlt />
                    </Button>
                    
                </OverlayTrigger>
                
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{"Edit " + type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlFirstName"
                            >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={item.firstname}
                                value={firstValue} 
                                onChange={firstValueChange} 
                                autoFocus
                            />
                            </Form.Group>

                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlLastName"
                            >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={item.lastname}
                                value={lastValue} 
                                onChange={lastValueChange} 
                            />
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlAge"
                            >
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={item.age}
                                value={ageValue} 
                                onChange={ageValueChange} 
                            />
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlSex"
                            >
                            <Form.Label>Sex</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={item.sex}
                                value={sexValue} 
                                onChange={sexValueChange} 
                            />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={ renderDeleteTooltip }
                >
                    <Button variant="danger" className='action-button'>
                        <BsTrash />
                    </Button>
                </OverlayTrigger>
            </div>
        )
    });
}

export default ProfilesTable;