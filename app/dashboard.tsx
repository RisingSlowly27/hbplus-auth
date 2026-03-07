import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>HB+</Text>

        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            logout();
            router.replace("/");
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      {/* USER INFO */}
      <View style={styles.userSection}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* DASHBOARD CARDS */}
      <View style={styles.cards}>
        {[
          { title: "Workouts", text: "Access guided workouts" },
          { title: "Nutrition", text: "Personalized meal guidance" },
          { title: "Mindfulness", text: "Mental wellness exercises" },
          { title: "Progress", text: "Track your journey" },
        ].map((card, index) => (
          <Pressable
            key={index}
            onHoverIn={() => setHoveredCard(index)}
            onHoverOut={() => setHoveredCard(null)}
            style={[styles.card, hoveredCard === index && styles.cardHover]}
          >
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardText}>{card.text}</Text>
          </Pressable>
        ))}
      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>HB+ Wellness</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },

  logoutButton: {
    backgroundColor: "#9F4022",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  logoutText: {
    color: "white",
    fontWeight: "600",
  },

  userSection: {
    marginBottom: 30,
  },

  welcome: {
    fontSize: 32,
    fontWeight: "bold",
  },

  email: {
    color: "#666",
    marginTop: 4,
  },

  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
  },

  card: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    cursor: "pointer",
    elevation: 4,
  },

  cardHover: {
    transform: [{ translateY: -6 }],
    shadowOpacity: 0.15,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 16,
    color: "#666",
  },

  footer: {
    marginTop: 40,
    color: "#999",
    fontSize: 12,
  },
});
