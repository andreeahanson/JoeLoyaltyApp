# JOE & THE JUICE - Loyalty App Concept (React Native Expo Demo)

![React Native](https://img.shields.io/badge/React%20Native-0.69-blue?logo=react) ![Expo](https://img.shields.io/badge/Expo-SDK%2049+-blue?logo=expo) ![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?logo=typescript)

This project is a conceptual demonstration of a mobile loyalty application for JOE & THE JUICE, built using React Native and Expo. It simulates core loyalty program features like viewing points, tracking tiers, accessing offers, and displaying a digital loyalty card.

This app was developed as a practical exercise to demonstrate React Native skills relevant to mobile loyalty and customer engagement solutions.

## Features

*   **Home Dashboard:** View current loyalty points and tier status.
*   **Point Simulation:** Button to simulate earning points (e.g., from a purchase).
*   **Tier Calculation:** Automatically updates the user's tier (Member, Bronze, Silver, Gold) based on accumulated points.
*   **Offers List:** Displays available offers and rewards.
*   **Offer Eligibility:** Indicates if the user has enough points to redeem specific offers.
*   **User Profile:** Shows basic user information.
*   **Digital Loyalty Card:** Generates and displays a unique QR code representing the user's loyalty ID.
*   **Data Persistence:** User profile data (points) is saved locally using AsyncStorage and loaded on app start.
*   **Tab Navigation:** Easy navigation between Home, Offers, and Profile sections using bottom tabs.

## Tech Stack

*   **Framework:** React Native (managed with Expo SDK)
*   **Language:** TypeScript
*   **Navigation:** React Navigation (Bottom Tab Navigator)
*   **State Management:** React Context API
*   **Local Storage:** `@react-native-async-storage/async-storage`
*   **QR Code Generation:** `react-native-qrcode-svg`
*   **Icons:** `@expo/vector-icons` (Ionicons)

## Screenshots / Demo

Coming soon…

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js:** LTS version recommended ([download here](https://nodejs.org/)).
*   **npm** or **yarn:** Package managers for Node.js (npm comes bundled).
*   **Expo Go App:** Install the Expo Go app on your physical iOS or Android device ([iOS App Store](https://apps.apple.com/us/app/expo-go/id982107779) / [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)).
    *   _Alternatively:_ You can set up an [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/) or [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) if you prefer development on your computer.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/andreeahanson/JoeLoyaltyApp.git
    cd JoeLoyaltyApp
    ```
    *(Replace `andreeahanson/JoeLoyaltyApp` with your actual GitHub details)*

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
    *(This installs all the packages listed in `package.json`)*

## Running the App

1.  **Start the Metro Bundler (Expo Development Server):**
    ```bash
    npx expo start
    ```

2.  **Launch the app:**
    *   **On your physical device:** Open the Expo Go app and scan the QR code displayed in the terminal or browser window opened by Expo.
    *   **On an Android Emulator:** Press `a` in the terminal window where Metro is running (requires Android Studio and a configured emulator).
    *   **On an iOS Simulator:** Press `i` in the terminal window where Metro is running (requires Xcode and macOS).

The app should now build and launch on your selected device/simulator.

## Project Structure

JoeLoyaltyApp/│├── assets/ # Static assets (images, fonts)│ └── ...│├── context/ # React Context for global state│ └── LoyaltyContext.tsx│├── data/ # Mock data│ └── mockData.ts│├── navigation/ # Navigation configuration│ └── AppNavigator.tsx│├── screens/ # Screen components│ ├── HomeScreen.tsx│ ├── OffersScreen.tsx│ └── ProfileScreen.tsx│├── types/ # TypeScript type definitions│ └── index.ts│├── .expo/ # Expo configuration files (generated, usually gitignored)├── node_modules/ # Project dependencies (generated, gitignored)│├── .gitignore # Files ignored by Git├── App.tsx # Root application component├── app.json # Expo configuration file├── babel.config.js # Babel configuration├── package.json # Project metadata and dependencies├── README.md # This file└── tsconfig.json # TypeScript configuration



## Future Enhancements (Potential Ideas)

*   Integrate with a mock backend API instead of local mock data.
*   Implement functionality to "redeem" offers.
*   Add user authentication (login/signup).
*   Expand user profile section (settings, preferences).
*   Implement push notifications for new offers or tier updates.
*   Improve UI/UX with more sophisticated styling and animations.
*   Add unit and integration tests (e.g., using Jest, React Native Testing Library).

---

_This README provides a guide to understanding, setting up, and running this demonstration project._