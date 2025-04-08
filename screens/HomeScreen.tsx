// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useLoyalty } from '../context/LoyaltyContext.tsx';
import { HomeScreenProps } from '../types/index.ts'; // Using the type helper

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const { userProfile, loading, addPoints } = useLoyalty();

    const handleSimulatePurchase = () => {
        addPoints(10); // Add 10 points for simulation
    };

    if (loading || !userProfile) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#e87a00" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                 <Text style={styles.welcomeText}>Welcome, {userProfile.name}!</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Loyalty Status</Text>
                <Text style={styles.pointsText}>{userProfile.points} Points</Text>
                <Text style={styles.tierText}>Tier: {userProfile.tier}</Text>
                {/* Optional: Progress to next tier */}
                {/* <Text>Progress bar here...</Text> */}
            </View>

            <View style={styles.actionCard}>
                 <Text style={styles.actionText}>Simulate earning points:</Text>
                 <Button
                     title="Simulate Purchase (+10 pts)"
                     onPress={handleSimulatePurchase}
                     color="#4CAF50" // Green color for action
                 />
            </View>

             {/* You could add a section here showing 1-2 featured offers */}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4', // Light grey background
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff', // White header background
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
     welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    pointsText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e87a00', // JOE & THE JUICE orange-ish
        marginBottom: 5,
    },
    tierText: {
        fontSize: 16,
        color: '#666',
    },
    actionCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        alignItems: 'center', // Center button and text
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    actionText: {
         fontSize: 16,
         marginBottom: 15,
         color: '#333',
    },
});

export default HomeScreen;