// 'use client';

import { Dropdown } from 'flowbite-react';
import CattegotiesFinal from './CattegotiesFinal';

export default function InlineDropdown() {
  return (
    <Dropdown
      inline
      label="Dropdown"
    >
      <Dropdown.Item>
       <CattegotiesFinal/>
      </Dropdown.Item>
      <Dropdown.Item>
      <CattegotiesFinal/>
      </Dropdown.Item>
      <Dropdown.Item>
      <CattegotiesFinal/>
      </Dropdown.Item>
      <Dropdown.Item>
      <CattegotiesFinal/>
      </Dropdown.Item>
    </Dropdown>
  )
}
