import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * Addition Modal for Students
 * 
 * */
function RoomsCreate({show, setShow }) {
    const handleClose = () => setShow(false);
    const handleSubmit = () => {
        handleClose()
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Add New Room"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                    />
                    </Form.Group> 
                    <Form.Group
                    className="mb-3"
                    >
                    <Form.Label>Activities in this room (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                    />
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
  }

export default RoomsCreate;