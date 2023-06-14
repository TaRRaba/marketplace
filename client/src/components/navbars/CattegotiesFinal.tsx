


import { Dropdown, div } from 'flowbite-react';

export default function Placement() {
  return (
    
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
     
        <Dropdown class='bg-green-300'
          label="Category 1"
          placement="right-start"
        >
          <Dropdown.Item>
            SubCategoties 1
          </Dropdown.Item>
          <Dropdown.Item>
            SubCategoties 2
          </Dropdown.Item>
          <Dropdown.Item>
            SubCategoties 3
          </Dropdown.Item>
      
        </Dropdown>
      </div>
    </div>
  )
}