import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t, Trans } from "@lingui/macro";
import { formatCurrency, trim } from "../../helpers";
import { Backdrop, Box, Fade, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import BondHeader from "./BondHeader";
import BondRedeem from "./BondRedeem";
import BondPurchase from "./BondPurchase";
import "./bond.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { Skeleton } from "@material-ui/lab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Bond({ bond }) {
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();

  const [slippage, setSlippage] = useState(0.5);
  const [recipientAddress, setRecipientAddress] = useState(address);

  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState();

  const isBondLoading = useSelector(state => state.bonding.loading ?? true);

  const onRecipientAddressChange = e => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = e => {
    return setSlippage(e.target.value);
  };

  useEffect(() => {
    if (address) setRecipientAddress(address);
  }, [provider, quantity, address]);

  const changeView = (event, newView) => {
    setView(newView);
  };

  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Grid container id="bond-view">
        <Backdrop open={true}>
          <Fade in={true}>
            <Paper className="ohm-card ohm-modal">
              <BondHeader
                bond={bond}
                slippage={slippage}
                recipientAddress={recipientAddress}
                onSlippageChange={onSlippageChange}
                onRecipientAddressChange={onRecipientAddressChange}
              />

              <Box direction="row" className="bond-price-data-row">
                <div className="bond-price-data">
                  <Typography variant="button" component="span" color="textSecondary">
                    <Trans>Bond Price</Trans>
                  </Typography>
                  <Typography variant="h3" className="price" color="primary">
                    {isBondLoading ? <Skeleton /> : formatCurrency(bond.bondPrice, 2)}
                  </Typography>
                </div>
                <div className="bond-price-data">
                  <Typography variant="button" component="span" color="textSecondary">
                    <Trans>Market Price</Trans>
                  </Typography>
                  <Typography variant="h3" color="primary" className="price">
                    {isBondLoading ? <Skeleton /> : formatCurrency(bond.marketPrice, 2)}
                  </Typography>
                </div>
              </Box>

              <Tabs
                centered
                value={view}
                textColor="primary"
                indicatorColor="primary"
                onChange={changeView}
                aria-label="bond tabs"
              >
                <Tab
                  aria-label="bond-tab-button"
                  label={t({
                    id: "do_bond",
                    comment: "The action of bonding (verb)",
                  })}
                  {...a11yProps(0)}
                />
                <Tab aria-label="redeem-tab-button" label={t`Redeem`} {...a11yProps(1)} />
              </Tabs>

              <TabPanel value={view} index={0}>
                <BondPurchase bond={bond} slippage={slippage} recipientAddress={recipientAddress} />
              </TabPanel>

              <TabPanel value={view} index={1}>
                <BondRedeem bond={bond} />
              </TabPanel>
            </Paper>
          </Fade>
        </Backdrop>
      </Grid>
    </Fade>
  );
}

export function DisplayBondPrice({ bond }) {
  const { chainID } = useWeb3Context();
  return (
    <>
      {!bond.isAvailable[chainID] ? (
        <>--</>
      ) : (
        `${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(bond.bondPrice)}`
      )}
    </>
  );
}

export function DisplayBondDiscount({ bond }) {
  const { chainID } = useWeb3Context();
  return <>{!bond.isAvailable[chainID] ? <>--</> : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}</>;
}

export default Bond;
