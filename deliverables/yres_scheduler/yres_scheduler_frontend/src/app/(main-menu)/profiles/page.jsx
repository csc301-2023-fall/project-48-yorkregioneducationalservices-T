'use client';
import * as React from 'react';
import ProfilesTable from "@/app/components/profilesTable";
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import RefinedDropdown from '../../components/refinedDropDowns'
import StudentAdd from '../../modals/studentAdd'
import { useState, useEffect } from 'react';

const PROFILE_TYPES = ['Student', 'Counselor']

function Profiles() {
    const [currType, setCurrType] = React.useState(PROFILE_TYPES[0]);
    const [item, setItem] = useState({});

    const handleSelectType = (e) => {
        setCurrType(e);
    }

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
    const [show, setShow] = useState(false);
    const handleShow = () => {
        const object = {
            student_id: 99,
            firstname: '',
            lastname: '',
            age: '0',
            sex: '',
            friends_ids: ['1'],
            enemy_ids: ['1']
        };
        setItem(object);
        const addedArray = [...studentData, object];
        setStudentData(addedArray);
        setShow(true);
    };
    return (
        <>
            <div id='profiles-header'>
                <RefinedDropdown 
                    handleSelect={handleSelectType}
                    displayText={currType}
                    groups={PROFILE_TYPES}
                />
                <div className='right-align'>
                    <Button variant="primary" onClick={handleShow}>Add Student</Button>
                    <StudentAdd
                        show={show}
                        setShow={setShow}
                        setStudentData={setStudentData} 
                        item={item}
                    />
                </div>
            </div>
            <div className='center-align'>
                <ProfilesTable type={currType} defaultType={PROFILE_TYPES[0]} 
                studentData={studentData} setStudentData={setStudentData} 
                counselorData={counselorData} setCounselorData={setCounselorData}/>
            </div>
        </>
    );
}

export default Profiles;