import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = { bg: "#0B0F19", red: "#B7121A", gold: "#E5A93C", grey: "#A0A0A0" };

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("Ilma Fadila");
  const [username, setUsername] = useState("ilmafadila");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageSection}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={COLORS.grey} />
        
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholderTextColor={COLORS.grey} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 25 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  title: { color: "white", fontSize: 20, fontFamily: "Poppins_700Bold" },
  saveText: { color: COLORS.gold, fontFamily: "Poppins_700Bold", fontSize: 16 },
  imageSection: { alignItems: 'center', marginVertical: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changeBtn: { marginTop: 15 },
  changeBtnText: { color: COLORS.gold, fontFamily: "Poppins_600SemiBold" },
  inputGroup: { marginTop: 10 },
  label: { color: COLORS.grey, fontSize: 12, fontFamily: "Poppins_400Regular", marginBottom: 5, marginLeft: 5 },
  input: { backgroundColor: 'rgba(160,160,160,0.05)', borderRadius: 12, padding: 15, color: 'white', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(160,160,160,0.2)' }
});