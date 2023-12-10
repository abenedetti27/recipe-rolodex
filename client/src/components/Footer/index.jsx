import { Input, initMDB } from "mdb-ui-kit";

initMDB({ Input });


export const Footer = () => {
    return (
        <footer class="bg-body-tertiary text-center">
        <div class="container p-4"></div>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
          © 2020 Copyright:
          <a class="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
    )
}

export default Footer;