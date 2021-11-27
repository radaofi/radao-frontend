import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";
import React, { FunctionComponent } from 'react'; // importing FunctionComponent


// import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as RABUSDImg } from "src/assets/tokens/RA-BUSD.svg";
import { ReactComponent as BusdImg } from "src/assets/tokens/binance-usd.svg";
import { ReactComponent as OhmDaiImg } from "src/assets/tokens/OHM-DAI.svg";
import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as OhmFraxImg } from "src/assets/tokens/OHM-FRAX.svg";
import { ReactComponent as OhmLusdImg } from "src/assets/tokens/OHM-LUSD.svg";
import { ReactComponent as OhmEthImg } from "src/assets/tokens/OHM-WETH.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { ReactComponent as LusdImg } from "src/assets/tokens/LUSD.svg";
import { ReactComponent as CvxImg } from "src/assets/tokens/CVX.svg";

import { abi as FraxOhmBondContract } from "src/abi/bonds/OhmFraxContract.json";
import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";
import { abi as BondOhmLusdContract } from "src/abi/bonds/OhmLusdContract.json";
import { abi as BondOhmEthContract } from "src/abi/bonds/OhmEthContract.json";

import { abi as BondContractABI } from "src/abi/bonds/BondContract.json";
import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ReserveOhmLusdContract } from "src/abi/reserves/OhmLusd.json";
import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";
import { abi as ReserveOhmFraxContract } from "src/abi/reserves/OhmFrax.json";
import { abi as ReserveOhmEthContract } from "src/abi/reserves/OhmEth.json";

import { abi as FraxBondContract } from "src/abi/bonds/FraxContract.json";
import { abi as LusdBondContract } from "src/abi/bonds/LusdContract.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";
import { abi as CvxBondContract } from "src/abi/bonds/CvxContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { getBondCalculator } from "src/helpers/BondCalculator";
import { BigNumberish } from "ethers";
import { getTokenPrice } from "src/helpers";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond

export const dai = new StableBond({
  name: "dai",
  displayName: "DAI",
  bondToken: "DAI",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: BusdImg,
  bondContractABI: BondContractABI,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x575409F8d77c12B05feD8B455815f0e54797381c",
      reserveAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xdE37391Dc2D8F4876B55053683aFF3D6fa949c8F",
      reserveAddress: "0x5e481733fc924E293Ef28F4F32aeA23d379eDe1B",
    },
  },
});

export const busd = new StableBond({
  name: "busd",
  displayName: "BUSD",
  bondToken: "BUSD",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: (BusdImg),
  bondContractABI: BondContractABI,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x5cA78Da8b19cef01f3821974e4C92cA17bafa8c3",
      reserveAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x1d5276286b68a095a4DD8828f1C17aD4D51Be277",
      reserveAddress: "0x5e481733fc924E293Ef28F4F32aeA23d379eDe1B",
    },
  },
});

export const eth = new CustomBond({
  name: "eth",
  displayName: "wETH",
  lpUrl: "",
  bondType: BondType.StableAsset,
  bondToken: "wETH",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wETHImg,
  bondContractABI: EthBondContract,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xE6295201CD1ff13CeD5f063a5421c39A1D236F1c",
      reserveAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
      reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const ethBondContract = this.getContractForBond(networkID, provider);
    let ethPrice: BigNumberish = await ethBondContract.assetPrice();
    ethPrice = Number(ethPrice.toString()) / Math.pow(10, 8);
    const token = this.getContractForReserve(networkID, provider);
    let ethAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    ethAmount = Number(ethAmount.toString()) / Math.pow(10, 18);
    return ethAmount * ethPrice;
  },
});


export const ra_busd = new LPBond({
  name: "ra_busd_lp",
  displayName: "RA-BUSD LP",
  bondToken: "BUSD",
  isAvailable: { [NetworkID.Mainnet]: false, [NetworkID.Testnet]: true },
  bondIconSvg: RABUSDImg,
  bondContractABI: BondContractABI,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xa5700364148A63A18a717eBA6B50D484928c1759",
      reserveAddress: "0xE8C6539663973E892C21652be80cdeE9a62e67BC",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x73CA79b2E339E03A9F148C812EE8e2438902EDD1",
      reserveAddress: "0x371845f80cE44D3E3Eb6EE945C49c7fF1821d35D",
    },
  },
  lpUrl:
    "https://pancakeswap.finance/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0xcc238200cFfdA7A5E2810086c26d5334e64F1155",
});

// export const ohm_dai = new LPBond({
//   name: "ohm_dai_lp",
//   displayName: "RA-BUSD LP",
//   bondToken: "DAI",
//   isAvailable: { [NetworkID.Mainnet]: false, [NetworkID.Testnet]: true },
//   bondIconSvg: OhmDaiImg,
//   bondContractABI: BondContractABI,
//   reserveContract: ReserveOhmDaiContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x956c43998316b6a2F21f89a1539f73fB5B78c151",
//       reserveAddress: "0x34d7d7Aaf50AD4944B70B320aCB24C95fa2def7c",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0x73CA79b2E339E03A9F148C812EE8e2438902EDD1",
//       reserveAddress: "0x371845f80cE44D3E3Eb6EE945C49c7fF1821d35D",
//     },
//   },
//   lpUrl:
//     "https://app.sushi.com/add/0x383518188c0c6d7730d91b2c03a03c837814a899/0x6b175474e89094c44da98b954eedeac495271d0f",
// });

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [busd, ra_busd];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
export const allExpiredBonds = [];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
