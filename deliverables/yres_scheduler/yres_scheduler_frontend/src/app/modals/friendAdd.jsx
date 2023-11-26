import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { process_comma_separated_text, fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';
function FriendsCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [friendsList, setFriendsList] = useState([]);
    const handleClose = () => {
        setShow(false);
        setFriendsList([]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(friendsList.length < 2){
            //throw error
            
        }
        else{
            
        for(let i = 0; i < friendsList.length - 1; i++){
            for(let j = i + 1; j < friendsList.length; j++){
                try {
                    console.log(friendsList);
                    await fetchDataPOST(
                        "/students/createFriends/",
                        {   
                            student_id: friendsList[i]._student_id,
                            other_student_ui_id: friendsList[j]._student_ui_id
                        }
                    )
                } catch (err) {
                    //TODO: Display Error in component
                    console.log(err);
                }
            }
        }
        }
        router.refresh();
        handleClose();

    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Create Friend Group"}</Modal.Title>
                </Modal.Header>
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
