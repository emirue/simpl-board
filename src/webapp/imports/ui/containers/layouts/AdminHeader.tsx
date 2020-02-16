/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 : admin header
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Image, Nav, NavLink } from 'react-bootstrap';

function AdminHeader() {
  return (
    <header className="app-header navbar">
      <Link className="navbar-brand" href="/">
        <Image src="" height={25} alt="simpl board"/>
      </Link>
      <Nav className="navbar-nav mr-auto d-md-down-none">
        <Nav.Item className="px-3">
          <NavLink href="/admin/">Home</NavLink>
        </Nav.Item>
        <Nav.Item className="px-3">
          <NavLink href="/admin/settings/">Settings</NavLink>
        </Nav.Item>
        <Nav.Item className="px-3">
          <NavLink href="/admin/board/">Board</NavLink>
        </Nav.Item>
      </Nav>
    </header>
  );
}

export default AdminHeader;
