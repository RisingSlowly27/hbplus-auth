import { Redirect, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.email}>Logged in as {user?.email}</Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          logout();
          router.replace("/");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  email: {
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#e63946",
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
