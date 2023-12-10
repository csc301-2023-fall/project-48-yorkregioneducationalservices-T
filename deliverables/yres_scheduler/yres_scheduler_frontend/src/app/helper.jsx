import Alert from '@/app/components/alert';
const URI = process.env.NEXT_PUBLIC_BACKEND_URI;
/**
 * Helper function to sort rows of a schedule by their time attribute. Preconditions: Schedule uses 24hr time.
 * Props: 
        a - string in time format i.e. 9:00
        b - string in time format i.e. 9:00
 */
export function sort_times(a, b) {
    let startA = parseInt(a.time.split(":")[0]);
    let startB = parseInt(b.time.split(":")[0]);
    if (startA < startB) {
        return -1;
    }
    if (startA > startB) {
        return 1;
    }
    return 0;
}

/**
 * Helper function to check if a list of names are pre-exisitng students
 * Props: 
        string - a string with a list of names to be validated
        field - the field this is being called for
        setError - the state function to be called if an error is found
        students - a list of all existing students
 */
export function validRelationship(string, field, setError, students) {
    if(string === ''){
        return true
    }
    const studentNames = students.map(student => {return student._student_ui_id})
    const names = string.split(',').map(s => s.trim().replace(/\s/, ' '));
    for (const name of names) {
        if (!studentNames.includes(parseInt(name))){
            setError(<Alert simpleMessage={field + " field invalid, " + name + " isn't a known student"}/>)
            return false
        }
    }
    return true 
}
/**
 * Helper function to break down a comma separated string of inputs
 * into a properly formatted list
 * 
 * Props:
 *      input - a string of inputs separated by commas
 */
export function process_comma_separated_text(input) {
    return typeof input === 'string' ? input.split(',').map(s => s.trim().replace(/\s/, ' ')).join() : "";
}

/**
 * Helper function to make a POST request. Throws an error if the request fails
 * or if the request returns a non 200 response.
 * 
 * Input:
 *      route - a string representing the route from the base URI to send this request
 *      item - the JSON item being sent
 */
export async function fetchDataPOST(route, item) {
    const session = await fetchSession();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}${route}`;
    const settings = {
        method: 'POST',
        headers: { authorization: session.backend_t, 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    }
    const response = await fetch(url, settings);
    if ((!(199 < response.status && response.status < 300))) {
        const promiseRes = await response.text()
        const jsonErrMsg = JSON.parse(promiseRes);
        throw new Error(`${response.status} ${response.statusText}, Error: ${jsonErrMsg.message}`)
    }
    return response;
        

}

/**
 * Helper function to make a DELETE request. Throws an error if the request fails
 * or if the request returns a non 200 response.
 * 
 * Input:
 *      route - a string representing the route from the base URI to send this request
 */
export async function fetchDataDELETE(route) {
    const session = await fetchSession();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}${route}`;
    const settings = {
        method: 'DELETE',
        headers: { authorization: session.backend_t, 'Content-Type': 'application/json' },
    }
    const response = await fetch(url, settings);
    if ((!(199 < response.status && response.status < 300))) {
        const promiseRes = await response.text()
        const jsonErrMsg = JSON.parse(promiseRes);
        throw new Error(`${response.status} ${response.statusText} Error: ${jsonErrMsg.message}`)
    }
    return response;
}

/**
 * Helper function to make a server side GET request. Throws an error if the request fails
 * or if the request returns a non 200 response.
 * 
 * Input:
 *      route - a string representing the route from the base URI to send this request
 *      token - a JWT token to authorize request in the backend
 */
export async function fetchDataGET(route, token){
    try {
        const settings = {
            cache: 'no-store',
            headers: { authorization: token }
        }
        const res = await fetch(`${URI}${route}`, settings);
        const data = await res.json();
        return {
            error: false,
            data: data,
            err_message: ""
        };
    } catch (error) {
        return {
            error: true,
            data: [],
            err_message: error.message
        };
    }
}

// Helper to fetch the current session in the frontend (both client and server components)
export async function fetchSession() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URI}/api/auth/session`);
        const session = await res.json();
        return session;
    } catch (err) {
        return {
            user: "Unknown",
            backend_t: undefined
        }
    }
}

export function sort_table_data(search, keyCol, data){
    var data_display = data;
    var search = search.toLowerCase();
    if(keyCol === "_student_ui_id"){
        if(search !== ""){
            data_display = data_display.filter((item)=> item._student_ui_id.toString().includes(search) || item.firstname.toLowerCase().includes(search) || item.lastname.toLowerCase().includes(search));
        }
        data_display = [...(data_display)].sort((a,b) => a._student_ui_id - b._student_ui_id); 
      } 
    else if(keyCol === "_counselor_id"){
        if(search !== ""){
            data_display = data_display.filter((item)=> item.firstname.toLowerCase().includes(search) || item.lastname.toLowerCase().includes(search));
        }
        data_display = [...data_display].sort((a,b) => (a._counselor_id < b._counselor_id ? -1 : 1)); 
    }
    else if(keyCol === "activity_id"){
        if(search !== ""){
            data_display = data_display.filter((item)=> (item.name).toLowerCase().includes(search));
        }
        data_display = [...data_display].sort((a,b) => (a.activity_id < b.activity_id ? -1 : 1)); 
    }
    else if(keyCol === "room_id"){
        if(search !== ""){
            data_display = data_display.filter((item)=> (item.name).toLowerCase().includes(search));
        }
        data_display = [...data_display].sort((a,b) => (a.room_id < b.room_id ? -1 : 1)); 
    }
    return data_display;
}