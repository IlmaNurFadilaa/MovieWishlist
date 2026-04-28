import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const COLORS = { bg: "#0B0F19", grey: "#A0A0A0", gold: "#E5A93C" };

const Header = ({ onSearch }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text); // Kirim kata kunci ke HomeScreen
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoCircleSmall} />

      <View
        style={[styles.searchBar, isSearchFocused && styles.searchBarActive]}
      >
        <Ionicons
          name="search"
          size={20}
          color={isSearchFocused ? COLORS.gold : COLORS.grey}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movie"
          placeholderTextColor={COLORS.grey}
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          underlineColorAndroid="transparent" // MENGHILANGKAN GARIS BAWAH ANDROID
        />
      </View>

      <Ionicons name="person-circle-outline" size={34} color={COLORS.grey} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: COLORS.bg,
    zIndex: 10,
  },
  logoCircleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(160, 160, 160, 0.1)",
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "transparent",
  },
  searchBarActive: {
    borderColor: COLORS.gold,
    backgroundColor: "rgba(229, 169, 60, 0.05)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "white",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    paddingVertical: 0, // Memastikan tidak ada padding tambahan yang buat garis
  },
});

export default Header;
