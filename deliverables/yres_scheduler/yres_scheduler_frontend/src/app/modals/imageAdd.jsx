"use client"
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

/**
 * Helper function to send a POST request to the backend to update the floorplan image. 
 * 
 * Props:
 *      img - The image to update
 */
async function updateImage(img) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/camp/floorplan`;
    const settings = {
        method: 'POST',
        body: img
    }
    const response = await fetch(url, settings);
    if ((!(199 < response.status && response.status < 300))) {
        const promiseRes = await response.text()
        const jsonErrMsg = JSON.parse(promiseRes);
        throw new Error(`${response.status} ${response.statusText}, Error: ${jsonErrMsg.message}`)
    }
    return response;
}

/*
 * Modal to update the floorplan image
 */
function ImageAdd() {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };
    const [errorDisplay, setErrorDisplay] = useState(null);
    const [floorImage, setFloorImage] = useState(null);
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setFloorImage(imageFile);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateImage(floorImage);
        } catch (err) {
            setErrorDisplay(err.message);
        }
        handleClose()
    }
  
    return (
        <div>
            <Button onClick={handleShow}>Add a Floorplan Image</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Add a Floorplan Image"}</Modal.Title>
                </Modal.Header>
                <Alert show={errorDisplay !== null} variant="danger" onClose={() => setErrorDisplay(null)} dismissible>
                    {errorDisplay}
                </Alert>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                        <Form.Label>Floorplan Image</Form.Label>
                        <Form.Control 
                            type="file" 
                            onChange={handleImageChange} 
                        />
                        </Form.Group>
                        {floorImage && (
                            <img
                                src={URL.createObjectURL(floorImage)}
                                alt="Selected Image"
                                style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                            />
                        )}
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

        
    );
  
}

export default ImageAdd;

