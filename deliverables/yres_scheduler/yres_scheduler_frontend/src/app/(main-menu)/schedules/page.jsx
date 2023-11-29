import * as React from 'react';
import Schedule from '../../components/scheduleTable'
import GroupsTable from '../../components/groupsTable'
import FloorplanCanvas from '@/app/components/floorPlanCanvasWrapper';
import jsonData from './sample.json';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;


// GET rooms frontend server side
async function getRooms() {
    const res = await fetch(`${URI}/rooms/getAllRooms/`, { cache: 'no-store' });
    const data = await res.json();
    return data.rooms;
}

// GET groups frontend server side
async function getGroups() {
    const res = await { // fetch(`${URI}/groups/getAllGroups/`, { cache: 'no-store' });
        json: () => {
            return {
                groups: [{
                    group_id: "AX001",
                    schedule_id: 0,
                    student_ids: [1, 2, 3, 4],
                    counselor_ids: [1, 3]
                    //scrapped camp so no camp attribute
                },
                {
                    group_id: "BY002",
                    schedule_id: 1,
                    student_ids: [4, 5, 6, 7],
                    counselor_ids: [2, 4]
                }]
            }
        }
    };
    //fetch data
    const data = jsonData.schedule;
    //const data = await res.json().schedule;
    const allGroups = []
    data.forEach(camp => {
        camp.forEach(group => {
            const student_ids = group.students.map(student => student.student_id)
            const counselor_ids = group.counselors.map(counselor => counselor.counselor_id)
            group.student_ids = student_ids
            group.counselor_ids = counselor_ids
            allGroups.push(group)
        })
      });

    return allGroups
}

// GET schedule frontend server side
async function getSchedule() {
    const res = await { // fetch(`${URI}/schedule/getSchedule/`, { cache: 'no-store' });
        json: () => {
            return {
                schedule: []
            }
        }
    };
    const data = await res.json();
    return data.schedule;
}

/** 
 * Schedules page that generates and displays schedule and groups
**/
export default async function Schedules() {
    const groups = await getGroups();
    const schedule = await getSchedule();
    
    return (
        <div className='split-page'>
            <div className='left'>
                <FloorplanCanvas/>
            </div>
            <div className='right'>
                <h3 className='header-title '>Groups</h3>
                <GroupsTable data={groups}/>
                <h3 className='header-title '>Schedule</h3>
                <Schedule schedule={schedule}/>
            </div>
        </div>
    );
}
