import Alert from '@/app/components/alert';

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
    console.log(names)
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
 * Helper function to make a POST
 * 
 * Props:
 *      route - a string representing the route from the base URI to send this request
 *      data - the JSON data being sent
 *      callback - (OPTIONAL) a function that runs after recieving a response back from the server
 */
export function send_post_request(route, data, callback) {
    let func = callback;
    if (typeof callback !== 'function') {
        func = _ => {};
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.status === 200) {
            window.location.reload();
            //return res.json();
        } else {
            throw new Error(`${res.status} error!`);
        }
    })
    .catch(err => {
        console.log(err);
    });
}