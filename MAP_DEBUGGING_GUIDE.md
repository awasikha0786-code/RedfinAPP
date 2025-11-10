# Map Black Screen Debugging Guide

## ⚠️ IMPORTANT: API Key Required

**AndroidManifest.xml** mein abhi bhi placeholder API key hai:
```xml
android:value="YOUR_GOOGLE_MAPS_API_KEY"
```

**Ye replace karein apni actual API key se!**

## Steps to Fix Black Screen:

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/Select project
3. Enable **"Maps SDK for Android"** API
4. Go to Credentials → Create API Key
5. Copy the API key

### 2. Update AndroidManifest.xml
```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ACTUAL_API_KEY_HERE"/>
```

### 3. Check Console Logs
App run karte waqt console mein yeh check karein:
- `Map error:` - API key issue
- `react-native-maps not available` - Package not installed
- `onMapReady` - Map successfully loaded

### 4. Verify Installation
```bash
# Check if package is installed
npm list react-native-maps

# Should show: react-native-maps@1.26.18
```

### 5. Clean Rebuild
```bash
# Stop Metro bundler
# Then run:
cd android
./gradlew clean
cd ..
npm run android
```

### 6. Check Device/Emulator
- **Real Device**: Internet connection check karein
- **Emulator**: Google Play Services installed hona chahiye

### 7. Test MapView
Console mein yeh logs check karein:
```javascript
// PropertyMapView.jsx mein
console.log('MapView available:', !!MapView);
console.log('Provider:', MapView?.PROVIDER_GOOGLE);
```

## Common Issues:

### Issue 1: Black Screen with No Error
**Cause**: API key missing or invalid
**Fix**: 
- AndroidManifest.xml mein correct API key add karein
- API key mein "Maps SDK for Android" enabled ho
- App rebuild karein

### Issue 2: Map Not Loading
**Cause**: Internet permission missing
**Fix**: ✅ Already added in AndroidManifest.xml

### Issue 3: Provider Error
**Cause**: PROVIDER_GOOGLE not available
**Fix**: ✅ Already handled with fallback

### Issue 4: Build Errors
**Cause**: react-native-maps not properly linked
**Fix**: 
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Current Status:
✅ Provider prop added to all MapView components
✅ Permissions added to AndroidManifest.xml
✅ Fallback for PROVIDER_GOOGLE added
✅ Additional MapView props added (cacheEnabled, zoomEnabled, etc.)
❌ **API Key still needs to be added in AndroidManifest.xml**

## Next Steps:
1. **Add your Google Maps API key** in AndroidManifest.xml
2. **Rebuild the app** completely
3. **Check console logs** for any errors
4. **Test on real device** if emulator doesn't work

## Debug Commands:
```bash
# Check logs
npx react-native log-android

# Check if API key is being read
adb logcat | grep -i "maps\|api\|google"

# Full clean rebuild
cd android && ./gradlew clean && cd .. && npm run android
```

