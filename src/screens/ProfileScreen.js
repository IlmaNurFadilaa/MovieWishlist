import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsContext } from "../context/SettingsContext";
import { WishlistContext } from "../context/WishlistContext";

export default function ProfileScreen({ navigation }) {
  const { wishlist } = useContext(WishlistContext);
  const { colors, t } = useContext(SettingsContext);

  const toWatchCount = wishlist.filter((item) => item.status === "To Watch").length;
  const reviewedCount = wishlist.filter((item) => item.status === "Reviewed").length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ width: 45 }} /> 
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t.profile}</Text>
        <TouchableOpacity 
          style={[styles.notificationBtn, { backgroundColor: colors.card, borderColor: colors.border }]} 
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
          {toWatchCount > 0 && <View style={[styles.notificationDot, { backgroundColor: colors.red }]} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* PERUBAHAN DI SINI: marginTop dinaikkan jadi 90 agar jarak dari header ke foto lebih lega */}
        <View style={[styles.mainCard, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 90 }]}>
          
          <View style={[styles.profileImageContainer, { backgroundColor: colors.bg }]}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80" }} 
              style={styles.profileImage} 
            />
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>Ilma Fadila</Text>
            <Text style={{ color: colors.grey, fontSize: 13, fontFamily: "Poppins_400Regular" }}>@ilmafadila</Text>
          </View>

          <View style={[styles.statsContainer, { backgroundColor: colors.bg }]}>
            <StatBox number={wishlist.length} label={t.saved} colors={colors} />
            <StatBox number={toWatchCount} label={t.to_watch} colors={colors} border />
            <StatBox number={reviewedCount} label={t.reviewed} colors={colors} />
          </View>
        </View>

        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem icon="person-outline" text={t.edit_profile} onPress={() => navigation.navigate("EditProfile")} colors={colors} />
          <MenuItem icon="bookmark-outline" text={t.wishlist} onPress={() => navigation.navigate("WishlistTab")} colors={colors} />
          <MenuItem icon="stats-chart-outline" text={t.view_stats} onPress={() => navigation.navigate("Statistics")} colors={colors} />
          <MenuItem icon="settings-outline" text={t.settings} onPress={() => navigation.navigate("Settings")} colors={colors} />
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomWidth: 0, marginTop: 5 }]} 
            onPress={() => navigation.replace("Login")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={22} color={colors.red} />
              <Text style={[styles.menuItemText, { color: colors.red }]}>{t.logout}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const StatBox = ({ number, label, colors, border }) => (
  <View style={[styles.statBox, border && { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border }]}>
    <Text style={[styles.statNumber, { color: colors.text }]}>{number}</Text>
    <Text style={{ color: colors.grey, fontSize: 11, fontFamily: "Poppins_400Regular" }}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, text, onPress, colors }) => (
  <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon} size={22} color={colors.grey} />
      <Text style={[styles.menuItemText, { color: colors.text }]}>{text}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={colors.grey} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    paddingTop: 10,
    height: 60
  },
  headerTitle: { 
    fontSize: 20, 
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    flex: 1
  },
  notificationBtn: { width: 42, height: 42, borderRadius: 12, justifyContent: "center", alignItems: "center", borderWidth: 1 },
  notificationDot: { position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: "white" },
  mainCard: { marginHorizontal: 25, borderRadius: 30, paddingHorizontal: 20, paddingBottom: 25, borderWidth: 1 },
  profileImageContainer: { alignSelf: "center", marginTop: -50, padding: 6, borderRadius: 55 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  userInfo: { alignItems: "center", marginTop: 15 },
  userName: { fontSize: 22, fontFamily: "Poppins_700Bold" },
  statsContainer: { flexDirection: "row", justifyContent: "space-around", borderRadius: 20, paddingVertical: 15, marginTop: 25 },
  statBox: { alignItems: "center", flex: 1 },
  statNumber: { fontSize: 18, fontFamily: "Poppins_700Bold" },
  menuCard: { marginHorizontal: 25, borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, marginTop: 25, borderWidth: 1 },
  menuItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1 },
  menuItemLeft: { flexDirection: "row", alignItems: "center" },
  menuItemText: { fontFamily: "Poppins_600SemiBold", fontSize: 14, marginLeft: 15 },
});