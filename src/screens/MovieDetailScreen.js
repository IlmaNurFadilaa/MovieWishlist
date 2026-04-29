import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SettingsContext } from "../context/SettingsContext"; // IMPORT CONTEXT
import { WishlistContext } from "../context/WishlistContext";
import { getMovieCredits, getMovieDetails } from "../services/api";

export default function MovieDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Detail");

  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { colors, t } = useContext(SettingsContext); // AMBIL DATA CONTEXT

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      const castData = await getMovieCredits(id);
      setMovie(data);
      setCast(castData);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading || !movie) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg, justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  const wishlistItem = wishlist.find((item) => item.id === movie.id);
  const isWishlisted = !!wishlistItem;
  const isReviewed = wishlistItem?.status === "Reviewed";

  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "";
  const genres = movie.genres ? movie.genres.map((g) => g.name).join(", ") : "-";

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="white" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` }} style={styles.backdrop}>
          <LinearGradient colors={["transparent", "rgba(0,0,0, 0.7)", colors.bg]} locations={[0, 0.5, 1]} style={styles.gradientOverlay} />
        </ImageBackground>

        <View style={styles.centerContent}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
          <Text style={[styles.title, { color: colors.text }]}>{movie.title}</Text>
          <Text style={{ color: colors.grey, fontSize: 14, fontFamily: "Poppins_400Regular" }}>{releaseYear}</Text>
        </View>

        <View style={styles.tabContainer}>
          {[{ key: "Detail", label: t.details }, { key: "Overview", label: t.overview }, { key: "Cast", label: t.cast }].map((tab) => (
            <TouchableOpacity key={tab.key} onPress={() => setActiveTab(tab.key)}>
              <Text style={[styles.tabText, activeTab === tab.key ? { color: colors.text, fontFamily: "Poppins_600SemiBold" } : { color: colors.grey }]}>
                {tab.label}
              </Text>
              {activeTab === tab.key && <View style={[styles.activeLine, { backgroundColor: colors.text }]} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === "Detail" && (
            <View>
              <DetailRow label="Title" value={movie.title} colors={colors} />
              <DetailRow label="Original Title" value={movie.original_title} colors={colors} />
              <DetailRow label="Genres" value={genres} colors={colors} />
              <DetailRow label="Release Date" value={movie.release_date} colors={colors} />
              <DetailRow label="Status" value={movie.status} colors={colors} />
              <DetailRow label="Runtime" value={`${movie.runtime} minutes`} colors={colors} />
            </View>
          )}

          {activeTab === "Overview" && (
            <Text style={{ color: colors.grey, fontFamily: "Poppins_400Regular", fontSize: 14, lineHeight: 22 }}>{movie.overview}</Text>
          )}

          {activeTab === "Cast" && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castContainer}>
              {cast.slice(0, 10).map((actor) => (
                <View key={actor.id} style={styles.castCard}>
                  <Image source={{ uri: actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/100x150?text=No+Image" }} style={[styles.castImage, { borderColor: colors.border }]} />
                  <Text style={[styles.castName, { color: colors.text }]} numberOfLines={2}>{actor.name}</Text>
                  <Text style={{ color: colors.gold, fontFamily: "Poppins_400Regular", fontSize: 10, textAlign: "center", marginTop: 2 }} numberOfLines={1}>{actor.character}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.actionButtonsContainer}>
          {!isWishlisted && (
            <TouchableOpacity style={[styles.wishlistBtnLarge, { backgroundColor: colors.gold }]} onPress={() => toggleWishlist(movie)}>
              <Ionicons name="bookmark" size={20} color={colors.bg} />
              <Text style={[styles.wishlistBtnTextLarge, { color: colors.bg }]}>{t.add_wishlist}</Text>
            </TouchableOpacity>
          )}

          {isWishlisted && !isReviewed && (
            <>
              <TouchableOpacity style={[styles.wishlistBtnLarge, { backgroundColor: colors.red }]} onPress={() => toggleWishlist(movie)}>
                <Ionicons name="trash-outline" size={20} color="white" />
                <Text style={[styles.wishlistBtnTextLarge, { color: "white" }]}>{t.remove_wishlist}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.reviewBtn, { borderColor: colors.gold }]} onPress={() => navigation.navigate("Review", { movie })}>
                <Ionicons name="star" size={20} color={colors.gold} />
                <Text style={{ color: colors.gold, fontFamily: "Poppins_700Bold", marginLeft: 10, fontSize: 16 }}>{t.write_review}</Text>
              </TouchableOpacity>
            </>
          )}

          {isWishlisted && isReviewed && (
            <View style={[styles.reviewedBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="checkmark-done-circle" size={24} color={colors.gold} />
              <Text style={{ color: colors.grey, fontFamily: "Poppins_600SemiBold", marginLeft: 10, fontSize: 14 }}>
                {t.reviewed_on} {wishlistItem.reviewDate}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const DetailRow = ({ label, value, colors }) => (
  <View style={styles.detailRow}>
    <Text style={[styles.detailLabel, { color: colors.text }]}>{label}</Text>
    <Text style={[styles.detailColon, { color: colors.text }]}>:</Text>
    <Text style={[styles.detailValue, { color: colors.grey }]}>{value || "-"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  backdrop: { width: "100%", height: 250 },
  gradientOverlay: { flex: 1 },
  centerContent: { alignItems: "center", marginTop: -100 },
  poster: { width: 140, height: 210, borderRadius: 12 },
  title: { fontSize: 22, fontFamily: "Poppins_700Bold", marginTop: 15, textAlign: "center", paddingHorizontal: 20 },
  tabContainer: { flexDirection: "row", marginTop: 25, paddingHorizontal: 25, gap: 20 },
  tabText: { fontFamily: "Poppins_400Regular", fontSize: 15 },
  activeLine: { height: 2, marginTop: 2, width: "100%" },
  tabContent: { paddingHorizontal: 25, marginTop: 20, minHeight: 180 },
  detailRow: { flexDirection: "row", marginBottom: 10 },
  detailLabel: { fontFamily: "Poppins_600SemiBold", width: 120, fontSize: 13 },
  detailColon: { fontFamily: "Poppins_600SemiBold", marginRight: 10, fontSize: 13 },
  detailValue: { fontFamily: "Poppins_400Regular", flex: 1, fontSize: 13 },
  castContainer: { marginTop: 5 },
  castCard: { width: 100, marginRight: 15, alignItems: "center" },
  castImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8, borderWidth: 1 },
  castName: { fontFamily: "Poppins_600SemiBold", fontSize: 12, textAlign: "center" },
  actionButtonsContainer: { paddingHorizontal: 30, marginTop: 20, gap: 15 },
  wishlistBtnLarge: { flexDirection: "row", paddingVertical: 15, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  wishlistBtnTextLarge: { fontFamily: "Poppins_700Bold", marginLeft: 10, fontSize: 16 },
  reviewBtn: { flexDirection: "row", backgroundColor: "transparent", paddingVertical: 15, borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  reviewedBadge: { flexDirection: "row", paddingVertical: 15, borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 1 },
});