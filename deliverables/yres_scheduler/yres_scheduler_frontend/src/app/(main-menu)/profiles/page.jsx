import ProfilesSwitcher from "@/app/components/profilesSwitcher";
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

// GET students frontend server side
async function getStudents() {
    try{
    const res = await fetch(`${URI}/student/all/`, { cache: 'no-store' });
    const data = await res.json();
    return data.result;
    }
    catch{
        return [];
    }
}

// GET counselors frontend server side
async function getCounselors() {
    try{
    const res = await fetch(`${URI}/counselor/all/`, { cache: 'no-store' });
    const data = await res.json();
    return data.result;
    }
    catch{
        return [];
    }
}


/**
 * The Profiles page that allows for viewing, adding and editing student and counselor profiles
**/
async function Profiles() {
    const students = await getStudents();
    const counselors = await getCounselors();
    return <ProfilesSwitcher studentData={students} counselorData={counselors}/>;
}

export default Profiles;