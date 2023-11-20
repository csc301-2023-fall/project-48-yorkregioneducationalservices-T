"use client"
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import * as XLSX from "xlsx";
import { Form } from 'react-bootstrap';
import { send_post_request } from '../helper';
import { useRouter } from 'next/navigation';

function AddStudents(profiles, type){
  if(type === "Student"){
    const students = profiles;
    students.forEach((student) => {
      send_post_request(
        "/students/createStudent/", 
        {
            student_ui_id: student.student_id, 
            firstname: student.firstname, 
            lastname: student.lastname, 
            age: student.age, 
            sex: student.sex,
            friend_ids: "",
            enemy_ids: "",
        }
      )
    });
  }
  else{
    const counselors = profiles;
    counselors.forEach((counselor) => {
      send_post_request(
        "/counselors/createCounselor/",
        {
            firstname: counselor.firstname,
            lastname: counselor.lastname
        }
      );
    });
  }
}
/**
 * Generates a CSV of students
* Props: 
        type - either student or counselor, the type of object being csv imported
**/
function StudentCSV({type}) {
  const router = useRouter();
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
      router.refresh();
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