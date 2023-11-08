'use client';
import * as React from 'react';
import ProfilesTable from "@/app/components/profilesTable";
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const PROFILE_TYPES = ['Student', 'Counselor']

function Profiles() {
    const [currType, setCurrType] = React.useState(PROFILE_TYPES[0]);

    const handleSelectType = (e) => {
        setCurrType(e);
    }

    return (
        <>
            <div id='profiles-header'>
                <Dropdown onSelect={handleSelectType}>
                    <Dropdown.Toggle id="dropdown-basic">
                        {currType}
                    </Dropdown.Toggle>
                    <DropdownButton.Menu>
                        {PROFILE_TYPES.map(
                            type => <Dropdown.Item key={type} eventKey={type} >{type}</Dropdown.Item>
                        )}
                    </DropdownButton.Menu>
                </Dropdown>
                <Button variant="primary">Add Profile</Button>
            </div>
            <div className='center-align'>
                <ProfilesTable type={currType} defaultType={PROFILE_TYPES[0]}/>
            </div>
        </>
    );
}

export default Profiles;