import { Typography, SvgIcon, Link } from "@material-ui/core";
import "./style.scss";
import { ReactComponent as GitHub } from "../../../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../../../assets/icons/discord.svg";
import { ReactComponent as Docs } from "../../../../assets/icons/docs.svg";
import { ReactComponent as Telegram } from "../../../../assets/icons/tele.svg";

export default function JoinSection() {
  return (
    <section id="join">
      <div className="container">
        <Typography variant="h2">Join Our Community</Typography>
        <div className="social-row">
          <Link href="https://twitter.com/radao_bsc" target="_blank">
            <SvgIcon color="primary" component={Twitter} /> Twitter
          </Link>

          <Link href="https://github.com/radaofi" target="_blank">
            <SvgIcon color="primary" component={GitHub} /> Github
          </Link>

          <Link href="https://medium.com/@RaDao" target="_blank">
            <SvgIcon color="primary" component={Medium} /> Medium
          </Link>

          <Link href="https://docs.radao.finance/" target="_blank">
            <SvgIcon color="primary" viewBox="0 0 31 35" component={Docs} /> Docs
          </Link>
        </div>
        <Typography variant="body1" component="p" className="character-text">
          Let's make it (☀️,☀️)
        </Typography>
      </div>
    </section>
  );
}
