import * as React from 'react';
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import Sidebar from '../components/sidebar';
import YresTable from './table'
import { CSVLink } from "react-csv";
import Button from 'react-bootstrap/Button';
import RefinedDropdown from './refinedDropDowns'
import Alert from './alert'
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

    const csvData = [
        ["ID", "Time", "Location", "Activity Name", "Group ID"],
        ...display_data.map((row, rowIndex) => { 
            return [rowIndex, row.time, row.location, row.activity, row.group ]
        })
      ];
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
            <div className='float-child'>
            <RefinedDropdown 
                handleSelect={handleSelect}
                displayText={DisplaySched}
                groups={groups}
            />
            </div>
            <div className='float-child'>
            <CSVLink className="btn btn-secondary right-btn" filename= {DisplaySched.concat("-schedule.csv")} data={csvData}>
                Export to CSV
            </CSVLink>
            </div>
            <YresTable data={display_data} columns={columns} rowEvents={ rowEvents } />
            <SideBarWrapper/>
        </div>
    );
}