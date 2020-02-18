/**
 * 제작 : emirue
 * 날짜 : 2020/02/19
 * 내용 : header page
 */

import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';

function Header(): JSX.Element {
  const currentUser = useTracker(() => Meteor.user(), []);
  return (
    <Navbar bg="light" expand="lg">
      <NavbarBrand href="/">Simpl Board</NavbarBrand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {currentUser ?
          <>
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </> :
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/join">Join</Nav.Link>
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
