import Schedule from '../../components/scheduleTable'
import Alert from '@/app/components/alert';
import { fetchDataGET } from '@/app/helper';
import ScheduleTimetable from '@/app/components/scheduleTimetable';

/** 
 * Schedules page that generates and displays schedule and groups
**/
export default async function Schedules() {
    const schedule_object = await fetchDataGET("/schedule/getCurrent/");
    const room_object = await fetchDataGET("/room/all/");
    const students_object = await fetchDataGET("/student/all/");
    let errorDisplay = <></>;
    let err_message = ""
    if (room_object.error){
        err_message = "Rooms Error: " + room_object.err_message + "\n"
    }
    if (schedule_object.error){
        err_message = err_message + "Schedule Error: " + schedule_object.err_message + "\n"
    }
    if (err_message != ""){
        errorDisplay = <Alert simpleMessage={"Fetching Failed"} complexMessage={err_message}/>
    }
    const rooms = room_object.data.rooms;
    let schedule = [[]];
    schedule = schedule_object?.data?.schedule || [[]];
    const students = students_object.data.students;
    const groups = new Set(); // Holds the possible camp groups to be displayed in the dropdown
    
    // Check if schedule[0] is an array before using forEach
    if (Array.isArray(schedule[0])) {
        schedule[0].forEach((row, rowIndex) => groups.add("Group ".concat(rowIndex.toString())));
    }

    return (
        <div className='split-page'>
            <div className='left'>
                <ScheduleTimetable schedule={schedule} rooms={rooms} groups={groups}/>
            </div>
            <div className='right'>
            {errorDisplay}
                <Schedule schedule={schedule} rooms={rooms} students={students} groups={groups}/>
            </div>
        </div>
    );
}
