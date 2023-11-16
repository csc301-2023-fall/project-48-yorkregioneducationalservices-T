import Alert from '@/app/components/alert';

/**
 * Helper function to sort rows of a schedule by their time attribute. Preconditions: Schedule uses 24hr time.
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
 */
export function validRelationship(string, field, setError, students) {
    if(string === ''){
        return true
    }
    const studentNames = students.map(student => {return student.firstname + " " + student.lastname})
    const names = string.split(',').map(s => s.trim().replace(/\s/, ' '));
    for (const name of names) {
        if (!studentNames.includes(name)){
            setError(<Alert simpleMessage={field + " field invalid, " + name + " isn't a known student"}/>)
            return false
        }
    }
    return true
}