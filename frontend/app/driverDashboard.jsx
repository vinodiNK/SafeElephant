// app/driverDashboard.jsx
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Button, Text, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function DriverDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/'); // go back to login page
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🚛 Driver Dashboard</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
