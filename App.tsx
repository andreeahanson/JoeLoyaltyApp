// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoyaltyProvider } from './context/LoyaltyContext.tsx';
import AppNavigator from './navigation/AppNavigator.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function App() {
    return (
        <SafeAreaProvider> {/* Recommended for handling safe areas */}
            <LoyaltyProvider> {/* Wraps the app with loyalty state */}
                <NavigationContainer> {/* Handles navigation state */}
                    <AppNavigator /> {/* Renders the main tab navigator */}
                </NavigationContainer>
            </LoyaltyProvider>
             <StatusBar style="auto" /> {/* Controls the status bar style */}
        </SafeAreaProvider>
    );
}