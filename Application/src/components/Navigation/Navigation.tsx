import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { appStateContext } from "../../contexts/AppStateContextProvider";
import { CreatePostScreen } from "../../screens/CreatePostScreen/CreatePostScreen";
import { IntroductionScreen } from "../../screens/IntroductionScreen/IntroductionScreen";
import { LoginScreen } from "../../screens/LoginScreen/LoginScreen";
import { MyTimeLine } from "../../screens/MyTimeLine/MyTimeLine";
import { PostDetailsScreen } from "../../screens/PlatformMainScreen/PostDetailsScreen/PostDetailsScreen";
import { PlatformMainScreen } from "../../screens/PlatformMainScreen/PostsScreen/PlatformMainScreen";
import { RegisterScreen } from "../../screens/RegisterScreen/RegisterScreen";
import { SearchPostScreen } from "../../screens/SearchPostScreen/SearchPostScreen";
import { getItem } from "../../utilities/storage";
import { RootStackParamList } from "./RootStackParamList";
import { PlatformMainParamList } from "./platformMainParamList";
import { StackTabsParamList } from "./stackTabsParamsList";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<StackTabsParamList>();
const PlatformMainStack = createNativeStackNavigator<PlatformMainParamList>();

function HomeStackScreen() {
  return (
    <PlatformMainStack.Navigator
      initialRouteName="Posts"
      screenOptions={{ headerShown: false }}
    >
      <PlatformMainStack.Screen name="Posts" component={PlatformMainScreen} />
      <PlatformMainStack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
      />
    </PlatformMainStack.Navigator>
  );
}

const MainTabs = () => (
  <Tabs.Navigator
    initialRouteName="PlatformMain"
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
    }}
  >
    <Tabs.Screen
      name="PlatformMain"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Main",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="SearchPosts"
      component={SearchPostScreen}
      options={{
        tabBarLabel: "Search post",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-search" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{
        tabBarLabel: "Create post",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="post-add" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="MyTimeLine"
      component={MyTimeLine}
      options={{
        tabBarLabel: "My timeline",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user-circle-o" size={size} color={color} />
        ),
      }}
    />
  </Tabs.Navigator>
);
export const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const settingLoggedInToTrue = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener("change", async () => {
      const expiresIn = await getItem("tokenExpiresIn");
      if ((expiresIn && new Date().getTime() > +expiresIn) || !expiresIn) {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => {
      appStateListener?.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <appStateContext.Provider
      value={{ setIsLoggedInMethod: settingLoggedInToTrue }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            {!isLoggedIn ? (
              <>
                <Stack.Screen
                  name="Introduction"
                  component={IntroductionScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            ) : (
              <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </appStateContext.Provider>
  );
};
