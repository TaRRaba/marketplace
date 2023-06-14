

import { Dropdown } from 'flowbite-react';


export default function InlineDropdown() {
  return (
    <Dropdown
      class='bg-green-300 rounded-lg'
      label="Каталог"
      placement="bottom"
    >
      <Dropdown class='bg-green-300 rounded-lg'
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
      <Dropdown class='bg-green-300 rounded-lg'
          label="Category 2"
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
      <Dropdown class='bg-green-300 rounded-lg'
          label="Category 3"
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
    </Dropdown>
  )
}
