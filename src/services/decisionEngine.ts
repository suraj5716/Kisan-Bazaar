import { SellDecision, CropLot, MandiComparisonItem } from '../types';
import {
  FARMER_MANDIS,
  INITIAL_FARMER_OFFERS,
  WAREHOUSE_OPTIONS,
  STORAGE_COST_PER_QTL_DAY,
  MANDI_CESS_RATE,
  LOADING_CHARGE_PER_QTL
} from '../data/mockData';

interface DecisionEngineInput {
  lot: CropLot;
  forecastPrice: number;
  forecastDays: number;
  marketDemand: 'HIGH' | 'MED' | 'LOW';
}

const demandMultiplier: Record<string, number> = {
  HIGH: 1.08,
  MED: 1.0,
  LOW: 0.92
};

function calculateNetRealization(
  sellingPrice: number,
  transportCost: number,
  storageDays: number,
  quantity: number
): number {
  const storageCost = STORAGE_COST_PER_QTL_DAY * storageDays;
  const cess = sellingPrice * MANDI_CESS_RATE;
  const loading = LOADING_CHARGE_PER_QTL;
  return Math.round(sellingPrice - transportCost - storageCost - cess - loading);
}

export function evaluateSellDecision(input: DecisionEngineInput): SellDecision {
  const { lot, forecastPrice, forecastDays, marketDemand } = input;
  const quantity = lot.quantityVal;
  const multiplier = demandMultiplier[marketDemand] || 1.0;

  const comparisons: SellDecision['comparison'] = [];

  FARMER_MANDIS.forEach((mandi) => {
    const adjustedPrice = Math.round(mandi.basePrice * multiplier);
    const net = calculateNetRealization(adjustedPrice, mandi.transportCost, 0, quantity);
    comparisons.push({
      label: mandi.market,
      netRealization: net,
      sellingPrice: adjustedPrice,
      transportCost: mandi.transportCost,
      storageCost: 0,
      otherCosts: Math.round(adjustedPrice * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      isBest: false
    });
  });

  INITIAL_FARMER_OFFERS.forEach((offer) => {
    const deliveryDistance = 42;
    const transportCost = Math.round(deliveryDistance * 4.5);
    const net = calculateNetRealization(offer.offeredRate, transportCost, 0, quantity);
    comparisons.push({
      label: `${offer.buyerName} (Direct)`,
      netRealization: net,
      sellingPrice: offer.offeredRate,
      transportCost,
      storageCost: 0,
      otherCosts: Math.round(offer.offeredRate * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
      isBest: false
    });
  });

  const warehouseCost = WAREHOUSE_OPTIONS[0].costPerQtlMonth;
  const forecastNet = calculateNetRealization(
    forecastPrice,
    FARMER_MANDIS[1].transportCost,
    forecastDays,
    quantity
  );
  comparisons.push({
    label: `Wait ${forecastDays} Days (Forecast)`,
    netRealization: forecastNet,
    sellingPrice: forecastPrice,
    transportCost: FARMER_MANDIS[1].transportCost,
    storageCost: Math.round(warehouseCost * forecastDays),
    otherCosts: Math.round(forecastPrice * MANDI_CESS_RATE + LOADING_CHARGE_PER_QTL),
    isBest: false
  });

  let bestIdx = 0;
  comparisons.forEach((c, i) => {
    if (c.netRealization > comparisons[bestIdx].netRealization) {
      bestIdx = i;
    }
  });
  comparisons[bestIdx].isBest = true;

  const best = comparisons[bestIdx];
  const currentSpotNet = comparisons[0].netRealization;
  const forecastGain = forecastNet - currentSpotNet;
  const warehouseCostTotal = warehouseCost * forecastDays * quantity;

  let action: SellDecision['action'];
  let reason: string;
  let explanation: string;

  if (best.label.includes('Direct')) {
    action = 'SELL TO DIRECT BUYER';
    const advantage = best.netRealization - currentSpotNet;
    reason = `${best.label} offers ₹${advantage}/q higher net realization after transport costs.`;
    explanation = `${best.label} is recommended because it provides ₹${advantage} per quintal higher net realization after transport costs compared to the nearest mandi.`;
  } else if (forecastGain > 100 && warehouseCostTotal < forecastGain * quantity * 0.3) {
    action = 'WAIT';
    reason = `Holding for ${forecastDays} days could gain ₹${forecastGain}/q (₹${(forecastGain * quantity).toLocaleString('en-IN')} total) minus ₹${warehouseCostTotal.toLocaleString('en-IN')} storage.`;
    explanation = `Waiting ${forecastDays} days is recommended because the projected price increase of ₹${forecastGain} per quintal after storage costs results in ₹${(forecastGain * quantity).toLocaleString('en-IN')} additional net realization.`;
  } else if (best.label.includes('Mandi') && !best.label.includes('Forecast')) {
    const mandiAdvantage = best.netRealization - currentSpotNet;
    if (mandiAdvantage > 50) {
      action = 'MOVE TO ANOTHER MARKET';
      reason = `${best.label} gives ₹${mandiAdvantage}/q more net realization than your local mandi.`;
      explanation = `Moving to ${best.label} is recommended because it provides ₹${mandiAdvantage} per quintal higher net realization after factoring in additional transport costs.`;
    } else {
      action = 'SELL NOW';
      reason = `Current market conditions favor immediate sale at ${best.label} for ₹${best.netRealization}/q net.`;
      explanation = `Selling now is recommended because current prices at ${best.label} offer a fair net realization of ₹${best.netRealization} per quintal with minimal risk.`;
    }
  } else {
    action = 'SELL NOW';
    reason = `Best available option: ${best.label} at ₹${best.netRealization}/q net realization.`;
    explanation = `Selling now is recommended because the best available net realization is ₹${best.netRealization} per quintal at ${best.label}, with no significant forecast-driven gains expected.`;
  }

  return {
    action,
    reason,
    explanation,
    expectedNetRealization: best.netRealization,
    bestOption: best.label,
    comparison: comparisons
  };
}

export function getForecastPrice(currentPrice: number, days: number): number {
  const dailyGrowth = 0.008;
  return Math.round(currentPrice * (1 + dailyGrowth * days));
}
