import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://avatars.githubusercontent.com/u/183993776?v=4",
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>ZeroLL</Text>
            <Text style={styles.email}>zeroll@gmail.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App info</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>App Name</Text>
            <Text style={styles.rowValue}>Nexara</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Developer</Text>
            <Text style={styles.rowValue}>Nexara Studio</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Build Info</Text>
            <Text style={styles.rowValue}>React Native Client App</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Platform</Text>
            <Text style={styles.rowValue}>Android / iOS</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Data Source</Text>
            <Text style={styles.rowValue}>Local JSON</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Nexara</Text>
          <Text style={styles.aboutText}>
            Nexara is a mobile game catalog app that helps users discover and
            explore a variety of games in one place. Nexara focuses on
            displaying game information such as descriptions, trailers,
            screenshots, ratings, and game categories, making it easy for users
            to find games that suit their interests.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF2FF",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E0EAFF",
  },
  userInfo: {
    marginLeft: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4F46E5",
  },
  email: {
    marginTop: 2,
    fontSize: 13,
    color: "#7C3AED",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4F46E5",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: 13,
    color: "#6B21A8",
  },
  rowValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "500",
  },
  aboutText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 19,
  },
});
