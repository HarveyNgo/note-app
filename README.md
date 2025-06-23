#  Note App

Note App is a simple about manage category and note

## Project Structure

```
NoteApp/
├── src/
│   ├── assets/           # font, icons, images
│   ├── components/       # Reusable UI components
│   ├── constants/        # App-wide constants (e.g., colors, styles)
│   ├── data/             # Static data (e.g., JSON files)
│   ├── locales/          # multi language, (e.g english with en.json)
│   ├── navigation/       # contains navigation files, handle navigation logic
│   ├── redux/            # Redux store, slices, and middleware
│   ├── screens/          # Screens for the app (e.g., Home, NewNote)
│   ├── type/             # define typing, class, interface
│   └── App.tsx           # Main entry point for the app
├── public/               # Static assets
├── tests/                # Unit and integration tests
├── android/              # Android-specific files
├── ios/                  # iOS-specific files
├── package.json          # Project dependencies and scripts
├── jest.config.js        # Jest configuration for testing
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Libraries Used

### Core Libraries

- **React**: `19.0.0` - Core library for building the UI.
- **React Native**: `0.78.1` - Framework for building native apps using React.

### Navigation

- **React Navigation**: `^7.1.6` - For navigation between screens.
  - `@react-navigation/native`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/native-stack`

### State Management

- **Redux Toolkit**: `^2.7.0` - For managing global state.
- **Redux Persist**: `^6.0.0` - For persisting Redux state.

### UI and Styling

- **React Native Gesture Handler**: `^2.25.0` - For handling gestures.
- **React Native Reanimated**: `^3.17.5` - For animations.
- **React Native Linear Gradient**: `^2.8.3` - For gradient backgrounds.

### Localization

- **i18next**: `^25.0.1` - For internationalization.
- **react-i18next**: `^15.5.1` - React bindings for i18next.

### Testing

- **Jest**: `^29.7.0` - Testing framework.
- **@testing-library/react-native**: `^13.2.0` - For testing React Native components.

---

## Steps to Run the App

1. Clone the repository:

   ```bash
   git clone https://github.com/HarveyNgo/note-app
   cd NoteApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install pods for iOS (if running on macOS):

```bash
    cd ios
    pod install
    cd ..
```

4. start ios app

   ```bash
   npx react-native run-ios
   ```

5. start android app:

   ```bash
   npx react-native run-android
   ```

6. To run tests:
   ```bash
   npm test
   ```

Enjoy using Note App!
