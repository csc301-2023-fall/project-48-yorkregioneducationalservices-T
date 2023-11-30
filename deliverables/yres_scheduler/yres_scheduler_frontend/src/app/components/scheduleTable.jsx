'use client';
import * as React from 'react';
import { useState } from 'react';
import Sidebar from '../components/sidebar';
import YresTable from './table'
import { CSVLink } from "react-csv";
import Button from 'react-bootstrap/Button';
import GroupsTable from './groupsTable';
import RefinedDropdown from './refinedDropDowns'
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/app/components/alert';
/**
 * Creates the ScheduleTable component for the Schedule View. The sidebar component is also called from
 * within this function.
 *Props: 
        schedule - a list of schedule objects with the attributes: classNum (group id), time, location, and name. 
        These are matched to columns in the table
        generateSchedule - a function that makes the necesary calls and computation to create schedule
**/
async function generateSchedule() {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/generate/`, { cache: 'no-store' });
        const data = await res.json();
        if(data.error){
            throw data;
        }
        return {
            error: false,
            schedule: data.schedule,
            err_message: ""
        };
    } catch (error) {
        return {
            error: true,
            schedule: "nil",
            err_message: error.message
        };
    }
}

export default function Schedule({schedule, rooms}) {
    const router = useRouter();
    if(schedule == "nil" || !schedule || schedule.length == 0){
        return (<Alert simpleMessage={"Schedule is empty. This may have occured because no schedule was able to be created."}></Alert>)
    }
    const groups = new Set(); // Holds the possible camp groups to be displayed in the dropdown
    schedule[0].forEach((row, rowIndex) => groups.add("Group ".concat(rowIndex.toString())));

    //Get group data
    const allGroups = []
    schedule.forEach(camp => {
        camp.forEach((group, group_index) => {
            const student_ids = group.students.map(student => student.student_id)
            const counselor_ids = group.counselors.map(counselor => counselor.counselor_id)
            allGroups.push({student_ids: student_ids, counselor_ids: counselor_ids, group_id: group_index});
        })
      });

    const [csvOutData, setCSVOutData] = useState([]);
    const csvLink = useRef();
    const [DisplaySched, setDisplaySched] = useState("Group 0"); // String of the current group to be display
    const [SelectedRow, setSelectedRow] = useState(0); // Row information to be displayed in the sidebar
    const [show, setShow] = useState(false);
    let errorDisplay = <></>;
    const [errorMessage, setErrorMessage] = useState("");


    const tempSchedArray = schedule[0][DisplaySched.split(" ")[1]].schedule;
    let tempSched = [];
    tempSchedArray.forEach((day) => {
        tempSched.push(...day);
    })

    tempSched.sort((a, b) => (a.day*8 + a.time - b.day*8-b.time));

    const display_data = tempSched.map((row) => { 
        console.log(rooms);
        console.log(row);
        const room = rooms.find((room_i) => room_i.room_id.toString() === row.room_id.toString());
        return {group: DisplaySched, time: "Day: ".concat(row.day).concat(", Hour: ").concat(row.time), location: room ? room.name : "unknown", activity: row.activity.name }
    });
    /**
     * Handler for dropdown click
     */
    const handleSelect = (e) => {
        setDisplaySched(e);
    }

    const handleGenerate = async () => {
        const response = generateSchedule();
        if(response.error){
            router.refresh()
            setErrorMessage(response.errorMessage)
        }
        else{

            router.refresh()
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

    const updateCSV = () => {
        const tempSchedArray = schedule[0][DisplaySched.split(" ")[1]].schedule;
        let tempSched = [];
        tempSchedArray.forEach((day) => {
            tempSched.push(...day);
        })
        tempSched.sort((a, b) => (a.day*8 + a.time - b.day*8-b.time));
        const display_data = tempSched.map((row) => {
            const room = rooms.find((room_i) => room_i.room_id == row.room_id.toString());
            return {group: DisplaySched, time: "Day: ".concat(row.day).concat(", Hour: ").concat(row.time), location: room ? room.name : "unknown", activity: row.activity.name }
        });
        const csvData = [
            ["ID", "Time", "Location", "Activity Name", "Group ID"],
            ...display_data.map((row, rowIndex) => { 
                return [rowIndex, row.time, row.location, row.activity, row.group ]
            })
          ];
          setCSVOutData(csvData);

    }

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
    const downloadCSV = () => {
        csvLink.current.link.click()
    }
    if (errorMessage != ""){
        errorDisplay = <Alert complexMessage={errorMessage}/>
    }
    return (
        <div>  
            <h3 className='header-title '>Groups</h3>
            <GroupsTable data={allGroups}/>
            <h3 className='header-title '>Schedule</h3>
            <div className='float-child'>
            <RefinedDropdown 
                handleSelect={handleSelect}
                displayText={DisplaySched}
                groups={groups}
            />
            </div>
            <div>
            <Button className={"btn btn-primary right-btn"} onClick={handleGenerate}> Generate Schedule </Button>
            </div>
            <div>
            <Button className={csvOutData.length == 0 ? "btn btn-secondary right-btn" : "hidden"} disabled={!csvOutData.length == 0} onClick={updateCSV}> Prepare for download </Button>
            <Button className={!csvOutData.length == 0 ? "btn btn-primary right-btn" : "hidden"} disabled={csvOutData.length == 0} onClick={downloadCSV}> Download Schedule </Button>
                
            <CSVLink disabled={csvOutData.length == 0} filename= {DisplaySched.concat("-schedule.csv")} data={csvOutData} target='_blank' ref={csvLink}>           </CSVLink>
            </div>
            <YresTable data={display_data} columns={columns} disablesearch={true}/>
            <SideBarWrapper/>
        </div>
    );
}