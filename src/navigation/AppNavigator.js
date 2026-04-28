import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import ProfileScreen from "../screens/ProfileScreen"; // IMPORT PROFILE SCREEN
import ReviewScreen from "../screens/ReviewScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WishlistScreen from "../screens/WishlistScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const COLORS = {
  bg: "#0B0F19",
  red: "#B7121A",
  gold: "#E5A93C",
  grey: "#A0A0A0",
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopWidth: 0,
          height: 65,
        },
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: 10,
          marginBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark" size={24} color={color} />
          ),
          tabBarLabel: "Wishlist",
        }}
      />
      {/* TAB PROFILE BARU */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          tabBarLabel: "Profile",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
