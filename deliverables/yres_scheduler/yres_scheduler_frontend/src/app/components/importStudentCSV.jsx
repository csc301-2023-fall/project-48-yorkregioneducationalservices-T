"use client"
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import * as XLSX from "xlsx";
import { Form } from 'react-bootstrap';
/**
 * Editing Modal for Activities
 * 
 * */
function AddStudents(students){
  console.log(students);
  students.forEach((student) => {
    console.log("Student Information")
    console.log(student.firstname)
    console.log(student.lastname)
    console.log(student.age)
    console.log(student.sex)
    console.log(student.friends)
    console.log(student.enemies)
    

  });
}
function StudentCSV() {
  const [file, setFile] = useState();
  // useEffect(() => {
  //   const fileReader = new FileReader();
  //   // ...
  // }, [file]);
  // const fileReader = new FileReader();
  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {
                type: "buffer"
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            console.log(data);
            resolve(data);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
    promise.then((d) => {
      AddStudents(d);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    readExcel(file);
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
              type="file"
              accept=".csv"
              id="csvFileInput"
              onChange={handleOnChange}
          />
        </Form.Group> 
        <Button type='submit'>Import Students</Button>
      </Form>
    </div>
  );
}

export default StudentCSV;