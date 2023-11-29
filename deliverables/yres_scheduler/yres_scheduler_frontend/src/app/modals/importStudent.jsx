import { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import StudentCSV from '../components/importStudentCSV';
import Button from 'react-bootstrap/Button';
import Alert from '@/app/components/alert';
import { CSVLink } from "react-csv";
import { validRelationship, process_comma_separated_text, fetchDataPOST  } from '@/app/helper';
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
    const [error, setError] = useState(<></>);
    const router = useRouter();
    const handleClose = () => {
        setError(<></>)
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
                <p> Note: The CSV file used to import students must be of a specific organization. Specifically, the headers of the file must be 
                    identical to those in the example file found below. Furthermore, friend/enemy preferences should only be added within the add friend/
                    enemy modal.
                </p>
                <p>
                    You may need to refresh to view some added students.
                </p>
                <StudentCSV type={type}></StudentCSV>
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

