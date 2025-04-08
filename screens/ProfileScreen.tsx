// screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import QRCodeOriginal from 'react-native-qrcode-svg'; // Rename original import
import { useLoyalty } from '../context/LoyaltyContext.tsx';
import { ProfileScreenProps } from '../types/index.ts'; // Assuming you might need ../types/index.ts here too

const QRCode: React.ComponentType<any> = QRCodeOriginal;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
    const { userProfile, loading } = useLoyalty();

    if (loading || !userProfile) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#e87a00" />
            </View>
        );
    }

    // Data for the QR code (using the unique user ID)
    const qrCodeValue = userProfile.id;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileInfoCard}>
                <Text style={styles.name}>{userProfile.name}</Text>
                <Text style={styles.email}>{userProfile.email}</Text>
                <Text style={styles.details}>Points: {userProfile.points}</Text>
                <Text style={styles.details}>Tier: {userProfile.tier}</Text>
            </View>

            <View style={styles.qrCodeCard}>
                <Text style={styles.qrHeader}>Your Loyalty Card</Text>
                <Text style={styles.qrSubheader}>Scan in-store</Text>
                <View style={styles.qrCodeContainer}>
                    {qrCodeValue ? (
                         // Using the imported QRCode component
                        <QRCode
                            value={qrCodeValue}
                            size={200} // Adjust size as needed
                            color="#333" // QR code color
                            backgroundColor="#fff" // Background color
                        />
                    ) : (
                        <Text>Error generating QR Code</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // ... (keep your existing styles)
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfoCard: {
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
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    details: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },
    qrCodeCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 25, // More vertical padding
        paddingHorizontal: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        alignItems: 'center', // Center content horizontally
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    qrHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    qrSubheader: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20, // Space before QR code
    },
    qrCodeContainer: {
        // Style the container if needed, e.g., adding a border
        padding: 10, // Padding around the QR code itself
        backgroundColor: '#fff', // Ensure background for QR is white
        borderRadius: 4, // Slightly rounded corners for the QR background
        borderWidth: 1,
        borderColor: '#eee',
    }
});

export default ProfileScreen;