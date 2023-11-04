import * as React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DropdownButton from 'react-bootstrap/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

/**
 * Creates the Sidebar component to display row information(detailed information about an activity and the group attending it)
 */
function Refined({handleSelect, displayText, groups}) {
  
    return (
      <Dropdown onSelect={handleSelect}>
          <Button variant="sucess" id="refined-dropdown"> {displayText}</Button>
          <Dropdown.Toggle split variant="secondary" id="refined-dropdown"/>

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

export default Refined;
