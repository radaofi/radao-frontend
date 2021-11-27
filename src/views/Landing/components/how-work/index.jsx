import "./style.scss";
import { Typography, Button } from "@material-ui/core";

import Image_1 from "./img-1.png";
import Image_2 from "./img-2.png";
import Image_3 from "./img-3.png";

export default function HowWork() {
  return (
    <section id="how-work">
      <div className="container">
        <Typography variant="h2">How RaDAO Work?</Typography>
        <ul>
          <li>
            <div>
              <div className="head-title">
                <span>1</span>
                Treasury Revenue
              </div>
              <Typography variant="h3">Bonds &amp; LP fees</Typography>
              <Typography variant="body1" component="p">
                Bond sales and LP Fees increase Treasury Revenue and lock in liquidity and help control RA supply
              </Typography>
            </div>
            <img src={Image_1} alt="" />
          </li>
          <li className="right">
            <div>
              <div className="head-title">
                <span>2</span>
                Treasury Growth
              </div>
              <Typography variant="h3">RaDAO's Treasury</Typography>
              <Typography variant="body1" component="p">
                Treasury inflow is used to increase Treasury Balance and back outstanding RA tokens and regulate staking APY
              </Typography>
            </div>
            <img src={Image_2} alt="" />
          </li>
          <li>
            <div>
              <div className="head-title">
                <span>3</span>
                Staking Rewards
              </div>
              <Typography variant="h3">RA Token</Typography>
              <Typography variant="body1" component="p">
                Compounds yields automatically through a treasury backed currency with intrinsic value
              </Typography>
            </div>
            <img src={Image_3} alt="" />
          </li>
        </ul>
      </div>
    </section>
  );
}
