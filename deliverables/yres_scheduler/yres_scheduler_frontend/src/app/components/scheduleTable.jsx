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
        if ((!(199 < res.status && res.status < 300))) {
            const promiseRes = await res.text()
            const jsonErrMsg = JSON.parse(promiseRes);
            return {
                error: true,
                schedule: "nil",
                err_message: `${res.status} ${jsonErrMsg.error}`
            };
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

export default function Schedule({schedule, rooms, groups}) {
    const router = useRouter();
    let errorDisplay = <></>;
    const [csvOutData, setCSVOutData] = useState([]);
    const csvLink = useRef();
    const [DisplaySched, setDisplaySched] = useState("Group 0"); // String of the current group to be display
    const [SelectedRow, setSelectedRow] = useState(0); // Row information to be displayed in the sidebar
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const MONDAY = 0, TUESDAY = 1, WEDNESDAY = 2, THURSDAY = 3, FRIDAY = 4;
    const TIME_ADJUSTMENT = 9;
    const handleGenerate = async () => {
        const response = await generateSchedule();
        if(response.error){
            console.log("HERE2")
            router.refresh()
            setErrorMessage(response.err_message)
        }
        else{

            router.refresh()
        }
    }
    if(schedule == "nil" || !schedule || schedule.length == 0){
        return (<div><Alert simpleMessage={"Schedule is empty."} 
        complexMessage={"This may have occured because no schedule was able to be generated, or you have yet to generate one. Try again and reload the page."}></Alert>
        <Button className={"btn btn-primary right-btn"} onClick={handleGenerate}> Generate Schedule </Button>
        </div>)
    }

    //Get group data
    const allGroups = []
   // Check if schedule is an array before iteration
    if (Array.isArray(schedule)) {
        schedule.forEach(camp => {
            if (Array.isArray(camp) && camp.length > 0) {
                camp.forEach((group, group_index) => {
                    if (group && Array.isArray(group.students) && Array.isArray(group.counselors)) {
                        const student_ids = group.students.map(student => student.student_id);
                        const counselor_ids = group.counselors.map(counselor => counselor.counselor_id);
                        allGroups.push({ student_ids, counselor_ids, group_id: group_index });
                    }
                });
            }
        });
    } else {
        console.error('Schedule is not an array');
        // Handle the situation where schedule is not an array
    }   

    
    let tempSchedArray;
    if (schedule[0][DisplaySched.split(" ")[1]]?.schedule === undefined) {
        tempSchedArray = [];
    } else {
        tempSchedArray = schedule[0][DisplaySched.split(" ")[1]].schedule;
    }    
    let tempSched = [];
    tempSchedArray.forEach((day) => {
        tempSched.push(...day);
    })

    tempSched.sort((a, b) => (a.day*8 + a.time - b.day*8-b.time));

    const display_data = tempSched.map((row) => { 
        var displayDay = "";
            switch(row.day) {
                case MONDAY:
                    displayDay = "Monday";
                    break;
                case TUESDAY:
                    displayDay = "Tuesday";
                    break;
                case WEDNESDAY:
                    displayDay = "Wednesday";
                    break;
                case THURSDAY:
                    displayDay = "Thursday";
                    break;
                case FRIDAY:
                    displayDay = "Friday";
                    break;
            }
        const displayTime = row.time + TIME_ADJUSTMENT;
        const room = rooms.find((room_i) => room_i.room_id.toString() === row.room_id.toString());
        return {group: DisplaySched, time: "Day: ".concat(displayDay).concat(", Hour: ").concat(displayTime), location: room ? room.name : "unknown", activity: row.activity.name }
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

   
    const updateCSV = () => {
        console.log("update csv");
        let tempSchedArray;
        if (schedule[0][DisplaySched.split(" ")[1]]?.schedule === undefined) {
            tempSchedArray = [];
        } else {
            tempSchedArray = schedule[0][DisplaySched.split(" ")[1]].schedule;
        }    
        let tempSched = [];
        tempSchedArray.forEach((day) => {
            tempSched.push(...day);
        })
        tempSched.sort((a, b) => (a.day*8 + a.time - b.day*8-b.time));
        const display_data = tempSched.map((row) => {
            const room = rooms.find((room_i) => room_i.room_id == row.room_id.toString());
            // switch case for day 
            var displayDay = "";
            switch(row.day) {
                case MONDAY:
                    displayDay = "Monday";
                    break;
                case TUESDAY:
                    displayDay = "Tuesday";
                    break;
                case WEDNESDAY:
                    displayDay = "Wednesday";
                    break;
                case THURSDAY:
                    displayDay = "Thursday";
                    break;
                case FRIDAY:
                    displayDay = "Friday";
                    break;
            }
            const displayTime = row.time + TIME_ADJUSTMENT;
            
            return {group: DisplaySched, time: "Day: ".concat(displayDay).concat(", Hour: ").concat(displayTime), location: room ? room.name : "unknown", activity: row.activity.name }
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
        setCSVOutData("");
    }
    if (errorMessage != ""){
        errorDisplay = <Alert complexMessage={errorMessage}/>
    }
    return (
        <div>  
            {errorDisplay}
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
            <Button className={csvOutData.length == 0 ? "btn btn-secondary right-btn" : "hidden nothing"} disabled={!csvOutData.length == 0} onClick={updateCSV}> Prepare for download </Button>
            <Button className={!csvOutData.length == 0 ? "btn btn-primary right-btn" : "hidden nothing"} disabled={csvOutData.length == 0} onClick={downloadCSV}> Download Schedule </Button>   
            <CSVLink disabled={csvOutData.length == 0} filename= {DisplaySched.concat("-schedule.csv")} data={csvOutData} target='_blank' ref={csvLink}>           </CSVLink>
            </div>
            <YresTable data={display_data} columns={columns} disablesearch={true}/>
            <SideBarWrapper/>
        </div>
    );
}