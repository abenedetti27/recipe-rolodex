import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from './assets/logo/logo.png';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const onScroll = e => {
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
          <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
            <Container>
            <Navbar.Brand as={ScrollLink} to="home" spy={true} smooth={true} duration={500}>
                <img src={Logo} alt="logo" style={{ width: '50%', height: 'auto' }}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Link to="home" spy={true} smooth={true} duration={500}>
                  Home
                </Link>
                {isLoggedIn ? (
                  <>
                    {/* Links for logged-in users */}
                    <Link to="dashboard" spy={true} smooth={true} duration={500}>
                      Dashboard
                    </Link>
                    <Link to="pinned-recipes" spy={true} smooth={true} duration={500}>
                      Pinned Recipes
                    </Link>
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                  <Link to="login" spy={true} smooth={true} duration={500}>
                      Login
                    </Link>
                  </>
                )}
              </Nav>
              <span className="navbar-text">
                {/* ... (existing code) ... */}
              </span>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Router>
    </section>
  );
};

            <ScrollLink to="home" spy={true} smooth={true} duration={500}>
                    {/* what pages do we want to link to from the homepage- when logged out. need to figure out logic for this logged in/ logged out*/}
                                Home
                            </ScrollLink>
                            <ScrollLink to="link1" spy={true} smooth={true} duration={500}>
                                login
                            </ScrollLink>
                            {/* what pages do we want to link to from the homepage- when logged in*/}
                            <ScrollLink to="link1" spy={true} smooth={true} duration={500}>
                                Dashboard
                            </ScrollLink>
                            <ScrollLink to="link2" spy={true} smooth={true} duration={500}>
                                Pinned Recipes
                            </ScrollLink>
                            <ScrollLink to="link2" spy={true} smooth={true} duration={500}>
                                logout
                            </ScrollLink>
                        </Nav>
            <span className="navbar-text">
            {/* do we want to link to any external sites? */}
            <div className="icons">
             <a href=""><img src={navIcon1} alt="" style={{ width: '10%', height: 'auto' }}/></a>  
             <a href=""><img src={navIcon2} alt="" style={{ width: '10%', height: 'auto' }}/></a>   
             <a href=""><img src={navIcon3} alt="" style={{ width: '10%', height: 'auto' }}/></a>   
            </div> 
            {/* <button className="vvd" onClick={() => console.log('connect')}><span>Let's Connect</span></button>  */}
            </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Router>
    </section>
  );
}

export default NavBar;
