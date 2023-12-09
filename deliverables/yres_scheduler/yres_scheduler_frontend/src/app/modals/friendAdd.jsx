import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';

/*
 * A modal to create a group of students to all make friends
 * 
 * Props:
 *      show - boolean to determine whether to show the modal
 *      setShow - setter for show 
 *      studentData - a list of all students
 */
function FriendsCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [friendsList, setFriendsList] = useState([]);
    let errorDisplay = <></>;
    const [errorMessage, setErrorMessage] = useState("");
    const handleClose = () => {
        setShow(false);
        setFriendsList([]);
        setErrorMessage("")
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(friendsList.length < 2){
            setErrorMessage("Please add at least two students to friend group.")
        }
        else{    
            let erred = false;
            for(let i = 0; i < friendsList.length - 1; i++){
                for(let j = i + 1; j < friendsList.length; j++){
                    if(!studentData.find((student) => student._student_id === friendsList[i]._student_id).friend_ids.includes(friendsList[j]._student_id)){
                        try {
                            await fetchDataPOST(
                                "/student/create/friends/",
                                {   
                                    student_id: friendsList[i]._student_id,
                                    other_student_ui_id: friendsList[j]._student_ui_id,
                                    enemy: false,
                                    id_ui: false
                                }
                            )
                        } catch (err) {
                            setErrorMessage(err.message);
                            erred = true;
                        }
                    }
                    else{
                        setErrorMessage(friendsList[i].firstname.concat(" and ").concat(friendsList[j].firstname).concat(" are already friends"))
                        erred = true;
                    }
                }
            }
            if(!erred){
                router.refresh();
                handleClose();
            }
        }
    }
    if (errorMessage != ""){
        errorDisplay = <Alert complexMessage={errorMessage}/>
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Create Friend Group"}</Modal.Title>
                </Modal.Header>
                {errorDisplay}
                <Modal.Body>
                    <FriendSearchTable studentData={studentData} friends={friendsList} setFriends={setFriendsList}/> 
                    <Form onSubmit={handleSubmit}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Make Friends
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
  }

export default FriendsCreate;
