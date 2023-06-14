import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownDivider, Chevron } from 'flowbite-svelte'


export const DropDownCatalog = () => {
  return (
    <>
    <Button><Chevron>Dropdown button</Chevron></Button>
<Dropdown>
  <DropdownItem>Dashboard</DropdownItem>
  <DropdownItem class="flex items-center justify-between"><Chevron placement="right">Dropdown</Chevron></DropdownItem>
  <Dropdown placement="right-start">
    <DropdownItem>Overview</DropdownItem>
    <DropdownItem>My downloads</DropdownItem>
    <DropdownItem>Billing</DropdownItem>
  </Dropdown>
  <DropdownItem>Earnings</DropdownItem>
  <DropdownItem slot="footer">Sign out</DropdownItem>
</Dropdown>
    </>
  )
}
