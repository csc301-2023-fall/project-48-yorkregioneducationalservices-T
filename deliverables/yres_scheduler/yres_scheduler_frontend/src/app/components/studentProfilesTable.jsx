import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import StudentEdit from '../modals/studentEdit';
import { FaPencilAlt } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';

function StudentProfilesTable({ studentData, rowEvents }) {
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState({
        student_id: -1,
        firstname: null,
        lastname: null,
        age: null,
        sex: null,
        friends_ids: [],
        enemy_ids: []
    });

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
        dataField: 'age',
        text: 'Age'
    },{
        dataField: 'sex',
        text: 'Sex'
    },{
        dataField: 'friend_ids',
        text: 'Friends'
    },{
        dataField: 'enemy_ids',
        text: 'Enemies'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]
    studentData.forEach(item => {
        const showEditModal = () => {
            setEditItem(item);
            setShowEdit(true);
        }
        const deleteStudent = () =>{
            console.log(item);
            const bodyData = new URLSearchParams(
                {
                    'student_ui_id': item._student_ui_id, 
                }).toString();
            fetch(process.env.NEXT_PUBLIC_BACKEND_URI.concat("/students/deleteStudentById/"), {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyData,
            })
            window.location.reload(false);
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>View/Edit Student</Tooltip>}>
                    <Button variant="success" onClick={showEditModal} className='action-button'>
                        <FaPencilAlt />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>Delete Student</Tooltip>}>
                    <Button variant="danger" onClick={deleteStudent} className='action-button'>
                        <BsTrash />
                    </Button>
                </OverlayTrigger>
            </div>
        )
    })

    return (
        <>
            <YresTable keyCol={'_student_ui_id'} data={studentData} columns={columns} rowEvents={ rowEvents } disableHover={true}/>
            <StudentEdit
                item={editItem}
                show={showEdit}
                setShow={setShowEdit}
                students={studentData}
            />
        </>
    )   
}

export default StudentProfilesTable;