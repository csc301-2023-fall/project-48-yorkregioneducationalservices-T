'use client';
import * as React from 'react';
import StudentProfilesTable from '@/app/components/studentProfilesTable';
import CounselorProfilesTable from '@/app/components/counselorProfilesTable';
import Button from 'react-bootstrap/Button';
import RefinedDropdown from '@/app/components/refinedDropDowns';
import StudentAdd from '@/app/modals/studentAdd'
import CounselorAdd from '@/app/modals/counselorAdd'
import { useState } from 'react';
import StudentImport from '../modals/importStudent';
import FriendsCreate from '../modals/friendAdd';
import EnemiesCreate from '../modals/enemyAdd';
import { fetchDataDELETE } from '../helper';
const PROFILE_TYPES = ['Student', 'Counselor']

/** 
 * Toggles profile page to show either Students or Counselors
 * class Student {
   *student_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    age (int) 			// <UI>
    sex (string) 		// <UI>
    friend_ids (set<string>) 	// The set of student_ids of students that this student prefer to work with
    enemy_ids (set<string>) 	// The set of student_ids of students that this student doesn't want to work with
}
*class Counselor {
   *counselor_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    campus_id (string) 		// <UI> The ID of the campus this counselor will teach in
}
 * Props: 
        studentData - a list of student objects with above attributes
        counselorData - a list of counselor objects with above attributes
**/
function ProfilesSwitcher({ studentData, counselorData }) {
    let errorDisplay = <></>;
    const [errorMessage, setErrorMessage] = useState("");
    const [currType, setCurrType] = useState(PROFILE_TYPES[0]);
    const handleSelectType = (e) => {
        setCurrType(e);
    }
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };
    const [showFriends, setShowFriends] = useState(false);
    const handleShowFriends = () => {
        setShowFriends(true);
    };
    const [showEnemies, setShowEnemies] = useState(false);
    const handleShowEnemies = () => {
        setShowEnemies(true);
    };
    const [showCSV, setShowCSV] = useState(false);
    const handleShowCSV = () => {
        setShowCSV(true);
    };
    const handleReset = async () => {
        try {
            await fetchDataDELETE(
                "/account/reset/"
            );
            router.refresh();
            handleClose();
        } catch (err) {
            setErrorMessage(err.message);
        }
    }
    const handleActionsSelect = (e) => {
        switch(e){
            case "New Student":
                handleShow();
                break;
            case "Create Friends":
                handleShowFriends();
                break;
            case "Create Enemies":
                handleShowEnemies();
                break;
            case "New Counselor":
                handleShow();
                break;
            case "Import from CSV":
                console.log("item");
                handleShowCSV();
                break;
        }
    }
    const profile_actions = ["New Student", "Create Friends", "Create Enemies", "Import from CSV"];
    const profile_actions_counselor = ["New Counselor"];
    return (
        <>
            <div id='profiles-header'>
                <RefinedDropdown 
                    handleSelect={handleSelectType}
                    displayText={currType}
                    groups={PROFILE_TYPES}
                />
                
                <StudentImport 
                    show={showCSV}
                    setShow={setShowCSV}
                    type={currType}
                />
                <div className='right-align'>
                <Button
                    className='btn-right'
                    onClick={handleReset}
                    variant="danger"
                    >Reset DB</Button>
                    {currType === PROFILE_TYPES[0] 
                    ? <>
                    <RefinedDropdown
                    handleSelect={handleActionsSelect}
                    displayText = "Manage Profiles"
                    groups = {profile_actions}   
                    />
                    <StudentAdd
                        show={show}
                        setShow={setShow}
                        item={{}}
                        students={studentData}
                        />
                        <FriendsCreate
                        show={showFriends}
                        setShow={setShowFriends}
                        studentData={studentData}
                        />
                        <EnemiesCreate
                        show={showEnemies}
                        setShow={setShowEnemies}
                        studentData={studentData}
                        />
                    </>
                    : <>
                        <CounselorAdd
                        show={show}
                        setShow={setShow}
                        item={{}}
                        />
                        <RefinedDropdown
                        handleSelect={handleActionsSelect}
                        displayText = "Manage Profiles"
                        groups = {profile_actions_counselor}   
                        /></>}
                    
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