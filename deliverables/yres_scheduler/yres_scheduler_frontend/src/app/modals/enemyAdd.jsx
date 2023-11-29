import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { process_comma_separated_text, fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';
function EnemiesCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [enemiesList, setEnemiesList] = useState([]);
    const handleClose = () => {
        setShow(false);
        setEnemiesList([]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(enemiesList.length < 2){
            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
            <p>Please add at least two students to the enemy group.</p>
            </Alert>)
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
                            setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
                            <p>{"Error: " + err.message}</p>
                            </Alert>)
                            erred = true;
                        }
                    }
                    else{
                    setErrorDisplay(<Alert variant="danger" onClose={() => setErrorDisplay(<></>)} dismissible>
                    <p>{enemiesList[i].firstname} and {enemiesList[j].firstname} are already enemies</p>
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
