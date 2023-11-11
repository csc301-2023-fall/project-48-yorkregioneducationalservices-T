'use client';
import * as React from 'react';
import ProfilesTable from "@/app/components/profilesTable";
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import RefinedDropdown from '../../components/refinedDropDowns'

const PROFILE_TYPES = ['Student', 'Counselor']

function Profiles() {
    const [currType, setCurrType] = React.useState(PROFILE_TYPES[0]);

    const handleSelectType = (e) => {
        setCurrType(e);
    }

    return (
        <>
            <div id='profiles-header'>
                <RefinedDropdown 
                    handleSelect={handleSelectType}
                    displayText={currType}
                    groups={PROFILE_TYPES}
                />
                <div className='right-align'>
                    <Button variant="primary">Add Profile</Button>
                </div>
            </div>
            <div className='center-align'>
                <ProfilesTable type={currType} defaultType={PROFILE_TYPES[0]}/>
            </div>
        </>
    );
}

export default Profiles;