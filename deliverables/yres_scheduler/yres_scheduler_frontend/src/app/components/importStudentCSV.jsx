"use client"
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import * as XLSX from "xlsx";
import { Form } from 'react-bootstrap';
/**
 * Editing Modal for Activities
 * 
 * */
function AddStudents(profiles, type){
  if(type === "Student"){
    const students = profiles;
    console.log(students);
    students.forEach((student) => {

      const bodyData = new URLSearchParams(
        {
            'student_ui_id': student.student_id, 
            'firstname': student.firstname, 
            'lastname': student.lastname, 
            'age': student.age, 
            'sex': student.sex,
            'friend_ids': student.friend_ids === undefined ? []: toString(student.friend_ids).split(',').map(s => s.trim().replace(/\s/, ' ')),
            'enemy_ids': student.enemy_ids === undefined ? []: toString(student.enemy_ids).split(',').map(s => s.trim().replace(/\s/, ' '))
        }).toString();
    console.log(bodyData);
    fetch(process.env.NEXT_PUBLIC_BACKEND_URI.concat("/students/createStudent/"), {
        method: "POST", 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData,
    })
    });
  }
  else{
    const counselors = profiles;
    console.log(counselors);
    counselors.forEach((counselor) => {
      const bodyData = new URLSearchParams(
        {
            'firstname': counselor.firstname, 
            'lastname': counselor.lastname, 
            'campus_id': counselor.campus_id
        }).toString();

    console.log(bodyData);
    fetch(process.env.NEXT_PUBLIC_BACKEND_URI.concat("/counselors/createCounselor/"), {
        method: "POST", 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: bodyData,
    })
    });
  }
}
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