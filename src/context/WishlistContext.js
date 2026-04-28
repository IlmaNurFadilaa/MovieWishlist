import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WishlistContext = createContext();

// DATA DUMMY DIPERBARUI DENGAN TANGGAL
const DUMMY_MOVIES = [
  {
    id: 1022789,
    title: "Inside Out 2",
    poster_path: "/vpnVM9B6NMmQpWeZbtHj8iBgYp8.jpg",
    status: "To Watch",
    rating: 0,
    review: "",
    reviewDate: ""
  },
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    status: "Reviewed",
    rating: 5,
    review: "Kocak banget parah! Actionnya dapet, komedinya juga pas banget buat ngakak bareng.",
    reviewDate: "20 April 2026"
  }
];

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(DUMMY_MOVIES);

  useEffect(() => {
    // loadWishlist(); // Masih di-comment agar dummy data muncul untuk testing
  }, []);

// export const WishlistProvider = ({ children }) => {
//   // 1. Ubah state awal menjadi array kosong []
//   const [wishlist, setWishlist] = useState([]); 

//   useEffect(() => {
//     // 2. Hilangkan tanda komentar (//) agar aplikasi memuat data dari memori HP
//     loadWishlist(); 
//   }, []);

  const loadWishlist = async () => {
    try {
      const stored = await AsyncStorage.getItem('@wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const saveWishlist = async (newData) => {
    setWishlist(newData);
    try {
      await AsyncStorage.setItem('@wishlist', JSON.stringify(newData));
    } catch (e) { console.error(e); }
  };

  const toggleWishlist = (movie) => {
    const exists = wishlist.find(item => item.id === movie.id);
    if (exists) {
      saveWishlist(wishlist.filter(item => item.id !== movie.id));
    } else {
      saveWishlist([...wishlist, { ...movie, rating: 0, review: '', status: 'To Watch', reviewDate: '' }]);
    }
  };

  const addReview = (id, rating, review) => {
    // Menangkap tanggal saat ulasan dikirim
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    const newData = wishlist.map(item => {
      if (item.id === id) {
        return { ...item, rating, review, status: 'Reviewed', reviewDate: currentDate };
      }
      return item;
    });
    saveWishlist(newData);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, addReview }}>
      {children}
    </WishlistContext.Provider>
  );
};