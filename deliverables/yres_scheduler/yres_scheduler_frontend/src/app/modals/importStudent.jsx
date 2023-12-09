import { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import StudentCSV from '../components/importStudentCSV';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { CSVLink } from "react-csv";
import { useRouter } from 'next/navigation';
function processData(allText) {
    var allTextLines = allText.split(".");
    var lines = [];
    allTextLines.forEach((line)=>{
        const line_arr = line.split(',');
        lines.push([line_arr[0], line_arr[1], line_arr[2], line_arr[3], line_arr[4], line_arr[5], line_arr[6]])
    })
    return lines;
}
function StudentImport({show, setShow, type}) {
    const [error, setError] = useState(null);
    const router = useRouter();
    const handleClose = () => {
        setError(null)
        setShow(false)
        router.refresh()
    };
    const csvData = processData("student_id,firstname,lastname,age,sex,friend_ids,enemy_ids.1,John,jordan,12,M,,.2, Mary, Richards,8,F,,1.3,abiha,elkhalifa,10,F,4,.4,ewan,jordan,13,M,,.5,Majed,elkhalifa,12,M,4,");
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{"Import Profiles"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert show={error !== null} variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
                <p> Note: The CSV file used to import students must be of a specific organization. Specifically, the headers of the file must be 
                    identical to those in the example file found below. Furthermore, friend/enemy preferences should only be added within the add friend/
                    enemy modal.
                </p>
                <p>
                    This operation may take a while. You may need to refresh to view some added students.
                </p>
                <StudentCSV handleClose={handleClose} setError={setError} ></StudentCSV>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Body>
            <Modal.Footer>
            <CSVLink className="btn btn-secondary right-btn" filename= {("example-profiles.csv")} data={csvData}>
                Download Example Profile csv
            </CSVLink>
            </Modal.Footer>
        </Modal>
    );
  
}

export default StudentImport;

