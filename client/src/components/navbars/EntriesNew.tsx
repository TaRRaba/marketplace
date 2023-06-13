import { Dropdown } from 'flowbite-react';
import React from 'react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DropdownItemsWithIcon() {
  // const [showModalReg, setShowModalRed] = React.useState(false);

  return (
    <Dropdown style={{background: "white", color:"black", }}
     label="Dropdown">
      <Dropdown.Header>
        <span className="block text-sm">
          Bonnie Green
        </span>
        <span className="block truncate text-sm font-medium">
          bonnie@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item icon={HiViewGrid}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
      <Link to='/login'>Sing in</Link>
        
      </Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>
      <Link to='/reg'>Sing up</Link>
       
        
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}