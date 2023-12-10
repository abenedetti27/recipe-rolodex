// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Container, Nav } from 'mdb-ui-kit';
import Logo from '../../assets/logo/logo.png';
import { Collapse, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Collapse, Ripple });

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-${scrolled ? 'dark' : 'body-tertiary'}`}>
            <Container fluid>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <a className="navbar-brand" href="#">
                    <img src={Logo} alt="Logo" />
                </a>
                <Collapse navbar id="navbarTogglerDemo03">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Item>
                            <Nav.Link active aria-current="page" href="#">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">
                                Link
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <form className="d-flex input-group w-auto">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Type query"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            data-mdb-ripple-color="dark"
                        >
                            Search
                        </button>
                    </form>
                </Collapse>
            </Container>
        </nav>
    );
};

export default NavBar;
