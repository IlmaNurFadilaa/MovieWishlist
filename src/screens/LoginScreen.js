import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const COLORS = {
  bg: "#0B0F19",
  red: "#B7121A",
  gold: "#E5A93C",
  grey: "#A0A0A0",
};

export default function LoginScreen({ navigation }) {
  // State untuk melacak input mana yang sedang fokus
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoCircle} />

      <View style={styles.inputGroup}>
        <TextInput
          style={[
            styles.input,
            focusedInput === "email" && styles.inputActive, // Berubah jika email fokus
          ]}
          placeholder="Email"
          placeholderTextColor={COLORS.grey}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
        />
        <TextInput
          style={[
            styles.input,
            focusedInput === "pass" && styles.inputActive, // Berubah jika pass fokus
          ]}
          placeholder="Password"
          placeholderTextColor={COLORS.grey}
          secureTextEntry
          onFocus={() => setFocusedInput("pass")}
          onBlur={() => setFocusedInput(null)}
        />

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Main")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>
          Haven't account? <Text style={{ color: COLORS.gold }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="google" size={24} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.grey,
    marginBottom: 50,
  },
  inputGroup: { width: "100%", marginBottom: 20 },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(160, 160, 160, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 20,
    color: "white",
    marginBottom: 15,
    fontFamily: "Poppins_400Regular",
    borderWidth: 1,
    borderColor: "rgba(160, 160, 160, 0.3)",
  },
  // Gaya saat Input Aktif
  inputActive: {
    borderColor: COLORS.gold,
    backgroundColor: "rgba(229, 169, 60, 0.05)",
  },
  forgotBtn: { alignSelf: "flex-start", marginBottom: 35 },
  forgotText: {
    color: COLORS.gold,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.red,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "white", fontSize: 16, fontFamily: "Poppins_700Bold" },
  linkText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 40,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  line: { flex: 1, height: 1, backgroundColor: COLORS.grey, opacity: 0.2 },
  orText: {
    color: COLORS.grey,
    marginHorizontal: 15,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  socialContainer: { flexDirection: "row", gap: 20 },
  socialBtn: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "rgba(160, 160, 160, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(160, 160, 160, 0.2)",
  },
});
