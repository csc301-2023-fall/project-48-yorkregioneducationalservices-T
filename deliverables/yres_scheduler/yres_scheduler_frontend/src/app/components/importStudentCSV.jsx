"use client"
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import * as XLSX from "xlsx";
import { Form } from 'react-bootstrap';
function AddStudents(profiles, type){
  if(type === "Student"){
    const students = profiles;
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
  else{
    const counselors = profiles;
    console.log(counselors);
    counselors.forEach((counselor) => {
      console.log("Counselor Information")
      console.log(counselor.firstname)
      console.log(counselor.lastname)
      console.log(counselor.campus_id)
    });
  }
}
/**
 * Generates a CSV of students
* Props: 
        type - either student or counselor, the type of object being csv imported
**/
function StudentCSV({type}) {
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
    if(file){
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
      AddStudents(d, type);
    });
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    readExcel(file);
  }
  return (
    <div>
      <Form className="form-inline" onSubmit={handleSubmit}>
        <Form.Group className="inline-div">
          <Form.Control
              type="file"
              accept=".csv"
              id="csvFileInput"
              onChange={handleOnChange}
          />
        </Form.Group> 
        <div className='inline-div'>
        <Button type='submit'>Import {type}</Button>
        </div>
      </Form>
    </div>
  );
}

export default StudentCSV;