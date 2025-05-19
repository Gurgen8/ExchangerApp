# React Native Currency Converter

A currency converter app built using **React Native** and **TypeScript**. The app allows users to convert between currencies in real time using exchange rate data from [fxratesapi.com](https://fxratesapi.com/docs/endpoints/latest-exchange-rates).

## 🧾 Features

- Currency selection screen with a searchable list (code + name)
- Conversion screen with amount input and currency pickers
- Real-time exchange rate conversion
- Offline support using last known rates
- Swap functionality to invert From/To currencies
- Clean UI based on Figma design
- API error handling and graceful fallbacks

## 📸 UI Design

View the mockup on [Figma](https://www.figma.com/file/igLlkdEUcWemd6upGeRJ69/Currency-Converter?type=design&node-id=1%3A5&mode=design&t=jtc10V7HmbsuI4lW-1)

## 🛠️ Tech Stack

- **React Native 0.79.2**
- **TypeScript**
- **Navigation**: `@react-navigation/native`, `@react-navigation/native-stack`
- **Local storage**: `react-native-mmkv`
- **Network detection**: `@react-native-community/netinfo`
- **Safe area handling**: `react-native-safe-area-context`
- **Performance monitoring**: `reactotron-react-native`
- **SVG rendering**: `react-native-svg`

## 🗂 Project Structure

```plaintext
src/
├── api          # API calls and config
├── assets       # Static icons, fonts, etc.
├── components   # Reusable UI components
├── context      # React Context for global state
├── helpers      # Utility functions
├── navigation   # Navigation stacks and configs
├── screens      # App screens
├── storage      # MMKV-based storage utils
├── types        # TypeScript types
├── ui-kit       # Design system components (e.g., Button, Input)
├── App.tsx      # App entry point
.env             # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 14.x
- Yarn or npm
- React Native development environment set up ([React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup))

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Gurgen8/ExchangerApp.git
cd ExchangerApp

yarn install
```

2. Create a .env file:

```
API_URL=https://api.fxratesapi.com
```

3. Running the App:

```bash
🍏 iOS
cd ios && pod install && cd ..
yarn ios

✅ Android
yarn android
```

4. Wait a magic !)
