'use client';
import * as React from 'react';
import StudentProfilesTable from '@/app/components/studentProfilesTable';
import CounselorProfilesTable from '@/app/components/counselorProfilesTable';
import Button from 'react-bootstrap/Button';
import RefinedDropdown from '@/app/components/refinedDropDowns';
import StudentAdd from '@/app/modals/studentAdd'
import CounselorAdd from '@/app/modals/counselorAdd'
import { useState } from 'react';
import StudentCSV from '@/app/components/importStudentCSV';

const PROFILE_TYPES = ['Student', 'Counselor']

/**
 * Toggles profile page to show either Students or Counselors
**/
function ProfilesSwitcher({ studentData, counselorData }) {
    const [currType, setCurrType] = React.useState(PROFILE_TYPES[0]);
    const handleSelectType = (e) => {
        setCurrType(e);
    }
    
    const [show, setShow] = useState(false);
    const handleShow = () => {
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
                <StudentCSV type={currType}/>
                <div className='right-align'>
                    <Button variant="primary" onClick={handleShow}>Add {currType}</Button>
                    {currType === PROFILE_TYPES[0] 
                    ? <StudentAdd
                        show={show}
                        setShow={setShow}
                        item={{}}
                        students={studentData}
                        />
                    : <CounselorAdd
                        show={show}
                        setShow={setShow}
                        item={{}}
                        />}
                    
                </div>
            </div>
            <div className='center-align'>
                <div id='profiles-table'>
                    {currType === PROFILE_TYPES[0] ? 
                        <StudentProfilesTable studentData={studentData}/> : 
                        <CounselorProfilesTable counselorData={counselorData}/>}
                </div>
            </div>
        </>
    )
}

export default ProfilesSwitcher;