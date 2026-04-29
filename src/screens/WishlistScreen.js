import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsContext } from '../context/SettingsContext';
import { WishlistContext } from '../context/WishlistContext';

export default function WishlistScreen({ navigation }) {
  const { wishlist } = useContext(WishlistContext);
  const { colors, t } = useContext(SettingsContext);
  const [filter, setFilter] = useState('To Watch');

  const filteredData = wishlist.filter(item => item.status === filter);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>{t.wishlist}</Text>
      
      <View style={[styles.segmentContainer, { backgroundColor: colors.card }]}>
        {['To Watch', 'Reviewed'].map(tab => (
          <TouchableOpacity key={tab} style={[styles.segmentBtn, filter === tab && { backgroundColor: colors.gold }]} onPress={() => setFilter(tab)}>
            <Text style={[styles.segmentText, { color: filter === tab ? colors.bg : colors.grey }]}>
              {tab === 'To Watch' ? t.to_watch : t.reviewed}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{ color: colors.grey, textAlign: 'center', marginTop: 50 }}>{t.no_movies || "No movies yet"}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => navigation.navigate("MovieDetail", { id: item.id })}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
              {filter === 'Reviewed' ? (
                <View>
                  <Text style={{ color: colors.gold }}><Ionicons name="star" /> {item.rating}/5</Text>
                  <Text style={[styles.reviewText, { color: colors.grey }]} numberOfLines={2}>"{item.review}"</Text>
                </View>
              ) : (
                <Text style={{ color: colors.grey, fontSize: 12 }}>{t.pending_review || "Pending Review"}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontFamily: "Poppins_700Bold", marginVertical: 20 },
  segmentContainer: { flexDirection: 'row', borderRadius: 10, padding: 5, marginBottom: 20 },
  segmentBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  segmentText: { fontFamily: "Poppins_600SemiBold", fontSize: 13 },
  card: { flexDirection: 'row', borderRadius: 15, padding: 12, marginBottom: 15, borderWidth: 1 },
  poster: { width: 70, height: 100, borderRadius: 10 },
  info: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  title: { fontSize: 16, fontFamily: "Poppins_700Bold" },
  reviewText: { fontSize: 12, fontStyle: 'italic', marginTop: 4 }
});