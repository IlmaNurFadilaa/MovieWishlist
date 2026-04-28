import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WishlistContext } from "../context/WishlistContext";
import { getMovieCredits, getMovieDetails } from "../services/api";

const COLORS = {
  bg: "#0B0F19",
  red: "#B7121A",
  gold: "#E5A93C",
  grey: "#A0A0A0",
  lightGrey: "#E0E0E0",
};

export default function MovieDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Detail");

  const { wishlist, toggleWishlist } = useContext(WishlistContext);

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
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  const wishlistItem = wishlist.find((item) => item.id === movie.id);
  const isWishlisted = !!wishlistItem;
  const isReviewed = wishlistItem?.status === "Reviewed";

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "";
  const genres = movie.genres
    ? movie.genres.map((g) => g.name).join(", ")
    : "-";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="white" />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
          }}
          style={styles.backdrop}
        >
          <LinearGradient
            colors={["transparent", "rgba(11, 15, 25, 0.7)", COLORS.bg]}
            locations={[0, 0.5, 1]}
            style={styles.gradientOverlay}
          />
        </ImageBackground>

        <View style={styles.centerContent}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{releaseYear}</Text>
        </View>

        <View style={styles.tabContainer}>
          {["Detail", "Overview", "Cast"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === "Detail" && (
            <View>
              <DetailRow label="Title" value={movie.title} />
              <DetailRow label="Original Title" value={movie.original_title} />
              <DetailRow label="Genres" value={genres} />
              <DetailRow label="Release Date" value={movie.release_date} />
              <DetailRow label="Status" value={movie.status} />
              <DetailRow label="Runtime" value={`${movie.runtime} minutes`} />
            </View>
          )}

          {activeTab === "Overview" && (
            <Text style={styles.overviewText}>{movie.overview}</Text>
          )}

          {activeTab === "Cast" && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.castContainer}
            >
              {cast.slice(0, 10).map((actor) => (
                <View key={actor.id} style={styles.castCard}>
                  <Image
                    source={{
                      uri: actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/100x150?text=No+Image",
                    }}
                    style={styles.castImage}
                  />
                  <Text style={styles.castName} numberOfLines={2}>
                    {actor.name}
                  </Text>
                  <Text style={styles.castCharacter} numberOfLines={1}>
                    {actor.character}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.actionButtonsContainer}>
          {/* Kondisi 1: Belum ada di wishlist (Tombol Emas) */}
          {!isWishlisted && (
            <TouchableOpacity
              style={styles.wishlistBtnLarge}
              onPress={() => toggleWishlist(movie)}
            >
              <Ionicons name="bookmark" size={20} color={COLORS.bg} />
              <Text style={styles.wishlistBtnTextLarge}>Add to Wishlist</Text>
            </TouchableOpacity>
          )}

          {/* Kondisi 2: Ada di wishlist (Tombol Merah) */}
          {isWishlisted && !isReviewed && (
            <>
              <TouchableOpacity
                style={[styles.wishlistBtnLarge, styles.wishlistedBtn]}
                onPress={() => toggleWishlist(movie)}
              >
                <Ionicons name="trash-outline" size={20} color="white" />
                <Text style={[styles.wishlistBtnTextLarge, { color: "white" }]}>
                  Remove from Wishlist
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reviewBtn}
                onPress={() => navigation.navigate("Review", { movie })}
              >
                <Ionicons name="star" size={20} color={COLORS.gold} />
                <Text style={styles.reviewBtnText}>Write a Review</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Kondisi 3: Sudah diulas (Badge Riwayat) */}
          {isWishlisted && isReviewed && (
            <View style={styles.reviewedBadge}>
              <Ionicons
                name="checkmark-done-circle"
                size={24}
                color={COLORS.gold}
              />
              <Text style={styles.reviewedBadgeText}>
                Reviewed on {wishlistItem.reviewDate}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailColon}>:</Text>
    <Text style={styles.detailValue}>{value || "-"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  backdrop: { width: "100%", height: 250 },
  gradientOverlay: { flex: 1 },
  centerContent: { alignItems: "center", marginTop: -100 },
  poster: { width: 140, height: 210, borderRadius: 12 },
  title: {
    color: "white",
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    marginTop: 15,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  year: {
    color: COLORS.lightGrey,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 25,
    paddingHorizontal: 25,
    gap: 20,
  },
  tabText: {
    color: COLORS.grey,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
  },
  tabTextActive: { color: "white", fontFamily: "Poppins_600SemiBold" },
  activeLine: {
    height: 2,
    backgroundColor: "white",
    marginTop: 2,
    width: "100%",
  },
  tabContent: { paddingHorizontal: 25, marginTop: 20, minHeight: 180 },
  detailRow: { flexDirection: "row", marginBottom: 10 },
  detailLabel: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    width: 120,
    fontSize: 13,
  },
  detailColon: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    marginRight: 10,
    fontSize: 13,
  },
  detailValue: {
    color: COLORS.lightGrey,
    fontFamily: "Poppins_400Regular",
    flex: 1,
    fontSize: 13,
  },
  overviewText: {
    color: COLORS.lightGrey,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  castContainer: { marginTop: 5 },
  castCard: { width: 100, marginRight: 15, alignItems: "center" },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.grey,
  },
  castName: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    textAlign: "center",
  },
  castCharacter: {
    color: COLORS.gold,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },

  actionButtonsContainer: { paddingHorizontal: 30, marginTop: 20, gap: 15 },
  wishlistBtnLarge: {
    flexDirection: "row",
    backgroundColor: COLORS.gold,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // PERUBAHAN: Warna background tombol hapus menjadi Merah khas aplikasi
  wishlistedBtn: { backgroundColor: COLORS.red, borderWidth: 0 },

  wishlistBtnTextLarge: {
    color: COLORS.bg,
    fontFamily: "Poppins_700Bold",
    marginLeft: 10,
    fontSize: 16,
  },
  reviewBtn: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  reviewBtnText: {
    color: COLORS.gold,
    fontFamily: "Poppins_700Bold",
    marginLeft: 10,
    fontSize: 16,
  },

  reviewedBadge: {
    flexDirection: "row",
    backgroundColor: "rgba(160,160,160,0.05)",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(160,160,160,0.2)",
  },
  reviewedBadgeText: {
    color: COLORS.grey,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 10,
    fontSize: 14,
  },
});
