import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WishlistContext } from "../context/WishlistContext";

const COLORS = {
  bg: "#0B0F19",
  red: "#B7121A",
  gold: "#E5A93C",
  grey: "#A0A0A0",
  lightGrey: "#E0E0E0",
};

export default function ProfileScreen({ navigation }) {
  // Ambil data dari context untuk statistik dinamis
  const { wishlist } = useContext(WishlistContext);

  const toWatchCount = wishlist.filter(
    (item) => item.status === "To Watch",
  ).length;
  const reviewedCount = wishlist.filter(
    (item) => item.status === "Reviewed",
  ).length;
  const totalMovies = wishlist.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* KARTU PROFIL UTAMA (OVERLAPPING) */}
        <View style={styles.mainCard}>
          {/* Gambar Profil Melayang (Overlapping) */}
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: "https://via.placeholder.com/150/A0A0A0/FFFFFF?text=IF",
              }} // Ganti dengan gambar aslimu jika ada
              style={styles.profileImage}
            />
          </View>

          {/* Info Pengguna */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ilma Fadila</Text>
            <Text style={styles.userUsername}>@ilmafadila</Text>
          </View>

          {/* Badge Premium (Seperti di referensi) */}
          <TouchableOpacity style={styles.premiumBadge}>
            <Ionicons name="crown" size={14} color={COLORS.bg} />
            <Text style={styles.premiumText}>Premium</Text>
          </TouchableOpacity>

          {/* Statistik Dinamis */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{totalMovies}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statNumber}>{toWatchCount}</Text>
              <Text style={styles.statLabel}>To Watch</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{reviewedCount}</Text>
              <Text style={styles.statLabel}>Reviewed</Text>
            </View>
          </View>

          {/* Banner Promo dalam Kartu */}
          <View style={styles.promoBanner}>
            <View style={styles.promoTextContainer}>
              <Ionicons name="star" size={20} color={COLORS.gold} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.promoTitle}>Unlock All Features!</Text>
                <Text style={styles.promoDesc}>
                  Get personalized movie recs.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* KARTU MENU BAWAH */}
        <View style={styles.menuCard}>
          <MenuItem icon="person-outline" text="Edit Profile" />
          <MenuItem
            icon="bookmark-outline"
            text="My Wishlist"
            onPress={() => navigation.navigate("WishlistTab")}
          />
          <MenuItem icon="stats-chart-outline" text="Viewing Statistics" />
          <MenuItem icon="settings-outline" text="Settings" />

          {/* Tombol Logout */}
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0, marginTop: 10 }]}
            onPress={() => navigation.replace("Login")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.red} />
              <Text style={[styles.menuItemText, { color: COLORS.red }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Komponen Pembantu untuk List Menu
const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon} size={22} color={COLORS.grey} />
      <Text style={styles.menuItemText}>{text}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 40, // Ruang ekstra untuk overlap gambar profil
  },
  headerTitle: { color: "white", fontSize: 26, fontFamily: "Poppins_700Bold" },
  notificationBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "rgba(160,160,160,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(160,160,160,0.2)",
  },
  notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.red,
  },

  // MAIN CARD STYLE
  mainCard: {
    backgroundColor: "rgba(160,160,160,0.05)",
    marginHorizontal: 25,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(160,160,160,0.1)",
    marginTop: 40, // Memberi ruang untuk gambar profil
  },
  profileImageContainer: {
    alignSelf: "center",
    marginTop: -50, // Membuat efek overlapping ke atas
    padding: 5,
    backgroundColor: COLORS.bg, // Border warna background agar terlihat menyatu
    borderRadius: 60,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  userInfo: { alignItems: "center", marginTop: 10 },
  userName: { color: "white", fontSize: 20, fontFamily: "Poppins_700Bold" },
  userUsername: {
    color: COLORS.grey,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },

  premiumBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: COLORS.gold,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: "center",
  },
  premiumText: {
    color: COLORS.bg,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    marginLeft: 5,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(160,160,160,0.1)",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 25,
  },
  statBox: { alignItems: "center", flex: 1 },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(160,160,160,0.2)",
  },
  statNumber: { color: "white", fontSize: 18, fontFamily: "Poppins_700Bold" },
  statLabel: {
    color: COLORS.grey,
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },

  promoBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(229, 169, 60, 0.1)",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(229, 169, 60, 0.3)",
  },
  promoTextContainer: { flexDirection: "row", alignItems: "center" },
  promoTitle: {
    color: COLORS.gold,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
  promoDesc: {
    color: COLORS.grey,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
  },
  promoBtn: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  promoBtnText: {
    color: COLORS.bg,
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
  },

  // MENU CARD STYLE
  menuCard: {
    backgroundColor: "rgba(160,160,160,0.05)",
    marginHorizontal: 25,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(160,160,160,0.1)",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(160,160,160,0.1)",
  },
  menuItemLeft: { flexDirection: "row", alignItems: "center" },
  menuItemText: {
    color: "white",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 15,
  },
});
