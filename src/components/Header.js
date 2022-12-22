import { useState, useEffect, useCallback, useRef } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import personalLogo from '../static/images/logo_transparent512.png';

import "../static/styles/components/Header.css";

function Header() {
  const [ navBarClass, setNavBarClass ] = useState("header-navbar-scrolling");
  const [ pixelsScrolled, setPixelsScrolled ] = useState(window.scrollY);
  const [ isSticky, setSticky ] = useState(false);
  const [ height, setHeight ] = useState(0);
  const navbarRef = useRef(null);
  const viewportHeight = window.innerHeight;
  const isMobile = window.innerWidth <= 960; // Common mobile cutoff

  const handleNavigation = useCallback(e => {
    const window = e.currentTarget;

    if (isMobile) {
      if (window.scrollY <= height) {
        setNavBarClass("header-navbar-scrolling-mobile");
        setSticky(false);
      }
      if (window.scrollY >= height) {
        setNavBarClass("header-navbar-mobile");
        setSticky(true);
      }
    } else {
      if (window.scrollY <= viewportHeight) {
        setNavBarClass("header-navbar-scrolling");
        setSticky(false);
      }
      if (window.scrollY >= viewportHeight) {
        setNavBarClass("header-navbar");
        setSticky(true);
      }
    }
    setPixelsScrolled(window.scrollY);
  }, [ pixelsScrolled, viewportHeight ]);

  useEffect(() => {
    setPixelsScrolled(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    setHeight(navbarRef.current.clientHeight)
  }, [])

  return ( 
    <>
      <Navbar  
        ref={navbarRef}
        className={navBarClass}
      > 
        <Navbar.Brand href="/">
          <img className="header-logo" src={personalLogo} alt="Personal logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar-links-span'>
          <Nav className="mr-auto" >
            <Nav.Link key= '1' eventKey='1' href="#home" style={{ color: 'white' }}>Home</Nav.Link>
            <Nav.Link key= '2' href="#aboutMe" style={{ color: 'white' }}>About Me</Nav.Link>
            <Nav.Link key= '3' href="#resume" style={{ color: 'white' }}>Resume</Nav.Link>
            <Nav.Link key= '4' href="#links" style={{ color: 'white' }}>Links</Nav.Link>
            <Nav.Link key= '5' href="#contactCard" style={{ color: 'white' }}>Contact Card</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {isSticky &&
        <div style={{ height: `${height}px`}}/>
      }
    </>
  );
}

export default Header;