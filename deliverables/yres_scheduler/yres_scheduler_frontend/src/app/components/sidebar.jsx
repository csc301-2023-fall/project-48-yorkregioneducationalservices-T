import * as React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

/**
 * Creates the Sidebar component to display row information(detailed information about an activity and the group attending it)
 */
function Sidebar({data, show, onHide}) {
    const [classNum, name, age, staffA, staffB, time, location, students] = [data.classNum, data.name, data.age, 
      data.staffA, data.staffB, data.time, data.location, data.students];

    // creates student dictionary to be passed into the info div
    const studs = Array.isArray(students) ? <>
      {students.map((student, index) => 
      <li key={index}>{student.name}</li>
      )}
    </> : <></>;

    const info = <div>
        {"Name: " + name}
        <br></br>
        {"Age: " + age}
        <br></br>
        {"Instructors: " + staffA + " and " + staffB}
        <br></br>
        {"Time: " + time}
        <br></br>
        {"Location: " + location}
        <br></br>
        <br></br>
        {"Students: "}
        <br></br>
        <ol>{studs}</ol>
    </div>
  
    return (
      <Offcanvas show={show} onHide={onHide} placement='end' scroll={true} backdrop={'static'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{"Description of Class " + classNum + ":"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {info}
        </Offcanvas.Body>
      </Offcanvas>
    );
  }

export default Sidebar;
