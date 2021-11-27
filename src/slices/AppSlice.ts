import { ethers } from "ethers";
import { addresses } from "../constants";
// import { abi as Stakingv2ABI } from "../abi/RaStaking.json";
// import { abi as ierc20Abi } from "../abi/IERC20.json";
// import { abi as sRAv2 } from "../abi/sRAv2.json";
// import { abi as raBUSDABI } from "../abi/reserves/RaBUSD.json";
// import { abi as CirculatingSupplyABI } from "../abi/CirculatingSupply.json";
import { setAll, getTokenPrice, getMarketPrice } from "../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAsyncThunk } from "./interfaces";
import { ra_busd } from "../helpers/AllBonds"
import multicall from '../helpers/multicall'
import { abi as loadAppDetailsABI } from "../abi/custom/loadAppDetails.json";

const initialState = {
  loading: false,
  loadingMarketPrice: false,
};
const circulatingSupply = {
  inputs: [],
  name: "circulatingSupply",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "view",
  type: "function",
};
export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    
    // const raBUSDContract = new ethers.Contract(ra_busd.networkAddrs[networkID].reserveAddress as string, raBUSDABI, provider);
    // const stakingContract = new ethers.Contract(addresses[networkID].STAKING_ADDRESS as string, Stakingv2ABI, provider);
    // const sRaMainContract = new ethers.Contract(addresses[networkID].SRA_ADDRESS as string, sRAv2, provider);
    // const raContract = new ethers.Contract(addresses[networkID].RA_ADDRESS as string, ierc20Abi, provider);
    // const raCirculatingSupply = new ethers.Contract(
    //   addresses[networkID].CIRCULATING_SUPPLY_ADDRESS as string,
    //   CirculatingSupplyABI,
    //   provider,
    // );

    const calls = [
      { address: addresses[networkID].RA_ADDRESS, name: 'balanceOf', params: [addresses[networkID].STAKING_ADDRESS] },
      { address: addresses[networkID].SRA_ADDRESS, name: 'circulatingSupply', params: [] },
      { address: addresses[networkID].CIRCULATING_SUPPLY_ADDRESS, name: 'RACirculatingSupply', params: [] },
      { address: addresses[networkID].RA_ADDRESS, name: 'totalSupply', params: [] },
      { address: addresses[networkID].STAKING_ADDRESS, name: 'epoch', params: [] },
      { address: ra_busd.networkAddrs[networkID].reserveAddress, name: 'totalSupply', params: [] },
      { address: ra_busd.networkAddrs[networkID].reserveAddress, name: 'balanceOf', params: [addresses[networkID].TREASURY_ADDRESS] },
      { address: addresses[networkID].STAKING_ADDRESS, name: 'index', params: [] },
    ];

    const rawAppDetails = await multicall(networkID, provider, loadAppDetailsABI, calls)
    
    
    // NOTE (appleseed): marketPrice from Graph was delayed, so get CoinGecko price
    // const marketPrice = parseFloat(graphData.data.protocolMetrics[0].ohmPrice);
    let marketPrice;
    try {
      const originalPromiseResult = await dispatch(
        loadMarketPrice({ networkID: networkID, provider: provider }),
      ).unwrap();
      marketPrice = originalPromiseResult?.marketPrice;
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.error("Returned a null response from dispatch(loadMarketPrice)");
      return;
    }

    // const raBalance = await raContract.balanceOf(addresses[networkID].STAKING_ADDRESS)
    // const sRaCirc = (await sRaMainContract.circulatingSupply()) / 1e9
    // const circ = await raCirculatingSupply.RACirculatingSupply()
    // const total = await raContract.totalSupply()
    // const epoch = await stakingContract.epoch()
    // const total_lp = await raBUSDContract.totalSupply()
    // const raBUSDBalance = await raBUSDContract.balanceOf(addresses[networkID].TREASURY_ADDRESS)

    const raBalance = rawAppDetails[0][0];
    const sRaCirc = rawAppDetails[1][0] / 1e9
    const circ = rawAppDetails[2][0]
    const total = rawAppDetails[3][0]
    const epoch = rawAppDetails[4]
    const total_lp = rawAppDetails[5][0]
    const raBUSDBalance = rawAppDetails[6][0]

    const stakingTVL = (raBalance * marketPrice) / 1e9;
    const circSupply = circ / 1e9;
    const totalSupply = total / 1e9;
    const marketCap = marketPrice * circSupply;
    const pol = raBUSDBalance.mul(100).div(total_lp).toNumber() / 100;
    // const treasuryMarketValue = parseFloat(graphData.data.protocolMetrics[0].treasuryMarketValue);
    // const currentBlock = parseFloat(graphData.data._meta.block.number);
    const stakingRatio = sRaCirc / circSupply;

    if (!provider) {
      console.error("failed to connect to provider, please connect your wallet");
      return {
        stakingTVL,
        marketPrice,
        marketCap,
        circSupply,
        totalSupply,
        stakingRatio,
        pol,
        // treasuryMarketValue,
      };
    }
    const currentBlock = await provider.getBlockNumber();

    // Calculating staking
    const stakingReward = epoch.distribute;
    const stakingRebase = Number(stakingReward.toString()) / Number(circ.toString());
    const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
    const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;

    // Current index
    // const currentIndex = await stakingContract.index();
    const currentIndex = rawAppDetails[7][0];

    return {
      currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
      currentBlock,
      fiveDayRate,
      stakingAPY,
      stakingTVL,
      stakingRebase,
      marketCap,
      marketPrice,
      circSupply,
      totalSupply,
      stakingRatio,
      pol,
      // treasuryMarketValue,
    } as IAppData;
  },
);

