import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { process_comma_separated_text, fetchDataPOST } from '../helper';
import { useRouter } from 'next/navigation';
import FriendSearchTable from '../components/friendSearchTable';
import FriendListTable from '../components/friendListTable';
function FriendsCreate({show, setShow, studentData}) {
    const router = useRouter();
    const [friendsList, setFriendsList] = useState([]);
    const handleClose = () => {
        setShow(false);
        setFriendsList([]);
    }
    const handleSubmit = async (event) => {
        // event.preventDefault();
        // try {
        //     await fetchDataPOST(
        //         "/activities/createActivity/",
        //         {
        //             name: event.target[0].value,
        //             duration: event.target[1].value,
        //             type: event.target[3].checked ? "filler" : "common",
        //             num_occurences: event.target[4].value,
        //             camp_id: currCampus.camp_ids[0],
        //             room_ids: "" //process_comma_separated_text(event.target[2].value);
        //         }
        //     )
            router.refresh();
            handleClose();
        // } catch (err) {
        //     //TODO: Display Error in component
        //     console.log(err);
        // }
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
