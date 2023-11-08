import * as React from 'react';
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import Sidebar from '../components/sidebar';
import YresTable from './table'
/**
 * Helper function to sort rows of a schedule by their time attribute. Preconditions: Schedule uses 24hr time.
 */
function sort_times(a, b) {
    let startA = parseInt(a.time.split(":")[0]);
    let startB = parseInt(b.time.split(":")[0]);
    if (startA < startB) {
        return -1;
    }
    if (startA > startB) {
        return 1;
    }
    return 0;
}

/**
 * Creates the ScheduleTable component for the Schedule View. The sidebar component is also called from
 * within this function.
 */
export default function Schedule({ schedule }) {
    const groups = new Set();
    groups.add("Master Sched"); // Holds the possible camp groups to be displayed in the dropdown
    schedule.forEach((row) => groups.add(row.classNum));

    const [DisplaySched, setDisplaySched] = useState("Master Sched"); // String of the current group to be display
    const [SelectedRow, setSelectedRow] = useState(0); // Row information to be displayed in the sidebar
    const [show, setShow] = useState(false);

    const tempSched = schedule.filter((row) => DisplaySched == "Master Sched" || DisplaySched == row.classNum);
    tempSched.sort(sort_times);
    const display_data = tempSched.map((row, rowIndex) => { 
        return {id: rowIndex, time: row.time, location: row.location, activity: row.name, group: row.classNum }
    });
    
    /**
     * Handler for dropdown click
     */
    const handleSelect = (e) => {
        setDisplaySched(e);
    }

    // handling function for opening and closing the sidebar
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const columns = [{
        dataField: 'id',
        text: 'ID'
    },{
        dataField: 'time',
        text: 'Time'
    }, {
        dataField: 'location',
        text: 'Location'
    }, {
        dataField: 'activity',
        text: 'Activity Name'
    }, {
        dataField: 'group',
        text: 'Group ID'
    }];

    const rowEvents = {
        onClick: (_, rowIndex) => {
            setSelectedRow(rowIndex);
            handleShow();
        },
    };

    const SideBarWrapper = () => {
        if (tempSched === undefined || tempSched.length === 0) {
            return <div/>
        }
        return (
            <Sidebar 
                data={tempSched[SelectedRow]}
                show={show}
                onHide={handleClose}
            />
        );
    }
    return (
        <div>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle id="dropdown-basic">
                    {DisplaySched}
                </Dropdown.Toggle>

                <DropdownButton.Menu>
                    {Array.from(groups).map((val) => {
                        return (
                            <Dropdown.Item key={val} eventKey={val} >{val}</Dropdown.Item>
                        )
                    })}
                </DropdownButton.Menu>
            </Dropdown>
            <YresTable keyCol={'id'} data={display_data} columns={columns} rowEvents={ rowEvents } />
            <SideBarWrapper/>
        </div>
    );
}