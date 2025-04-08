// screens/OffersScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { mockOffers } from '../data/mockData.ts';
import { Offer, OffersScreenProps } from '../types/index.ts';
import { useLoyalty } from '../context/LoyaltyContext.tsx'; // To potentially check points required

const OfferItem: React.FC<{ item: Offer; currentPoints: number }> = ({ item, currentPoints }) => {
    const canRedeem = item.requiredPoints === undefined || currentPoints >= item.requiredPoints;
    return (
        <View style={[styles.offerItem, !canRedeem && styles.offerItemDisabled]}>
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.offerDescription}>{item.description}</Text>
            {item.requiredPoints !== undefined && (
                <Text style={styles.offerPoints}>
                    Requires: {item.requiredPoints} points {canRedeem ? '✅' : `(Need ${item.requiredPoints - currentPoints} more)`}
                </Text>
            )}
             {!canRedeem && <View style={styles.disabledOverlay} />}
        </View>
    );
}

const OffersScreen: React.FC<OffersScreenProps> = () => {
    const { userProfile, loading } = useLoyalty();

    if (loading || !userProfile) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#e87a00" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={mockOffers}
                renderItem={({ item }) => <OfferItem item={item} currentPoints={userProfile.points} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<Text style={styles.header}>Available Offers</Text>}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 15,
        paddingBottom: 10,
        color: '#333',
    },
    listContent: {
        paddingBottom: 15,
    },
    offerItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 10, // Space between items
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 1,
        position: 'relative', // Needed for overlay
         overflow: 'hidden', // Keep overlay contained
    },
    offerItemDisabled: {
        // Optionally slightly grey out if disabled
         // backgroundColor: '#f9f9f9',
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    offerDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    offerPoints: {
        fontSize: 12,
        color: '#e87a00',
        fontWeight: '500',
    },
    disabledOverlay: { // Subtle overlay for disabled items
        ...StyleSheet.absoluteFillObject, // Cover the entire item
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
        zIndex: 1, // Make sure it's on top
    },
});

export default OffersScreen;