import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { push, ref, set } from 'firebase/database'; // ✅ Use Realtime Database methods
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { realtimeDb } from '../firebaseConfig'; // ✅ Rename your Realtime DB import

const UploadLocation = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      console.log("Current Location:", loc.coords);

      setLocation(loc.coords);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setLoading(false);
    })();
  }, []);

  const handleUpload = async () => {
    try {
      if (!location) return;

      const locationRef = push(ref(realtimeDb, 'elephant_locations')); // ✅ Use Realtime DB path
      await set(locationRef, {
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: new Date().toISOString(),
        reportedBy: 'wildlife_officer',
      });

      Alert.alert('Uploaded', 'Elephant location uploaded successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {location && (
          <Marker coordinate={location} title="Elephant Detected">
            <Image
              source={require('../assets/elephant.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Upload Elephant Location" onPress={handleUpload} />
      </View>
    </View>
  );
};

export default UploadLocation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1 },
  buttonContainer: { padding: 20, backgroundColor: '#fff' },
});
