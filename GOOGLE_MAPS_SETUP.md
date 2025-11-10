# Google Maps Setup Guide

## Black Screen Issue Fix

The black screen issue in React Native Maps is typically caused by:
1. Missing or invalid Google Maps API key
2. Missing `provider` prop in MapView components
3. Incorrect AndroidManifest.xml configuration

## Steps to Fix:

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable "Maps SDK for Android" API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

### 2. Update AndroidManifest.xml

Replace `YOUR_GOOGLE_MAPS_API_KEY` in `android/app/src/main/AndroidManifest.xml`:

```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ACTUAL_API_KEY_HERE"/>
```

### 3. Rebuild the App

After updating the API key, rebuild the app:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### 4. Verify MapView Components

All MapView components now have the `provider` prop:
- ✅ PropertyMapView.jsx
- ✅ DrawMapView.jsx
- ✅ LocationDetailScreen.jsx

### 5. Common Issues

- **Black Screen**: Usually means API key is missing or invalid
- **Map not loading**: Check internet permissions in AndroidManifest.xml
- **Build errors**: Make sure react-native-maps is properly linked

### 6. Testing

After setup, test the map in:
- MapScreen (PropertyMapView)
- DrawMapScreen (DrawMapView)
- LocationDetailScreen

If you still see a black screen, check:
1. API key is correctly set in AndroidManifest.xml
2. API key has "Maps SDK for Android" enabled
3. App has been rebuilt after changes
4. Device/emulator has internet connection

