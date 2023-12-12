import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../../assets/logo/logo.png';
import { initMDB } from "mdb-ui-kit";
import Login from '../../pages/Login';


initMDB();

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleLoginModal = () => {
        setShowLogin(!showLogin);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
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
                <a className="navbar-brand" href="#">
                    <img src={Logo} alt="logo" style={{ height: '200px' }} className="d-inline-block align-top" />
                    </a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
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
                    {isLoggedIn ? (
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                    ) : (
                        <button className="btn btn-outline-primary" onClick={toggleLoginModal}>Login</button>
                    )}
                </div>
            </div>
            {showLogin && <Login onClose={toggleLoginModal} />}
        </nav>
    );
};

export default NavBar;
