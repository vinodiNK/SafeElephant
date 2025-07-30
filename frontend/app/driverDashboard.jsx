// DriverDashboard.jsx

import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { limitToLast, onValue, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Alert, Button, Image, Linking, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { auth, realtimeDb } from '../firebaseConfig';

export default function DriverDashboard() {
  const router = useRouter();
  const [elephantLocation, setElephantLocation] = useState(null);
  const [region, setRegion] = useState(null);

  // Fetch latest elephant location
  useEffect(() => {
    const locationRef = query(ref(realtimeDb, 'elephant_locations'), limitToLast(1));

    const unsubscribe = onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lastKey = Object.keys(data)[0];
        const location = data[lastKey];
        setElephantLocation(location);
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/');
  };

  // Open location in Google Maps
  const handleOpenMap = async () => {
    if (!elephantLocation) {
      Alert.alert('No Data', 'No elephant location found.');
      return;
    }

    const { latitude, longitude, timestamp } = elephantLocation;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Alert.alert(
      'Elephant Alert 🚨',
      `Location:\nLatitude: ${latitude}\nLongitude: ${longitude}\n\nReported at:\n${new Date(timestamp).toLocaleString()}`,
      [
        {
          text: 'Open in Google Maps',
          onPress: async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            } else {
              Alert.alert('Error', 'Unable to open the map URL.');
            }
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>
        🚛 Driver Dashboard
      </Text>

      {/* 🗺️ Map View */}
      {region && elephantLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        >
          <Marker coordinate={region} title="Elephant Detected">
            <Image
              source={require('../assets/elephant.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      )}

      <View style={styles.buttonContainer}>
        <Button title="View in Google Maps" onPress={handleOpenMap} />
        <View style={{ height: 10 }} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
});
