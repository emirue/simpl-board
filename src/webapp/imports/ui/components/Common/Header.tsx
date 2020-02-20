/**
 * 제작 : emirue
 * 날짜 : 2020/02/19
 * 내용 : header page
 */

import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
// @ts-ignore
import { Roles } from 'meteor/alanning:roles';

function Header({currentUser, isLoading, isAdmin}): JSX.Element {

  return (
    <Navbar bg="light" expand="lg">
      <NavbarBrand href="/">Simpl Board</NavbarBrand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {currentUser ?
          <>
            {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
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

export default withTracker(() => {
  const handle = Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    isLoading: !handle.ready(),
    isAdmin: Roles.userIsInRole(Meteor.userId(), ['admin']),
  };
})(Header);
