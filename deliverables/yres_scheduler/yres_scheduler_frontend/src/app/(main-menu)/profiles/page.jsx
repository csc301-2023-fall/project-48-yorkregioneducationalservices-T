import ProfilesSwitcher from "@/app/components/profilesSwitcher";
import Alert from "@/app/components/alert";
import { fetchDataGET } from '@/app/helper';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;
/**
 * The Profiles page that allows for viewing, adding and editing student and counselor profiles
**/
async function Profiles() {

    let errorDisplay = <></>;
    let err_message = ""
    const students = await fetchDataGET("/student/all/");
    const counselors = await fetchDataGET("/counselor/all/");
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