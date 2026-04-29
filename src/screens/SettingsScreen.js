import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsContext } from "../context/SettingsContext";

export default function SettingsScreen({ navigation }) {
  // AMBIL DATA GLOBAL (colors dan t)
  const { theme, setTheme, language, setLanguage, colors, t } = useContext(SettingsContext);

  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);

  const [tempTheme, setTempTheme] = useState(theme);
  const [tempLang, setTempLang] = useState(language);

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t.settings}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.appearance}</Text>
        <SettingItem label={t.theme} value={theme} onPress={() => { setTempTheme(theme); setThemeModalVisible(true); }} colors={colors} />
        <SettingItem label={t.language} value={language} onPress={() => { setTempLang(language); setLangModalVisible(true); }} colors={colors} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.account}</Text>
        <SettingItem label={t.privacy} onPress={() => {}} colors={colors} />
        <SettingItem label={t.about} value="v1.0.0" onPress={() => {}} colors={colors} />
      </View>

      {/* MODAL TEMA */}
      <Modal transparent visible={themeModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.choose_theme}</Text>
            {["Light", "Dark", "System Default"].map((item) => (
              <TouchableOpacity key={item} style={styles.modalOption} onPress={() => setTempTheme(item)}>
                <Text style={[styles.modalOptionText, tempTheme === item && { color: colors.gold }]}>{item}</Text>
                {tempTheme === item && <Ionicons name="checkmark-circle" size={20} color={colors.gold} />}
              </TouchableOpacity>
            ))}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setThemeModalVisible(false)}>
                <Text style={styles.cancelText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => { setTheme(tempTheme); setThemeModalVisible(false); }}>
                <Text style={styles.applyText}>{t.apply}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL BAHASA */}
      <Modal transparent visible={langModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.select_lang}</Text>
            {["English (US)", "Bahasa Indonesia"].map((item) => (
              <TouchableOpacity key={item} style={styles.modalOption} onPress={() => setTempLang(item)}>
                <Text style={[styles.modalOptionText, tempLang === item && { color: colors.gold }]}>{item}</Text>
                {tempLang === item && <Ionicons name="checkmark-circle" size={20} color={colors.gold} />}
              </TouchableOpacity>
            ))}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setLangModalVisible(false)}>
                <Text style={styles.cancelText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => { setLanguage(tempLang); setLangModalVisible(false); }}>
                <Text style={styles.applyText}>{t.apply}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const SettingItem = ({ label, value, onPress, colors }) => (
  <TouchableOpacity style={[stylesBase.item, { borderBottomColor: colors.border }]} onPress={onPress}>
    <Text style={[stylesBase.itemText, { color: colors.text }]}>{label}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {value && <Text style={{ color: colors.grey, marginRight: 10, fontSize: 13 }}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={colors.grey} />
    </View>
  </TouchableOpacity>
);

const stylesBase = StyleSheet.create({
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5 },
  itemText: { fontFamily: "Poppins_400Regular", fontSize: 15 },
});

const getStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 25 },
  header: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 15 },
  title: { color: colors.text, fontSize: 22, fontFamily: "Poppins_700Bold" },
  section: { marginTop: 30 },
  sectionTitle: { color: colors.gold, fontSize: 14, fontFamily: "Poppins_700Bold", marginBottom: 10, textTransform: 'uppercase' },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: colors.card, borderRadius: 20, padding: 25, borderWidth: 1, borderColor: colors.border },
  modalTitle: { color: colors.text, fontSize: 18, fontFamily: "Poppins_700Bold", marginBottom: 15 },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  modalOptionText: { color: colors.text, fontSize: 15, fontFamily: "Poppins_400Regular" },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 25, gap: 20 },
  cancelText: { color: colors.grey, fontFamily: "Poppins_600SemiBold" },
  applyBtn: { backgroundColor: colors.gold, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  applyText: { color: colors.bg, fontFamily: "Poppins_700Bold" },
});