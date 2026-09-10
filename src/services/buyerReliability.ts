import { BuyerProfile, BuyerReliabilityScore } from '../types';
import { BUYER_PROFILES } from '../data/mockData';

export function calculateReliabilityScore(profile: BuyerProfile): BuyerReliabilityScore {
  const verification = profile.verified ? 25 : 0;

  const transactionScore = Math.min(20, Math.round((profile.transactionCount / 400) * 20));

  const paymentCompletion = Math.round((profile.paymentCompletionRate / 100) * 25);

  const paymentTimeliness = Math.max(0, 15 - profile.paymentDelays * 3);

  const disputeFree = Math.max(0, 15 - profile.disputes * 5);

  const ratingScore = Math.round((profile.rating / 5) * 10);

  const totalScore = Math.min(
    100,
    verification + transactionScore + paymentCompletion + paymentTimeliness + disputeFree + ratingScore
  );

  let label: BuyerReliabilityScore['label'];
  if (totalScore >= 75) {
    label = 'High Reliability';
  } else if (totalScore >= 50) {
    label = 'Medium Reliability';
  } else {
    label = 'Low Reliability';
  }

  return {
    buyerId: profile.id,
    score: totalScore,
    label,
    breakdown: {
      verification,
      transactions: transactionScore,
      paymentCompletion,
      paymentTimeliness,
      disputeFree,
      rating: ratingScore
    }
  };
}

export function getReliabilityForBuyer(buyerName: string): BuyerReliabilityScore | null {
  const profile = BUYER_PROFILES.find((p) => p.name === buyerName);
  if (!profile) return null;
  return calculateReliabilityScore(profile);
}

export function getAllReliabilityScores(): BuyerReliabilityScore[] {
  return BUYER_PROFILES.map(calculateReliabilityScore);
}
