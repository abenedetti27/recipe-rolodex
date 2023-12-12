import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/logo.png';
import { initMDB } from "mdb-ui-kit";

initMDB();

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-body-tertiary ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid">
                <button
                    data-mdb-collapse-init
                    className="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <Link to="/">
                    <img src={Logo} alt="logo" style={{ height: '200px' }} className="d-inline-block align-top" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Other navigation links */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/some-page">Some Page</Link>
                        </li>
                    </ul>
                    <form className="d-flex input-group w-auto">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Type query"
                            aria-label="Search"
                        />
                        <button
                            data-mdb-ripple-init
                            className="btn btn-outline-primary"
                            type="button"
                            data-mdb-ripple-color="dark"
                        >
                            Search
                        </button>
                    </form>
                    {/* Login button that links to the login page */}
                    <Link to="/login" className="btn btn-outline-primary" style={{ width: '100px' }}>Login</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
