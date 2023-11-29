'use client';
import * as React from 'react';
import { useState } from 'react';
import Sidebar from '../components/sidebar';
import YresTable from './table'
import { CSVLink } from "react-csv";
import Button from 'react-bootstrap/Button';
import GroupsTable from './groupsTable';
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
async function generateSchedule() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/generate/`, { cache: 'no-store' });
    const data = await res.json();
    return data.result;
}

export default function Schedule({schedule}) {
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

    const handleGenerate = async () => {
        try {
            data = generateSchedule();
        } catch (err) {
        }
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
            <h3 className='header-title '>Groups</h3>
            <GroupsTable data={schedule}/>
            <h3 className='header-title '>Schedule</h3>
            <div className='float-child'>
            <RefinedDropdown 
                handleSelect={handleSelect}
                displayText={DisplaySched}
                groups={groups}
            />
            </div>
            <div>
            <Button className="right-btn" variant="primary" onClick={handleGenerate}>
                            Generate Schedule
            </Button>
            <CSVLink className="btn btn-secondary right-btn" filename= {DisplaySched.concat("-schedule.csv")} data={csvData}>
                Export to CSV
            </CSVLink>
            </div>
            <YresTable data={display_data} columns={columns} rowEvents={ rowEvents } disablesearch={true}/>
            <SideBarWrapper/>
        </div>
    );
}