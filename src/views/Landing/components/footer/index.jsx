import { Typography } from "@material-ui/core";
import "./style.scss";

export default function Footer() {
  return (
    <>
      <section id="bottom">
        <div className="container">
          <Typography variant="body1" component="p">
            Secured by:
          </Typography>
        </div>
      </section>
      <footer id="landing-footer">
        <div className="container">
          <Typography variant="body2" component="p">
            © 2021 RaDAO. All rights reserved.
          </Typography>
        </div>
      </footer>
    </>
  );
}
