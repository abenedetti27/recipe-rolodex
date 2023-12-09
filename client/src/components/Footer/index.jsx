import { Container, Row, Col } from "react-bootstrap";
import logo from "./assets/logo/logo.png";
import navIcon1 from "../assets/logo/navIcon1.png";

export const Footer = () => {
    return (
      <footer className="footer">
        <Container>
          <Row className="align-items-center">
            <Col size={12} sm={6}>
              <img src={logo} alt="Logo" style={{ width: '40%', height: 'auto' }}/>
            </Col>
            <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://github.com/abenedetti27"><img src={navIcon1} alt="Anna" style={{ width: '5%', height: 'auto' }}/></a>
              <a href="https://github.com/mitsukaichi"><img src={navIcon1} alt="Minami" style={{ width: '5%', height: 'auto' }}/></a>
              <a href="https://github.com/TwixmixyJanet"><img src={navIcon1} alt="Janet" style={{ width: '5%', height: 'auto' }}/></a>
              <a href="https://github.com/eviehoang"><img src={navIcon1} alt="Nhi" style={{ width: '5%', height: 'auto' }}/></a>
            </div>
            <p>Copyright Team Two 2023. All Rights Reserved</p>
            </Col>
            </Row>
        </Container>

        </footer>
    )
}

export default Footer;