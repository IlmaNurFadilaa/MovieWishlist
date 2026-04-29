import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WishlistContext } from "../context/WishlistContext";

const COLORS = { bg: "#0B0F19", gold: "#E5A93C", grey: "#A0A0A0" };

export default function StatisticsScreen({ navigation }) {
  const { wishlist } = useContext(WishlistContext);
  const reviewed = wishlist.filter(i => i.status === "Reviewed").length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Statistics</Text>
      </View>

      <View style={styles.statGrid}>
        <StatItem label="Total Movies" value={wishlist.length} icon="film" />
        <StatItem label="Reviews Given" value={reviewed} icon="star" />
        <StatItem label="Avg. Rating" value="4.8" icon="trending-up" />
        <StatItem label="Hours Watched" value="124" icon="time" />
      </View>
    </SafeAreaView>
  );
}

const StatItem = ({ label, value, icon }) => (
  <View style={styles.statBox}>
    <Ionicons name={icon} size={24} color={COLORS.gold} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 25 },
  header: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 15 },
  title: { color: "white", fontSize: 22, fontFamily: "Poppins_700Bold" },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 20 },
  statBox: { width: '47%', backgroundColor: 'rgba(160,160,160,0.05)', padding: 20, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(160,160,160,0.1)' },
  statValue: { color: "white", fontSize: 24, fontFamily: "Poppins_700Bold", marginVertical: 5 },
  statLabel: { color: COLORS.grey, fontSize: 12, fontFamily: "Poppins_400Regular" }
});