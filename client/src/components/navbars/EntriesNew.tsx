import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';

export default function Entries() {
  return (
    <Dropdown style={{color:'black'}}  label="Dropdown">
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
        Sing in
      </Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>
        Sing up
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}