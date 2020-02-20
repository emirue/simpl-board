/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 : admin header
 */

import * as React from 'react';
import { Navbar, NavbarBrand, Nav, NavDropdown } from 'react-bootstrap';

function AdminHeader(): JSX.Element {
  return (
    <Navbar bg="light" expand="lg">
      <NavbarBrand href="/admin">Simpl Board</NavbarBrand>
      <Nav className="mr-auto">
        <Nav.Link href="/admin/">Home</Nav.Link>
        <Nav.Link href="/admin/settings/">Settings</Nav.Link>
        <NavDropdown title="Board" id="nav-dropdown-board">
          <NavDropdown.Item href="/admin/board">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/">Page</Nav.Link>
        <Nav.Link href="/logout">Logout</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminHeader;
