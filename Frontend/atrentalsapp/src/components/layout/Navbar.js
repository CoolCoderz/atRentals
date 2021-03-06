import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarText>@Rentals</NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Rent</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/">Lease/ Give</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Books
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Latest
                </DropdownItem>
                <DropdownItem>
                  Trending
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Other Categories
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/">How this Works</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Contact Us</NavLink>
            </NavItem>
          </Nav>          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navbar;