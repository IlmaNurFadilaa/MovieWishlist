import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SettingsContext } from "../context/SettingsContext";

export default function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { colors, t } = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Logo Kiri Tetap Ada */}
      <View style={[styles.logoCircle, { backgroundColor: colors.gold }]} />

      {/* Kotak Pencarian Sekarang Lebih Lebar karena ikon profil dihapus */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={18} color={colors.grey} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t.search}
          placeholderTextColor={colors.grey}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (onSearch) onSearch(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 42,
    marginLeft: 15, // Jarak dari logo
    borderWidth: 1,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    height: "100%",
    outlineStyle: 'none',
  },
});