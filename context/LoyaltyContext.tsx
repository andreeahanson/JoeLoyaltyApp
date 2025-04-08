// context/LoyaltyContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, UserTier } from '../types/index.ts';
import { initialUserProfile, tierThresholds } from '../data/mockData.ts';

const LOYALTY_STORAGE_KEY = '@JoeLoyaltyApp:userProfile';

interface LoyaltyContextType {
    userProfile: UserProfile | null;
    loading: boolean;
    addPoints: (pointsToAdd: number) => void;
    getTierFromPoints: (points: number) => UserTier;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

interface LoyaltyProviderProps {
    children: ReactNode;
}

// Helper function to determine tier based on points
const calculateTier = (points: number): UserTier => {
    // Check tiers in descending order of points required
    if (points >= (tierThresholds.Gold ?? Infinity)) return 'Gold';
    if (points >= (tierThresholds.Silver ?? Infinity)) return 'Silver';
    if (points >= (tierThresholds.Bronze ?? Infinity)) return 'Bronze';
    return 'Member';
};

export const LoyaltyProvider: React.FC<LoyaltyProviderProps> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true); // Start loading initially

    // Load user profile from storage on mount
    useEffect(() => {
        let isMounted = true; // Flag to prevent state update on unmounted component

        const loadProfile = async () => {
            let loadedProfile: UserProfile | null = null;
            try {
                const storedProfile = await AsyncStorage.getItem(LOYALTY_STORAGE_KEY);
                if (storedProfile !== null) {
                    const parsedProfile: UserProfile = JSON.parse(storedProfile);
                    // Ensure tier is correctly calculated based on stored points
                    parsedProfile.tier = calculateTier(parsedProfile.points);
                    loadedProfile = parsedProfile;
                } else {
                    // First time load or data cleared, use initial profile
                    const profileWithTier = { ...initialUserProfile, tier: calculateTier(initialUserProfile.points) };
                    loadedProfile = profileWithTier;
                }
            } catch (e) {
                console.error('Failed to load user profile.', e);
                // Fallback to initial profile on error
                const profileWithTier = { ...initialUserProfile, tier: calculateTier(initialUserProfile.points) };
                loadedProfile = profileWithTier; // Assign the fallback profile
            } finally {
                // Only update state if the component is still mounted
                if (isMounted) {
                    setUserProfile(loadedProfile); // Set profile based on try/catch outcome
                    setLoading(false); // Stop loading *after* profile is potentially set
                }
            }
        };

        setLoading(true); // Ensure loading is true when effect runs
        loadProfile();

        // Cleanup function to run when component unmounts
        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // Save profile to storage whenever it changes (and not during initial load)
    useEffect(() => {
        // Avoid saving during the initial load phase or if userProfile is null
        if (!loading && userProfile) {
            const saveProfile = async () => {
                try {
                    await AsyncStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(userProfile));
                } catch (e) {
                    console.error('Failed to save user profile.', e);
                }
            };
            saveProfile();
        }
    }, [userProfile, loading]); // Depend on userProfile and loading state

    // Function to add points and update tier (memoized with useCallback)
    const addPoints = useCallback((pointsToAdd: number) => {
        setUserProfile((prevProfile) => {
            if (!prevProfile) return null; // Should ideally not happen if loaded correctly
            const newPoints = prevProfile.points + pointsToAdd;
            const newTier = calculateTier(newPoints);
            return {
                ...prevProfile,
                points: newPoints,
                tier: newTier,
            };
        });
    }, []); // No dependencies needed for this callback pattern

    // Function to get tier from points (memoized with useCallback)
    const getTierFromPoints = useCallback((points: number): UserTier => {
        return calculateTier(points);
    }, []); // No dependencies, safe to memoize

    // Memoize the context value to prevent unnecessary re-renders of consumers
    const contextValue = React.useMemo(() => ({
        userProfile,
        loading,
        addPoints,
        getTierFromPoints
    }), [userProfile, loading, addPoints, getTierFromPoints]);

    return (
        <LoyaltyContext.Provider value={contextValue}>
            {children}
        </LoyaltyContext.Provider>
    );
};

// Custom hook to use the LoyaltyContext
export const useLoyalty = (): LoyaltyContextType => {
    const context = useContext(LoyaltyContext);
    if (context === undefined) {
        throw new Error('useLoyalty must be used within a LoyaltyProvider');
    }
    return context;
};