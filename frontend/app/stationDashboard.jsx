// app/stationDashboard.jsx
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Button, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function StationDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏫 Station Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
