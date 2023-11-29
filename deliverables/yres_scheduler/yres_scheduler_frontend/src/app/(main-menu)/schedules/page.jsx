import * as React from 'react';
import Schedule from '../../components/scheduleTable'
import GroupsTable from '../../components/groupsTable'
import ScheduleTimetable from '@/app/components/scheduleTimetable';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;


// GET rooms frontend server side
async function getRooms() {
    const res = await fetch(`${URI}/room/all/`, { cache: 'no-store' });
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
    const data = await res.json();
    return data.groups;
}

// GET schedule frontend server side
async function getSchedule() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/`, { cache: 'no-store' });
    const data = await res.json();
    return data.schedule;
}

async function generateSchedule() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/schedule/generate/`, { cache: 'no-store' });
    const data = await res.json();
    return data.result;
}
/** 
 * Schedules page that generates and displays schedule and groups
**/
export default async function Schedules() {
    //const [errorDisplay, setErrorDisplay] = useState(<></>);
    let data = [];
    return (
        <div className='split-page'>
            <div className='left'>
                <ScheduleTimetable/>
            </div>
            <div className='right'>
                {/* {errorDisplay} */}
                <Schedule schedule={data}/>
            </div>
        </div>
    );
}
