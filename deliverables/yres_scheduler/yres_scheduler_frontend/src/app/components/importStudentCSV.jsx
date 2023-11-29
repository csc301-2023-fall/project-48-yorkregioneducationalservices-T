import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import * as XLSX from "xlsx";
import { Form } from 'react-bootstrap';
import { fetchDataPOST, process_comma_separated_text } from '../helper';

/** 
 * Function that allows the mass import of students or counselor from a CSV:
 * class Student {
   *student_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    age (int) 			// <UI>
    sex (string) 		// <UI>
    friend_ids (set<string>) 	// The set of student_ids of students that this student prefer to work with
    enemy_ids (set<string>) 	// The set of student_ids of students that this student doesn't want to work with
}
*class Counselor {
   *counselor_id (string) 	// The auto generated unique ID
    firstname (string) 		// <UI>
    lastname (string) 		// <UI>
    campus_id (string) 		// <UI> The ID of the campus this counselor will teach in
}
 * Props: 
        profiles - a list of student or counselor objects depending on type attribute below
        type - either "Student" or "Counselor"
**/
function AddStudents(profiles, type){
  if(type === "Student"){
    const students = profiles;
    const addPreferences = async (prefs, type) => {
      for(const pref of prefs){
        console.log(pref);
        await fetchDataPOST("/student/create/friends/",
        {   
            student_id: pref[0],
            other_student_ui_id: pref[1],
            enemy: type,
            id_ui: true
        })
      }
    }
    const addStudent = (student) =>{
        try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}${"/student/create/"}`;
        const settings = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_ui_id: student.student_id, 
            firstname: student.firstname, 
            lastname: student.lastname, 
            age: student.age, 
            sex: student.sex,
            friend_ids: "",
            enemy_ids: ""
        })
      }
      const response = fetch(url, settings);
      if (!(200 <= response.status <= 299)) {
          throw new Error(`${response.status} Error: Something Wrong Happened!`)
      }
      }
      catch{
        
      }
    }
    students.forEach((student) => {
      addStudent(student);
    });
  }
  else{
    const counselors = profiles;
    counselors.forEach((counselor) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/counselor/create/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: counselor.firstname,
            lastname: counselor.lastname
        })
      })
      .catch(err => {
          console.log(err);
      });
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
      window.location.reload();
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