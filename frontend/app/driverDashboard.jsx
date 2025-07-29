import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Alert, Button, Linking, Text, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function DriverDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/'); // Go back to login page
  };

  const handleOpenMap = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to open map.');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Build the URL for Google Maps
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      // Open Google Maps
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open the map URL.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while getting location.');
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>🚛 Driver Dashboard</Text>
      <Button title=" My Location on Map" onPress={handleOpenMap} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
