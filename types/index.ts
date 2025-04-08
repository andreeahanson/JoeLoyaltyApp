// types/index.ts
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type UserTier = 'Bronze' | 'Silver' | 'Gold' | 'Member'; // Example tiers

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    points: number;
    tier: UserTier;
};

export type Offer = {
    id: string;
    title: string;
    description: string;
    requiredPoints?: number; // Optional: points needed to redeem
};

// Define parameters for each tab screen
export type RootTabParamList = {
    Home: undefined;
    Offers: undefined;
    Profile: undefined;
};

// Type helpers for screen props
export type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;
export type OffersScreenProps = BottomTabScreenProps<RootTabParamList, 'Offers'>;
export type ProfileScreenProps = BottomTabScreenProps<RootTabParamList, 'Profile'>;