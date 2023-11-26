import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import YresTable from './table'
import { useRouter } from 'next/navigation';
import FormLabel from 'react-bootstrap/FormLabel'
/** 
 * Student Table that displays:
 * class Student {
   *student_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    age (int) 			// <UI>
    sex (string) 		// <UI>
    friend_ids (set<string>) 	// The set of student_ids of students that this student prefer to work with
    enemy_ids (set<string>) 	// The set of student_ids of students that this student doesn't want to work with
 * Props: 
        studentData - a list of student objects with above attributes
}
**/
function FriendSearchTable({friends, setFriends, studentData}) {
    const router = useRouter();
    const studentFriendData = studentData.map((item) => ({_student_ui_id: item._student_ui_id, firstname: item.firstname, lastname: item.lastname}));
    const columns = [{
        dataField: '_student_ui_id',
        text: 'ID'
    },{
        dataField: 'firstname',
        text: 'First Name'
    },{
        dataField: 'lastname',
        text: 'Last Name'
    },{
        dataField: 'actions',
        text: 'Actions'
    }]
    studentFriendData.forEach(item => {
        const addToList = () =>{
            var updatedList = friends.map((item) => ({_student_ui_id: item._student_ui_id, firstname: item.firstname, lastname: item.lastname}));
            updatedList.push({_student_ui_id: item._student_ui_id, firstname: item.firstname, lastname: item.lastname});
            setFriends(updatedList);
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>Add to friend group</Tooltip>}>
                    <Button variant="success" onClick={addToList} className='action-button'>
                    </Button>
                </OverlayTrigger>
            </div>
        )
    })
    const friendList = friends.map((item) => ({_student_ui_id: item._student_ui_id, firstname: item.firstname, lastname: item.lastname}));
    friendList.forEach(item => {
        const removeFromList = () =>{
            var updatedList = friendList;
            const index = updatedList.indexOf(item);
            updatedList.splice(index, 1);
            setFriends(updatedList);
        }
        item.actions = (
            <div className='table-actions'>
                <OverlayTrigger placement="right-start" overlay={<Tooltip>Remove</Tooltip>}>
                    <Button variant="danger" onClick={removeFromList} className='action-button'>
                    </Button>
                </OverlayTrigger>
            </div>
        )
    })

    return (
        <>
            <YresTable keyCol={'_student_ui_id'} data={studentFriendData} columns={columns} disableHover={true} friend_table={true}/>
            <FormLabel>Friend Group</FormLabel>
            <YresTable keyCol={'noSearch'} data={friendList} columns={columns} disableHover={true} friend_table={true}/>
        </>
    )   
}

export default FriendSearchTable;