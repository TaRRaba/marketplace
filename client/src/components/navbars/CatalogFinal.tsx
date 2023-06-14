

import { Dropdown } from 'flowbite-react';
import CattegotiesFinal from './CattegotiesFinal';

export default function InlineDropdown() {
  return (
    <Dropdown
      
      label="Dropdown"
      placement="bottom"
    >
      <Dropdown.Item>
        {/* Привет */}
       <CattegotiesFinal/>
      </Dropdown.Item>
      <Dropdown.Item>
      {/* Привет */}
      <CattegotiesFinal/>
      </Dropdown.Item>
      <Dropdown.Item>
      {/* Привет */}
      <CattegotiesFinal/>
      </Dropdown.Item>
      <Dropdown.Item>
      {/* Привет */}
      <CattegotiesFinal/>
      </Dropdown.Item>
    </Dropdown>
  )
}
