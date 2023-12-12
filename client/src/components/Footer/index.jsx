import { Input, initMDB } from "mdb-ui-kit";

initMDB({ Input });


export const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-center">
        <div className="container p-4"></div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2020 Copyright Team Two
          {/* <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
        </div>
      </footer>
    )
}

export default Footer;