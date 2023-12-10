import ProfilesSwitcher from "@/app/components/profilesSwitcher";
import Alert from "@/app/components/alert";
import { fetchDataGET } from '@/app/helper';
import options from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
/**
 * The Profiles page that allows for viewing, adding and editing student and counselor profiles
**/
async function Profiles() {
    const session = await getServerSession(options);
    let errorDisplay = <></>;
    let err_message = ""
    const students = await fetchDataGET("/student/all/", session.backend_t);
    const counselors = await fetchDataGET("/counselor/all/", session.backend_t);
    if (students.error){
        err_message = "Students Error: " + students.err_message + "\n"
    }
    if (counselors.error){
        err_message = err_message + "Counselors Error: " + counselors.err_message + "\n"
    }
    if (err_message != ""){
        errorDisplay = <Alert simpleMessage={"Fetching Failed"} complexMessage={err_message}/>
    }
    return (<>
        {errorDisplay}
    <ProfilesSwitcher studentData={students.data.students} counselorData={counselors.data.counselors}/>
    </>);
}

export default Profiles;