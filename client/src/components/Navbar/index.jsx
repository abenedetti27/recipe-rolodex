import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from './assets/logo/logo.png';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

export const NavBar = () => {
    const [] = useState('home');
    const [scrolled, seScrolled] = useState(false);

    useEffect(() => {
        const onScroll = e => {
            if (window.scrollY > 300) {
                seScrolled(true);
            } else {
                seScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);


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
            <ScrollLink to="home" spy={true} smooth={true} duration={500}>
                                Home
                            </ScrollLink>
                            {/* what pages do we want to link to from the homepage */}
                            <ScrollLink to="link1" spy={true} smooth={true} duration={500}>
                                Link 1
                            </ScrollLink>
                            <ScrollLink to="link2" spy={true} smooth={true} duration={500}>
                                Link 2
                            </ScrollLink>
                            <ScrollLink to="link2" spy={true} smooth={true} duration={500}>
                                Link 3
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
