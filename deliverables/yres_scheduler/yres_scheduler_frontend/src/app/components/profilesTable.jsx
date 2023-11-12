import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import StudentEdit from '../modals/studentEdit';
import CounselorEdit from '../modals/counselorEdit';

function ProfilesTable({ type, defaultType, studentData, setStudentData, counselorData, setCounselorData}) {
    appendRowActions(studentData, type);
    appendRowActions(counselorData, type);
    return (
        <div id='profiles-table'>
            {type !== defaultType ? <CounselorsTable display_data={counselorData}/> : <StudentsTable display_data={studentData}/>}
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
        dataField: 'friends_ids',
        text: 'Friends'
    },{
        dataField: 'enemy_ids',
        text: 'Enemies'
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

    data.forEach(item => {
        //state for modal display
        const [show, setShow] = useState(false);
        const handleShow = () => setShow(true);
        if('student_id' in item){
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
                    <StudentEdit
                        item={item}
                        show={show}
                        setShow={setShow}
                        type={type}
                    />
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
        }else{
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
                    <CounselorEdit
                        item={item}
                        show={show}
                        setShow={setShow}
                        type={type}
                    />
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
        }
    });
}

export default ProfilesTable;