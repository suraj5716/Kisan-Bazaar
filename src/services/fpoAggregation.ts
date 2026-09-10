import { FpoAggregationOpportunity } from '../types';
import { FPO_FARMER_LOTS } from '../data/mockData';

const BUYER_MIN_REQUIREMENTS: Record<string, { buyer: string; minQty: number; bulkPrice: number; individualPrice: number }> = {
  Wheat: { buyer: 'ITC Agri Procurement', minQty: 200, bulkPrice: 2820, individualPrice: 2740 },
  Soybean: { buyer: 'Godrej Agrovet', minQty: 120, bulkPrice: 4350, individualPrice: 4200 },
  Cotton: { buyer: 'Vardhman Textiles', minQty: 100, bulkPrice: 7650, individualPrice: 7400 }
};

export function analyzeAggregationOpportunities(): FpoAggregationOpportunity[] {
  const cropGroups: Record<string, typeof FPO_FARMER_LOTS> = {};

  FPO_FARMER_LOTS.forEach((lot) => {
    if (!cropGroups[lot.crop]) cropGroups[lot.crop] = [];
    cropGroups[lot.crop].push(lot);
  });

  const opportunities: FpoAggregationOpportunity[] = [];

  Object.entries(cropGroups).forEach(([crop, lots]) => {
    const requirement = BUYER_MIN_REQUIREMENTS[crop];
    if (!requirement) return;

    const totalQuantity = lots.reduce((sum, l) => sum + l.quantity, 0);
    if (totalQuantity < requirement.minQty) return;

    const priceAdvantage = requirement.bulkPrice - requirement.individualPrice;
    const additionalNetRealization = priceAdvantage * totalQuantity;

    opportunities.push({
      id: `AGG-${crop.toUpperCase().slice(0, 3)}`,
      crop,
      totalQuantity,
      farmerCount: lots.length,
      farmers: lots.map((l) => l.farmerName),
      buyerMinQuantity: requirement.minQty,
      potentialBuyer: requirement.buyer,
      individualPricePerQtl: requirement.individualPrice,
      bulkPricePerQtl: requirement.bulkPrice,
      priceAdvantage,
      estimatedAdditionalNetRealization: additionalNetRealization,
      location: lots[0].location
    });
  });

  return opportunities.sort((a, b) => b.estimatedAdditionalNetRealization - a.estimatedAdditionalNetRealization);
}
