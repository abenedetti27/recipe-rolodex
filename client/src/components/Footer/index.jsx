import { Input, initMDB } from "mdb-ui-kit";
import "./style.css";

initMDB({ Input });


export const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-center">
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(241, 57, 170, 1)' }}>
          © 2023 Copyright Recipe Rolodex
          {/* <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
        </div>
      </footer>
    )
}

export default Footer;