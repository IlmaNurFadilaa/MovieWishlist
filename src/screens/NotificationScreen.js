import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsContext } from "../context/SettingsContext"; // IMPORT CONTEXT
import { WishlistContext } from "../context/WishlistContext";

export default function NotificationScreen({ navigation }) {
  const { wishlist } = useContext(WishlistContext);
  const { colors, t } = useContext(SettingsContext); // AMBIL DATA CONTEXT
  
  const unreviewed = wishlist.filter(item => item.status === "To Watch");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{t.notifications}</Text>
      </View>

      <FlatList
        data={unreviewed}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{ color: colors.grey, textAlign: 'center', marginTop: 50, fontFamily: "Poppins_400Regular" }}>{t.no_notif}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.notifCard, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("MovieDetail", { id: item.id })}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(229, 169, 60, 0.1)' }]}>
              <Ionicons name="star-outline" size={20} color={colors.gold} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.notifTitle, { color: colors.text }]}>{t.rate_this}</Text>
              <Text style={{ color: colors.grey, fontFamily: "Poppins_400Regular", fontSize: 12, marginTop: 2 }}>{t.rate_desc} "{item.title}"?</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 15 },
  title: { fontSize: 22, fontFamily: "Poppins_700Bold" },
  notifCard: { flexDirection: 'row', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', borderWidth: 1 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, marginLeft: 15 },
  notifTitle: { fontFamily: "Poppins_600SemiBold", fontSize: 14 }
});