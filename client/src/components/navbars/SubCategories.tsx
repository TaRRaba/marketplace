import { Dropdown, div } from 'flowbite-react';

export default function Placement() {
  return (

    <div className="flex flex-col gap-4">
    <div className="flex items-center gap-4">

<Dropdown style={{color:'black'}}
label="Category 1"
placement="right-start"
>
<Dropdown.Item>
  SubCategory 1
</Dropdown.Item>
<Dropdown.Item>
SubCategory 2
</Dropdown.Item>
<Dropdown.Item>
SubCategory 3
</Dropdown.Item>

</Dropdown>

</div>
    </div>
  )
}
