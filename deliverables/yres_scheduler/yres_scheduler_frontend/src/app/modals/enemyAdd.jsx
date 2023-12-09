import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';

/*
 * A modal to create a group of students to all make enemies
 * 
 * Props:
 *      show - boolean to determine whether to show the modal
 *      setShow - setter for show 
 *      studentData - a list of all students
 */
function EnemiesCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    let errorDisplay = <></>;
    const [enemiesList, setEnemiesList] = useState([]);
    const handleClose = () => {
        setShow(false);
        setErrorMessage("")
        setEnemiesList([]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(enemiesList.length < 2){
            setErrorMessage("Please add at least two students to enemy group.")
        }
        else{
            let erred = false;
            for(let i = 0; i < enemiesList.length - 1; i++){
                for(let j = i + 1; j < enemiesList.length; j++){
                    if(!studentData.find((student) => student._student_id === enemiesList[i]._student_id).enemy_ids.includes(enemiesList[j]._student_id)){
                        try {
                            await fetchDataPOST(
                                "/student/create/friends/",
                                {   
                                    student_id: enemiesList[i]._student_id,
                                    other_student_ui_id: enemiesList[j]._student_ui_id,
                                    enemy: true,
                                    id_ui: false
                                }
                            )
                        } catch (err) {
                            setErrorMessage(err.message);
                            erred = true;
                        }
                    }
                    else{
                        setErrorMessage(friendsList[i].firstname.concat(" and ").concat(friendsList[j].firstname).concat(" are already enemy"))
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Seperate Students"}</Modal.Title>
                </Modal.Header>
                {errorDisplay}
                <Modal.Body>
                    <FriendSearchTable studentData={studentData} friends={enemiesList} setFriends={setEnemiesList} enemy={true}/> 
                    <Form onSubmit={handleSubmit}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Make Enemies
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
    );
  }

export default EnemiesCreate;
