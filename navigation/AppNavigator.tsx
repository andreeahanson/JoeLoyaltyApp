// navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { RouteProp } from '@react-navigation/native'; // <-- Import RouteProp
import HomeScreen from '../screens/HomeScreen.tsx';
import OffersScreen from '../screens/OffersScreen.tsx';
import ProfileScreen from '../screens/ProfileScreen.tsx';
import { RootTabParamList } from '../types/index.ts'; // Import param list

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: RouteProp<RootTabParamList, keyof RootTabParamList> }) => ({ // <-- Add type for route
                tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => { // <-- Add types for icon props
                    let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert-circle'; // Default icon

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Offers') {
                        iconName = focused ? 'pricetag' : 'pricetag-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#e87a00', // JOE orange
                tabBarInactiveTintColor: 'gray',
                 headerStyle: {
                     backgroundColor: '#fff', // White header
                },
                 headerTintColor: '#333', // Dark text color for header
                 headerTitleStyle: {
                     fontWeight: 'bold',
                },
                 // Example: Customize header title per screen
                 // headerTitle: route.name === 'Home' ? 'Dashboard' : route.name,
            })}

        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Offers" component={OffersScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;