import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { useGoogleAuth } from "../src/utils/googleAuth";

export default function Login() {
  const { promptAsync } = useGoogleAuth();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await promptAsync();
    } catch (error) {
      console.log("Login error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.email) {
      if (user.email.endsWith("iiests.ac.in")) {
        router.push("/dashboard");
      } else {
        alert(
          "Access restricted. Please login using your official domain email.",
        );
      }
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HBPlus Login</Text>

      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Login with Google"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fb",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
