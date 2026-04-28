import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useContext } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { getPopularMovies, getTrendingMovies, searchMovies } from "../services/api";
import { WishlistContext } from "../context/WishlistContext"; // IMPORT CONTEXT

const COLORS = {
  bg: "#0B0F19",
  red: "#B7121A",
  gold: "#E5A93C",
  grey: "#A0A0A0",
};

export default function HomeScreen({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  const { wishlist } = useContext(WishlistContext); // AMBIL DATA WISHLIST

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const trendingData = await getTrendingMovies();
    const popularData = await getPopularMovies();
    setTrending(trendingData);
    setPopular(popularData);
    setLoading(false);
  };

  const handleSearch = async (query) => {
    if (query.length > 2) {
      setIsSearching(true);
      const results = await searchMovies(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  // FUNGSI UNTUK MERENDER PITA BOOKMARK
  const renderBookmark = (id) => {
    if (wishlist.some(item => item.id === id)) {
      return (
        <Ionicons 
          name="bookmark" 
          size={36} 
          color="white" 
          style={styles.bookmarkIcon} 
        />
      );
    }
    return null;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  const heroMovie = trending[0];

  return (
    <SafeAreaView style={styles.container}>
      <Header onSearch={handleSearch} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {isSearching ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={searchResults}
              numColumns={2} 
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false} 
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.movieCardGrid}
                  onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
                >
                  <View>
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                      style={styles.posterGrid}
                    />
                    {renderBookmark(item.id)}
                  </View>
                  <Text style={styles.movieTitleGrid} numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <>
            {heroMovie && (
              <TouchableOpacity 
                style={styles.heroContainer}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("MovieDetail", { id: heroMovie.id })}
              >
                <ImageBackground
                  source={{ uri: `https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path}` }}
                  style={styles.heroBanner}
                  imageStyle={styles.heroImage}
                >
                  {renderBookmark(heroMovie.id)}
                  <LinearGradient
                    colors={["transparent", "rgba(11, 15, 25, 0.4)", "rgba(11, 15, 25, 0.9)", COLORS.bg]}
                    locations={[0, 0.5, 0.85, 1]}
                    style={styles.linearGradient}
                  >
                    <View style={styles.heroContent}>
                      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${heroMovie.poster_path}` }} style={styles.heroPoster} />
                      <View style={styles.heroInfo}>
                        <Text style={styles.heroTitle}>{heroMovie.title}</Text>
                        <Text style={styles.heroDesc} numberOfLines={2}>{heroMovie.overview}</Text>
                        <View style={styles.wishlistBtn}>
                          <Ionicons name="play" size={18} color={COLORS.bg} />
                          <Text style={styles.wishlistBtnText}>View Details</Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            )}

            {[ { title: "Trending", data: trending }, { title: "Popular", data: popular } ].map((section) => (
              <View key={section.title} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={section.data}
                  keyExtractor={(item) => section.title + item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={styles.movieCard}
                      onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
                    >
                      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                      {renderBookmark(item.id)}
                    </TouchableOpacity>
                  )}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  heroContainer: { marginHorizontal: 20, marginTop: 10, height: 320 },
  heroBanner: { width: "100%", height: "100%" },
  heroImage: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  linearGradient: { position: "absolute", left: 0, right: 0, top: 0, bottom: -2, padding: 15, justifyContent: "flex-end" },
  heroContent: { flexDirection: "row", alignItems: "flex-end", paddingBottom: 5 },
  heroPoster: { width: 90, height: 130, borderRadius: 12, borderWidth: 2, borderColor: COLORS.gold },
  heroInfo: { flex: 1, marginLeft: 15 },
  heroTitle: { color: "white", fontSize: 20, fontFamily: "Poppins_700Bold" },
  heroDesc: { color: COLORS.grey, fontSize: 11, fontFamily: "Poppins_400Regular", marginVertical: 5 },
  wishlistBtn: { flexDirection: "row", backgroundColor: COLORS.gold, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, alignSelf: "flex-start", alignItems: "center", marginTop: 5 },
  wishlistBtnText: { color: COLORS.bg, fontFamily: "Poppins_700Bold", marginLeft: 8, fontSize: 12 },
  sectionContainer: { marginTop: 15 },
  sectionTitle: { color: "white", fontSize: 22, fontFamily: "Poppins_700Bold", marginLeft: 20, marginBottom: 15 },
  movieCard: { marginLeft: 20, marginBottom: 30 },
  poster: { width: 130, height: 190, borderRadius: 15 },
  movieCardGrid: { flex: 1, margin: 10, alignItems: "center" },
  posterGrid: { width: 130, height: 190, borderRadius: 15 },
  movieTitleGrid: { color: "white", marginTop: 5, fontFamily: "Poppins_400Regular", fontSize: 12, width: 130, textAlign: "center" },
  // STYLE PITA BOOKMARK
  bookmarkIcon: {
    position: 'absolute',
    top: -5,
    left: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});