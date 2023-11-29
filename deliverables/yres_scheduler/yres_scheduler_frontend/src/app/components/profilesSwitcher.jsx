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

const PROFILE_TYPES = ['Student', 'Counselor']

/**
 * Toggles profile page to show either Students or Counselors
**/
function ProfilesSwitcher({ studentData, counselorData }) {
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