import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { process_comma_separated_text, fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';
function FriendsCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [friendsList, setFriendsList] = useState([]);
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const handleClose = () => {
        setShow(false);
        setFriendsList([]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(friendsList.length < 2){
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
            <p>Please add at least two students to friend group.</p>
            </Alert>)
        }
        else{    
            let erred = false;
            for(let i = 0; i < friendsList.length - 1; i++){
                for(let j = i + 1; j < friendsList.length; j++){
                    if(!studentData.find((student) => student._student_id === friendsList[i]._student_id).friend_ids.includes(friendsList[j]._student_id)){
                        try {
                            console.log(friendsList);
                            await fetchDataPOST(
                                "/students/createFriends/",
                                {   
                                    student_id: friendsList[i]._student_id,
                                    other_student_ui_id: friendsList[j]._student_ui_id,
                                    enemy: false,
                                    id_ui: false
                                }
                            )
                        } catch (err) {
                            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
                                <Alert.Heading>{"Status: " + err.status}</Alert.Heading>
                            <p>{"Error: " + err.message}</p>
                            </Alert>)
                            erred = true;
                        }
                    }
                    else{
                        setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
                        <p>{friendsList[i].firstname} and {friendsList[j].firstname} are already friends</p>
                        </Alert>)
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
