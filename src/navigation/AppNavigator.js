import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext"; // IMPORT CONTEXT

import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReviewScreen from "../screens/ReviewScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignUpScreen from "../screens/SignUpScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import WishlistScreen from "../screens/WishlistScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colors, t } = useContext(SettingsContext); // AMBIL DATA DARI CONTEXT

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card, // WARNA DINAMIS
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          elevation: 0,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.grey,
        tabBarLabelStyle: {
          fontFamily: "Poppins_600SemiBold",
          fontSize: 10,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
          tabBarLabel: t.home, // BAHASA DINAMIS
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bookmark" : "bookmark-outline"} size={24} color={color} />
          ),
          tabBarLabel: t.wishlist, // BAHASA DINAMIS
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
          ),
          tabBarLabel: t.profile, // BAHASA DINAMIS
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator({ onReady }) {
  return (
    <NavigationContainer onReady={onReady}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}