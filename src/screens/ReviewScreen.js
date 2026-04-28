import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WishlistContext } from '../context/WishlistContext';

const COLORS = { bg: "#0B0F19", gold: "#E5A93C", grey: "#A0A0A0" };

export default function ReviewScreen({ route, navigation }) {
  const { movie } = route.params;
  const { addReview } = useContext(WishlistContext);
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSave = () => {
    addReview(movie.id, rating, review);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }} style={styles.poster} />
        <Text style={styles.title}>Rate & Review</Text>
        <Text style={styles.movieTitle}>{movie.title}</Text>
      </View>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons name={star <= rating ? "star" : "star-outline"} size={40} color={COLORS.gold} style={{ marginHorizontal: 5 }} />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="What did you think about this movie?"
        placeholderTextColor={COLORS.grey}
        multiline
        value={review}
        onChangeText={setReview}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 25 },
  backBtn: { alignSelf: 'flex-end' },
  header: { alignItems: 'center', marginTop: 10 },
  poster: { width: 100, height: 150, borderRadius: 10, marginBottom: 15 },
  title: { color: COLORS.grey, fontFamily: "Poppins_400Regular", fontSize: 14 },
  movieTitle: { color: "white", fontFamily: "Poppins_700Bold", fontSize: 22, textAlign: 'center' },
  starsContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 30 },
  input: { backgroundColor: 'rgba(160,160,160,0.1)', color: 'white', borderRadius: 15, padding: 20, height: 150, textAlignVertical: 'top', fontFamily: "Poppins_400Regular", borderWidth: 1, borderColor: 'rgba(160,160,160,0.3)' },
  saveBtn: { backgroundColor: COLORS.gold, paddingVertical: 15, borderRadius: 30, alignItems: 'center', marginTop: 30 },
  saveBtnText: { color: COLORS.bg, fontFamily: "Poppins_700Bold", fontSize: 16 },
});