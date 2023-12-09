"use client"
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ImageAdd() {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };
    const [errorDisplay, setErrorDisplay] = useState(<></>);
    const [floorImage, setFloorImage] = useState(null);
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setFloorImage(imageFile);
        console.log(imageFile)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        //fetch request here
        handleClose()
    }
  
    return (
        <div>
            <Button onClick={handleShow}>Add a Floorplan Image</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{"Add a Floorplan Image"}</Modal.Title>
                </Modal.Header>
                {errorDisplay}
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

