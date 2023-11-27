import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { process_comma_separated_text, fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';
function EnemiesCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [enemiesList, setEnemiesList] = useState([]);
    const handleClose = () => {
        setShow(false);
        setEnemiesList([]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(enemiesList.length < 2){
            //throw error
            
        }
        else{
        for(let i = 0; i < enemiesList.length - 1; i++){
            for(let j = i + 1; j < enemiesList.length; j++){
                try {
                    await fetchDataPOST(
                        "/students/createFriends/",
                        {   
                            student_id: enemiesList[i]._student_id,
                            other_student_ui_id: enemiesList[j]._student_ui_id,
                            enemy: true
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Seperate Students"}</Modal.Title>
                </Modal.Header>
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
