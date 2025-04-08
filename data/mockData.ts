// data/mockData.ts
import { UserProfile, Offer, UserTier } from '../types/index.ts';

// Simulate a logged-in user's initial state
export const initialUserProfile: UserProfile = {
    id: 'user123-abc-789',
    name: 'Andreea TestUser',
    email: 'andreea.test@example.com',
    points: 45,
    tier: 'Member', // Initial tier, will be calculated
};

export const mockOffers: Offer[] = [
    { id: 'offer1', title: 'Free Juice Upgrade', description: 'Get a large juice for the price of a medium.' },
    { id: 'offer2', title: '10% Off Sandwich', description: 'Enjoy 10% off any sandwich purchase.', requiredPoints: 50 },
    { id: 'offer3', title: 'Birthday Coffee', description: 'Get a free coffee on your birthday month!' },
    { id: 'offer4', title: 'Earn Double Points', description: 'Earn 2x points on all purchases next Monday.' },
];

// Define points thresholds for tiers
export const tierThresholds: { [key in UserTier]?: number } = {
    Bronze: 100,
    Silver: 300,
    Gold: 750,
};