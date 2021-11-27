import "./style.scss";
import "./logo-animate.scss";
import { Typography, Button } from "@material-ui/core";
import { allBondsMap } from "src/helpers/AllBonds";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { trim, appLink } from "../../../../helpers";

export default function Intro() {
  const isAppLoading = useSelector(state => state.app.loading);
  const treasuryBalance = useSelector(state => {
    if (state.bonding.loading == false) {
      let tokenBalances = 0;
      for (const bond in allBondsMap) {
        if (state.bonding[bond]) {
          tokenBalances += state.bonding[bond].purchased;
        }
      }
      return tokenBalances;
    }
  });

  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });
  const trimmedStakingAPY = trim(stakingAPY * 100, 1);
  
  return (
    <section id="intro">
      <div className="container">
        <div className="intro-row">
          <Typography variant="h1">BONDS 2.0</Typography>
          <Typography variant="body1" component="p" className="character-text">
            Investing in $RA BONDS benefits just the same as presale (☀️,☀️) 
          </Typography>
        </div>
        <div className="intro-col">
          <div>
            <Typography variant="h3">What is RaDAO?</Typography>
            <Typography variant="body1" component="p">
            RaDAO is a decentralized protocol based on the $RA token – collateralized and backed by the Ra DAO. $RA will be the reserve currency on BSC. 
            In order to maintain price stability RaDAO will use the Algorithmic Reserve Currency algorithm and will also be supported by other decentralized assets.
            </Typography>
            <Button href="/stake" variant="contained" color="secondary" size="large">
              Enter App
            </Button>
          </div>
          <div className="logo-animate">
            {/* <img src={RadaoLogoAnimate} alt="" /> */}
            <div class="side left"></div>
            <div class="side front"></div>
            <div class="side right"></div>
            <div class="side back"></div>

            {/* <div class="shadow"></div> */}
          </div>
        </div>
        <div>{/* do not remove */}</div>
      </div>
      <div className="intro-numbers">
        <ul className="container">
          <li>
            <Typography variant="body1" component="p">
              Treasury Balance
            </Typography>
            <Typography variant="h3">
              {isAppLoading ? (
                <Skeleton width="180px" />
              ) : (
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(treasuryBalance)
              )}
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p">
              Current APY
            </Typography>
            <Typography variant="h3">
              {stakingAPY ? (
                <>{new Intl.NumberFormat("en-US").format(Number(trimmedStakingAPY))}%</>
              ) : "0%"}
            </Typography>
          </li>
        </ul>
      </div>
    </section>
  );
}
