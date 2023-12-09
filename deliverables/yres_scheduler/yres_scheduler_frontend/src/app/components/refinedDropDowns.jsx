import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Better looking dropdown component that matches the prototype
 * Props: 
        handleSelect - what happens when one of the dropdown's options is selected
        displayText - the text displayed before clicking
        groups - the options available in the dropdown to choose from
**/
function RefinedDropdown({handleSelect, displayText, groups}) {
  
    return (
      <Dropdown onSelect={handleSelect}>
        
          <Dropdown.Toggle split variant="secondary" className="black-border" id="dropdown-arrow">
          <span className='dropBar'>{displayText}</span>
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
