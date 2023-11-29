import * as React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

/**
 * Better looking dropdown component that matches the prototype
 **/
function RefinedDropdown({handleSelect, displayText, groups}) {
  
    return (
      <Dropdown onSelect={handleSelect}>
        <Button variant="light" className="black-border"> {displayText}</Button>
          <Dropdown.Toggle split variant="secondary" className="black-border" id="dropdown-arrow">
          </Dropdown.Toggle>
          <Dropdown.Menu>
              {Array.from(groups).map((val) => {
                  return (
                      <Dropdown.Item key={val} eventKey={val} >{val}</Dropdown.Item>
                  )
              })}
          </Dropdown.Menu>
      </Dropdown>
    );
  }

export default RefinedDropdown;
