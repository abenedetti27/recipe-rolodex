// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from './assets/logo/logo.png';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <section className="header" id="home">
            <Router>
                <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
                    <Container>
                        <Navbar.Brand as={ScrollLink} to="home" spy={true} smooth={true} duration={500}>
                            <img src={Logo} alt="logo" style={{ width: '50%', height: 'auto' }} />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav">
                            <span className="navbar-toggler-icon"></span>
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <ScrollLink to="home" spy={true} smooth={true} duration={500}>
                                    Home
                                </ScrollLink>
                                {isLoggedIn ? (
                                    <>
                                        <ScrollLink to="dashboard" spy={true} smooth={true} duration={500}>
                                            Dashboard
                                        </ScrollLink>
                                        <ScrollLink to="pinned-recipes" spy={true} smooth={true} duration={500}>
                                            Pinned Recipes
                                        </ScrollLink>
                                        <Link to="/" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <ScrollLink to="login" spy={true} smooth={true} duration={500}>
                                            Login
                                        </ScrollLink>
                                    </>
                                )}
                            </Nav>
                            <span className="navbar-text">
                                <div className="icons">
                                    <a href=""><img src={navIcon1} alt="" style={{ width: '10%', height: 'auto' }} /></a>
                                    <a href=""><img src={navIcon2} alt="" style={{ width: '10%', height: 'auto' }} /></a>
                                    <a href=""><img src={navIcon3} alt="" style={{ width: '10%', height: 'auto' }} /></a>
                                </div>
                            </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Router>
        </section>
    );
};

export default NavBar;
