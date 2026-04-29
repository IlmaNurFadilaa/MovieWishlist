import { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export const SettingsContext = createContext();

// KAMUS LENGKAP (JANGAN ADA YANG TERLEWAT)
const translations = {
  "English (US)": {
    home: "Home", wishlist: "Wishlist", profile: "Profile", settings: "Settings",
    trending: "Trending", popular: "Popular", search: "Search Movie",
    appearance: "Appearance", theme: "Theme", language: "Language",
    apply: "Apply", cancel: "Cancel", choose_theme: "Choose Theme", select_lang: "Select Language",
    saved: "Saved", to_watch: "To Watch", reviewed: "Reviewed", edit_profile: "Edit Profile",
    view_stats: "Viewing Statistics", logout: "Log Out", notifications: "Notifications",
    no_notif: "No new notifications", rate_this: "Rate this movie!", rate_desc: "What did you think about this movie?",
    total_movies: "Total Movies", reviews_given: "Reviews Given", avg_rating: "Avg. Rating", hours: "Hours Watched",
    details: "Details", overview: "Overview", cast: "Cast", add_wishlist: "Add to Wishlist",
    remove_wishlist: "Remove from Wishlist", write_review: "Write a Review", reviewed_on: "Reviewed on",
    login: "Login", signup: "Sign Up", email: "Email", password: "Password", forgot: "Forgot password?",
    no_account: "Haven't account?", have_account: "Have an account?", or_continue: "or continue with",
    name_label: "Name", username_label: "Username", done: "Done", change_photo: "Change Profile Photo",
    account: "Account", privacy: "Privacy Policy", about: "About App"
  },
  "Bahasa Indonesia": {
    home: "Beranda", wishlist: "Simpanan", profile: "Profil", settings: "Pengaturan",
    trending: "Sedang Tren", popular: "Populer", search: "Cari Film",
    appearance: "Tampilan", theme: "Tema", language: "Bahasa",
    apply: "Terapkan", cancel: "Batal", choose_theme: "Pilih Tema", select_lang: "Pilih Bahasa",
    saved: "Disimpan", to_watch: "Akan Ditonton", reviewed: "Diulas", edit_profile: "Edit Profil",
    view_stats: "Statistik Nonton", logout: "Keluar", notifications: "Notifikasi",
    no_notif: "Tidak ada notifikasi baru", rate_this: "Beri rating film ini!", rate_desc: "Apa pendapatmu tentang film ini?",
    total_movies: "Total Film", reviews_given: "Ulasan Diberikan", avg_rating: "Rata-rata Rating", hours: "Jam Menonton",
    details: "Detail", overview: "Sinopsis", cast: "Pemeran", add_wishlist: "Tambah ke Wishlist",
    remove_wishlist: "Hapus dari Wishlist", write_review: "Tulis Ulasan", reviewed_on: "Diulas pada",
    login: "Masuk", signup: "Daftar", email: "Email", password: "Kata Sandi", forgot: "Lupa kata sandi?",
    no_account: "Belum punya akun?", have_account: "Sudah punya akun?", or_continue: "atau lanjut dengan",
    name_label: "Nama", username_label: "Username", done: "Selesai", change_photo: "Ganti Foto Profil",
    account: "Akun", privacy: "Kebijakan Privasi", about: "Tentang Aplikasi"
  }
};

export const SettingsProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("English (US)");

  const getActiveTheme = () => (theme === "System Default" ? deviceTheme : theme.toLowerCase());
  const activeTheme = getActiveTheme();

  const getColors = () => {
    const isLight = activeTheme === "light";
    return {
      bg: isLight ? "#FFFFFF" : "#0B0F19",
      text: isLight ? "#000000" : "#FFFFFF",
      card: isLight ? "#F8F9FA" : "#121826", 
      border: isLight ? "#E0E0E0" : "rgba(160,160,160,0.1)",
      grey: isLight ? "#6C757D" : "#A0A0A0",
      gold: "#E5A93C", red: "#B7121A",
      overlay: isLight ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.7)"
    };
  };

  return (
    <SettingsContext.Provider value={{ 
      theme, 
      setTheme, 
      language, 
      setLanguage, 
      activeTheme, 
      colors: getColors(), 
      t: translations[language] || translations["English (US)"] 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};