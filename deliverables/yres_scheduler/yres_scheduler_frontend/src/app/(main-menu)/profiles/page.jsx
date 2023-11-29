import ProfilesSwitcher from "@/app/components/profilesSwitcher";
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

// GET students frontend server side
async function getStudents() {
    const res = await fetch(`${URI}/student/all/`, { cache: 'no-store' });
    const data = await res.json();
    return data.result;
}

// GET counselors frontend server side
async function getCounselors() {
    const res = await fetch(`${URI}/counselor/all/`, { cache: 'no-store' });
    const data = await res.json();
    return data.result;
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