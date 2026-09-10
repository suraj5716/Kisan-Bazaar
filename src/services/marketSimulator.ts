import { WhatIfScenario, CropLot } from '../types';
import {
  FARMER_MANDIS,
  WAREHOUSE_OPTIONS,
  STORAGE_COST_PER_QTL_DAY,
  MANDI_CESS_RATE,
  LOADING_CHARGE_PER_QTL
} from '../data/mockData';
import { getForecastPrice } from './decisionEngine';

interface SimulatorInput {
  lot: CropLot;
  currentSpotPrice: number;
}

function calcNet(
  price: number,
  transport: number,
  storageDays: number
): number {
  const storage = STORAGE_COST_PER_QTL_DAY * storageDays;
  const cess = price * MANDI_CESS_RATE;
  return Math.round(price - transport - storage - cess - LOADING_CHARGE_PER_QTL);
}

export function generateScenarios(input: SimulatorInput): WhatIfScenario[] {
  const { lot, currentSpotPrice } = input;
  const nearestMandi = FARMER_MANDIS[1];
  const bestMandi = FARMER_MANDIS[0];
  const warehouseCostPerDay = WAREHOUSE_OPTIONS[0].costPerQtlMonth / 30;

  const sellTodayPrice = currentSpotPrice;
  const sellTodayNet = calcNet(sellTodayPrice, nearestMandi.transportCost, 0);

  const wait3Price = getForecastPrice(currentSpotPrice, 3);
  const wait3StorageCost = Math.round(warehouseCostPerDay * 3 * lot.quantityVal);
  const wait3Net = calcNet(wait3Price, nearestMandi.transportCost, 3);

  const wait7Price = getForecastPrice(currentSpotPrice, 7);
  const wait7StorageCost = Math.round(warehouseCostPerDay * 7 * lot.quantityVal);
  const wait7Net = calcNet(wait7Price, nearestMandi.transportCost, 7);

  const wait15Price = getForecastPrice(currentSpotPrice, 15);
  const wait15StorageCost = Math.round(warehouseCostPerDay * 15 * lot.quantityVal);
  const wait15Net = calcNet(wait15Price, nearestMandi.transportCost, 15);

  const moveMandiPrice = bestMandi.basePrice;
  const moveMandiNet = calcNet(moveMandiPrice, bestMandi.transportCost, 0);

  const directBuyerPrice = 2750;
  const directTransport = Math.round(42 * 4.5);
  const directNet = calcNet(directBuyerPrice, directTransport, 0);

  const scenarios: WhatIfScenario[] = [
    {
      id: 'sell-today',
      label: 'Sell Today',
      description: `Sell immediately at ${nearestMandi.market} at current spot prices`,
      expectedPrice: sellTodayPrice,
      transportCost: nearestMandi.transportCost,
      storageCost: 0,
      otherCosts: Math.round(sellTodayPrice * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      netRealization: sellTodayNet,
      riskLevel: 'Low',
      recommendation:
        sellTodayNet >= directNet && sellTodayNet >= moveMandiNet
          ? 'Recommended — Best immediate option with minimal risk'
          : 'Safe option but may leave money on the table'
    },
    {
      id: 'wait-3',
      label: 'Wait 3 Days',
      description: 'Hold inventory for 3 days anticipating price movement',
      expectedPrice: wait3Price,
      transportCost: nearestMandi.transportCost,
      storageCost: wait3StorageCost,
      otherCosts: Math.round(wait3Price * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      netRealization: wait3Net,
      riskLevel: 'Medium',
      recommendation:
        wait3Net > sellTodayNet
          ? `Gain of +₹${wait3Net - sellTodayNet}/q expected after storage costs`
          : 'Storage costs offset potential gains'
    },
    {
      id: 'wait-7',
      label: 'Wait 7 Days',
      description: 'Hold inventory for 1 week for projected price recovery',
      expectedPrice: wait7Price,
      transportCost: nearestMandi.transportCost,
      storageCost: wait7StorageCost,
      otherCosts: Math.round(wait7Price * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      netRealization: wait7Net,
      riskLevel: 'Medium-High',
      recommendation:
        wait7Net > sellTodayNet
          ? `Projected gain of +₹${wait7Net - sellTodayNet}/q — strong hold signal`
          : 'High storage cost erodes forecast gains'
    },
    {
      id: 'wait-15',
      label: 'Wait 15 Days',
      description: 'Extended hold for maximum forecast upside',
      expectedPrice: wait15Price,
      transportCost: nearestMandi.transportCost,
      storageCost: wait15StorageCost,
      otherCosts: Math.round(wait15Price * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      netRealization: wait15Net,
      riskLevel: 'High',
      recommendation:
        wait15Net > sellTodayNet
          ? `Potential +₹${wait15Net - sellTodayNet}/q gain but weather and market risk increase`
          : 'Not recommended — storage costs exceed projected gains'
    },
    {
      id: 'move-mandi',
      label: `Move to ${bestMandi.market}`,
      description: `Transport to ${bestMandi.market} (${bestMandi.distanceKm}km away)`,
      expectedPrice: moveMandiPrice,
      transportCost: bestMandi.transportCost,
      storageCost: 0,
      otherCosts: Math.round(moveMandiPrice * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      netRealization: moveMandiNet,
      riskLevel: 'Low',
      recommendation:
        moveMandiNet > sellTodayNet
          ? `Better rates at ${bestMandi.market} — net gain of +₹${moveMandiNet - sellTodayNet}/q`
          : 'Transport costs negate the price advantage'
    },
    {
      id: 'direct-buyer',
      label: 'Sell to Direct Buyer',
      description: 'Sell to ITC Agri Procurement at negotiated rate',
      expectedPrice: directBuyerPrice,
      transportCost: directTransport,
      storageCost: 0,
      otherCosts: Math.round(directBuyerPrice * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      netRealization: directNet,
      riskLevel: 'Low',
      recommendation:
        directNet > sellTodayNet
          ? `Direct buyer offers ₹${directNet - sellTodayNet}/q more after delivery costs`
          : 'Mandi sale yields better net realization'
    }
  ];

  return scenarios;
}
