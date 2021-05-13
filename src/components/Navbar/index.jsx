
  
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={process.env.PUBLIC_URL + '/images/h0ck-logo.png'} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/dashboard' activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/jobs' activeStyle>
            Jobs
          </NavLink>
          <NavLink to='/tester' activeStyle>
            Tester
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
