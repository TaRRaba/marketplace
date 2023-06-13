import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';
import SubCategories from './SubCategories';

export default function DropdownItemsWithIcon() {
  return (
    <Dropdown style={{color:'black'}}  label="Catalog">
      
      <Dropdown.Item icon={HiCog}>
        <SubCategories/>
      </Dropdown.Item>
    
    </Dropdown>
  )
}