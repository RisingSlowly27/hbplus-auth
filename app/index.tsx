import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { useGoogleAuth } from "../src/utils/googleAuth";

export default function Login() {
  const { promptAsync } = useGoogleAuth();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const pattern = require("../assets/hb-pattern.png");

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
      if (user.email.endsWith("@hbplus.fit")) {
        router.push("/dashboard");
      } else {
        alert(
          "Access restricted. Please login using your official domain email.",
        );
      }
    }
  }, [user]);

  return (
    <ImageBackground
      source={pattern}
      style={styles.container}
      resizeMode="stretch"
    >
      <Text style={styles.logo}>HB+</Text>

      <Text style={styles.subtitle}>Your Route to Comprehensive Wellness</Text>

      <View style={styles.features}>
        <Text style={styles.feature}>✓ Personalized wellness journeys</Text>
        <Text style={styles.feature}>✓ Strength, agility & flexibility</Text>
        <Text style={styles.feature}>✓ Mental & gut health focus</Text>
        <Text style={styles.feature}>✓ Community-driven wellness</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome to HB+</Text>

        <Text style={styles.description}>
          Sign in with your official HB+ account to access your wellness
          dashboard.
        </Text>

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <View style={styles.buttonContent}>
            <FaGoogle size={18} color="white" />
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Continue with Google"}
            </Text>
          </View>
        </Pressable>

        <Text style={styles.note}>Only official domain emails are allowed</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 72,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
  },

  features: {
    marginBottom: 40,
    alignItems: "center",
  },

  feature: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },

  card: {
    width: 420,
    padding: 40,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#9F4022",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  note: {
    marginTop: 18,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },

  footer: {
    marginTop: 30,
    fontSize: 12,
    color: "#888",
  },
});
