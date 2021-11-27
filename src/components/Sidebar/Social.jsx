import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Telegram } from "../../assets/icons/tele.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://github.com/radaofi" target="_blank">
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link href="https://medium.com/@RaDao" target="_blank">
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="https://twitter.com/radao_bsc" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://t.me/RaDao_BSC" target="_blank">
        <SvgIcon viewBox="0 0 40 35" color="primary" component={Telegram} />
      </Link>
    </div>
  );
}
