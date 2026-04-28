import { FontAwesome } from "@expo/vector-icons";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Palet warna pilihanmu
const COLORS = {
  bg: "#0B0F19",
  red: "#B7121A",
  gold: "#E5A93C",
  grey: "#A0A0A0",
};

export default function SignUpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoCircle} />

      <TextInput
        style={styles.input}
        placeholder="Nama"
        placeholderTextColor={COLORS.grey}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.grey}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.grey}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Main")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Have an account? <Text style={{ color: COLORS.gold }}>Log In</Text>
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
    padding: 25,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.grey,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(160, 160, 160, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 20,
    color: "white",
    marginBottom: 15,
    fontFamily: "Poppins_400Regular",
    borderWidth: 0.5,
    borderColor: COLORS.grey,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.red,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
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
  },
  line: { flex: 1, height: 1, backgroundColor: COLORS.grey, opacity: 0.3 },
  orText: {
    color: COLORS.grey,
    marginHorizontal: 15,
    fontFamily: "Poppins_400Regular",
  },
  socialContainer: { flexDirection: "row", gap: 25 },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(160, 160, 160, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.grey,
  },
});
