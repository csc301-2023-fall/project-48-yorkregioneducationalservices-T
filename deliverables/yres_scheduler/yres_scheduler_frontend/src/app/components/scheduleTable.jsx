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
import { sort_times } from '@/app/helper';

/**
 * Creates the ScheduleTable component for the Schedule View. The sidebar component is also called from
 * within this function.
 *Props: 
        schedule - a list of schedule objects with the attributes: classNum (group id), time, location, and name. 
        These are matched to columns in the table
        generateSchedule - a function that makes the necesary calls and computation to create schedule
**/
export default function Schedule({schedule, generateSchedule}) {
    const groups = new Set();
    groups.add("Master Sched"); // Holds the possible camp groups to be displayed in the dropdown
    schedule.forEach((row) => groups.add(row.classNum));

    const [DisplaySched, setDisplaySched] = useState("Master Sched"); // String of the current group to be display
    const [SelectedRow, setSelectedRow] = useState(0); // Row information to be displayed in the sidebar
    const [show, setShow] = useState(false);

    const tempSched = schedule.filter((row) => DisplaySched == "Master Sched" || DisplaySched == row.classNum);
    tempSched.sort(sort_times);
    const display_data = tempSched.map((row, rowIndex) => { 
        return {group: row.classNum, time: row.time, location: row.location, activity: row.name }
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
        dataField: 'group',
        text: 'Group ID'
    },{
        dataField: 'time',
        text: 'Time'
    }, {
        dataField: 'location',
        text: 'Location'
    }, {
        dataField: 'activity',
        text: 'Activity Name'
    }];

    const rowEvents = {
        onClick: (_, rowIndex) => {
            setSelectedRow(rowIndex);
            handleShow();
        },
    };

    //generates csvData using current display_data
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
            <div>
            <Button className="right-btn" variant="primary" onClick={generateSchedule}>
                            Generate Schedule
            </Button>
            <CSVLink className="btn btn-secondary right-btn" filename= {DisplaySched.concat("-schedule.csv")} data={csvData}>
                Export to CSV
            </CSVLink>
            </div>
            <YresTable data={display_data} columns={columns} rowEvents={ rowEvents } />
            <SideBarWrapper/>
        </div>
    );
}