/**
 * checks if app.slice has marketPrice already
 * if yes then simply load that state
 * if no then fetches via `loadMarketPrice`
 *
 * `usage`:
 * ```
 * const originalPromiseResult = await dispatch(
 *    findOrLoadMarketPrice({ networkID: networkID, provider: provider }),
 *  ).unwrap();
 * originalPromiseResult?.whateverValue;
 * ```
 */
export const findOrLoadMarketPrice = createAsyncThunk(
  "app/findOrLoadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch, getState }) => {
    const state: any = getState();
    let marketPrice;
    // check if we already have loaded market price
    if (state.app.loadingMarketPrice === false && state.app.marketPrice) {
      // go get marketPrice from app.state
      marketPrice = state.app.marketPrice;
    } else {
      // we don't have marketPrice in app.state, so go get it
      try {
        const originalPromiseResult = await dispatch(
          loadMarketPrice({ networkID: networkID, provider: provider }),
        ).unwrap();
        marketPrice = originalPromiseResult?.marketPrice;
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.error("Returned a null response from dispatch(loadMarketPrice)");
        return;
      }
    }
    return { marketPrice };
  },
);

/**
 * - fetches the RA price from CoinGecko (via getTokenPrice)
 * - falls back to fetch marketPrice from ra-busd contract
 * - updates the App.slice when it runs
 */
const loadMarketPrice = createAsyncThunk("app/loadMarketPrice", async ({ networkID, provider }: IBaseAsyncThunk) => {
  let marketPrice: number;
  try {
    marketPrice = await getMarketPrice({ networkID, provider });
    marketPrice = marketPrice / Math.pow(10, 9);
  } catch (e) {
    marketPrice = await getTokenPrice("radao");
  }
  return { marketPrice };
});

interface IAppData {
  readonly circSupply: number;
  readonly currentIndex?: string;
  readonly currentBlock?: number;
  readonly fiveDayRate?: number;
  readonly marketCap: number;
  readonly marketPrice: number;
  readonly stakingAPY?: number;
  readonly stakingRebase?: number;
  readonly stakingTVL: number;
  readonly stakingRatio?: number;
  readonly totalSupply: number;
  readonly treasuryBalance?: number;
  readonly pol?: number;
  // readonly treasuryMarketValue?: number;
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
      .addCase(loadMarketPrice.pending, (state, action) => {
        state.loadingMarketPrice = true;
      })
      .addCase(loadMarketPrice.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loadingMarketPrice = false;
      })
      .addCase(loadMarketPrice.rejected, (state, { error }) => {
        state.loadingMarketPrice = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
