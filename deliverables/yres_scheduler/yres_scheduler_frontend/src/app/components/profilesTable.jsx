import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import StudentEdit from '../modals/studentEdit';
import CounselorEdit from '../modals/counselorEdit';

function ProfilesTable({ type, defaultType }) {
    // Dummy state data. TODO: Replace with GET data api call
    const [studentData, setStudentData] = useState([{
        student_id: 0,
        firstname: 'Tom',
        lastname: 'Bombadil',
        age: '12',
        sex: 'Male',
        friends_ids: ['1'],
        enemy_ids: ['2', '3']
    }, {
        student_id: 1,
        firstname: 'Jack',
        lastname: 'Frost',
        age: 7,
        sex: 'Male',
        friends_ids: ['0'],
        enemy_ids: []
    },{
        student_id: 2,
        firstname: 'George',
        lastname: 'Washington',
        age: 8,
        sex: 'Male',
        friends_ids: ['3'],
        enemy_ids: ['1']
    }, {
        student_id: 3,
        firstname: 'Abraham',
        lastname: 'Lincoln',
        age: 7,
        sex: 'Male',
        friends_ids: ['2'],
        enemy_ids: ['1']
    }]);
    const [counselorData, setCounselorData] = useState([{
        counselor_id: 0,
        firstname: 'Walter',
        lastname: 'White',
        campus_id: '11',
    }, {
        counselor_id: 1,
        firstname: 'Hank',
        lastname: 'Schrader',
        campus_id: '11',
    },{
        counselor_id: 2,
        firstname: 'Skylar',
        lastname: 'White',
        campus_id: '12',
    }, {
        counselor_id: 3,
        firstname: 'Jesse',
        lastname: 'Pinkman',
        campus_id: '12',
    }]);
    appendRowActions(studentData, type);
    appendRowActions(counselorData, type);
    return (
        <div id='profiles-table'>
            {type !== defaultType ? <CounselorsTable display_data={counselorData}/> : <StudentsTable display_data={studentData}/>}
        </div>
    )
}

/* Table subtypes */

function StudentsTable({ display_data}) {
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
        <YresTable keyCol={'student_id'} data={display_data} columns={columns} disableHover={true}/>
    )   
}

function CounselorsTable({ display_data}) {
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
        <YresTable keyCol={'counselor_id'} data={display_data} columns={columns} disableHover={true}/>
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