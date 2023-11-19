import ProfilesSwitcher from "@/app/components/profilesSwitcher";
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;

// GET students frontend server side
async function getStudents() {
    const res = await fetch(`${URI}/students/getAllStudents/`, { cache: 'no-store' });
    const data = await res.json();
    return data.students;
}

// GET counselors frontend server side
async function getCounselors() {
    const res = await fetch(`${URI}/counselors/getAllCounselors/`, { cache: 'no-store' });
    const data = await res.json();
    return data.counselors;
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