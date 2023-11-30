import ProfilesSwitcher from "@/app/components/profilesSwitcher";
import Alert from "@/app/components/alert";
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

// GET students frontend server side
async function getStudents() {
     try{
        const res = await fetch(`${URI}/student/all/`, { cache: 'no-store' });
        const data = await res.json();
        return {
            error: false,
            students: data.students,
            err_message: ""
        };
    }
    catch (error) {
        return {
            error: true,
            students: [],
            err_message: error.message
        };
    }
}

// GET counselors frontend server side
async function getCounselors() {
    try{
        const res = await fetch(`${URI}/counselor/all/`, { cache: 'no-store' });
        const data = await res.json();
        return {
            error: false,
            counselors: data.counselors,
            err_message: ""
        };
    }
    catch (error) {
        return {
            error: true,
            counselors: [],
            err_message: error.message
        };
    }
}


/**
 * The Profiles page that allows for viewing, adding and editing student and counselor profiles
**/
async function Profiles() {
    let errorDisplay = <></>;
    let err_message = ""
    const students = await getStudents();
    const counselors = await getCounselors();
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
    <ProfilesSwitcher studentData={students.students} counselorData={counselors.counselors}/>
    </>);
}

export default Profiles;