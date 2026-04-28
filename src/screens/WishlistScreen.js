import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WishlistContext } from '../context/WishlistContext';

const COLORS = { bg: "#0B0F19", gold: "#E5A93C", grey: "#A0A0A0" };

export default function WishlistScreen({ navigation }) {
  const { wishlist } = useContext(WishlistContext);
  const [filter, setFilter] = useState('To Watch');

  const filteredData = wishlist.filter(item => item.status === filter);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My Wishlist</Text>
      
      <View style={styles.segmentContainer}>
        {['To Watch', 'Reviewed'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.segmentBtn, filter === tab && styles.segmentBtnActive]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.segmentText, filter === tab && styles.segmentTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No movies in this list yet.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
          >
            <View>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
              {/* Ikon penanda hanya untuk yang belum direview */}
              {filter === 'To Watch' && (
                <Ionicons name="bookmark" size={32} color="white" style={styles.bookmarkIcon} />
              )}
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              
              {filter === 'Reviewed' ? (
                <View>
                  <View style={styles.ratingRow}>
                    <Text style={styles.rating}><Ionicons name="star" color={COLORS.gold} /> {item.rating}/5</Text>
                    {/* MENAMPILKAN TANGGAL REVIEW */}
                    <Text style={styles.dateText}>{item.reviewDate}</Text>
                  </View>
                  <Text style={styles.reviewText} numberOfLines={3}>"{item.review}"</Text>
                </View>
              ) : (
                <Text style={styles.pendingText}>Pending Review...</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20 },
  headerTitle: { color: "white", fontSize: 24, fontFamily: "Poppins_700Bold", marginVertical: 20 },
  segmentContainer: { flexDirection: 'row', backgroundColor: 'rgba(160,160,160,0.1)', borderRadius: 10, padding: 5, marginBottom: 20 },
  segmentBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  segmentBtnActive: { backgroundColor: COLORS.gold },
  segmentText: { color: COLORS.grey, fontFamily: "Poppins_600SemiBold", fontSize: 14 },
  segmentTextActive: { color: COLORS.bg },
  emptyText: { color: COLORS.grey, textAlign: 'center', marginTop: 50, fontFamily: "Poppins_400Regular" },
  card: { flexDirection: 'row', backgroundColor: 'rgba(160,160,160,0.05)', borderRadius: 15, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(160,160,160,0.1)' },
  poster: { width: 80, height: 120, borderRadius: 10 },
  bookmarkIcon: { position: 'absolute', top: -5, left: 5, textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 5 },
  info: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  title: { color: "white", fontSize: 16, fontFamily: "Poppins_700Bold", marginBottom: 5 },
  
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  rating: { color: COLORS.gold, fontFamily: "Poppins_600SemiBold" },
  dateText: { color: COLORS.grey, fontFamily: "Poppins_400Regular", fontSize: 10 }, // Gaya Teks Tanggal
  
  reviewText: { color: COLORS.grey, fontFamily: "Poppins_400Regular", fontSize: 12, fontStyle: 'italic' },
  pendingText: { color: COLORS.grey, fontFamily: "Poppins_400Regular", fontSize: 12 },
});