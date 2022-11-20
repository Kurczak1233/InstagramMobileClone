import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { CreatePostScreen } from "../../screens/CreatePostScreen/CreatePostScreen";
import { IntroductionScreen } from "../../screens/IntroductionScreen/IntroductionScreen";
import { LoginScreen } from "../../screens/LoginScreen/LoginScreen";
import { MyTimeLine } from "../../screens/MyTimeLine/MyTimeLine";
import { PostDetailsScreen } from "../../screens/PlatformMainScreen/PostDetailsScreen/PostDetailsScreen";
import { PlatformMainScreen } from "../../screens/PlatformMainScreen/PostsScreen/PlatformMainScreen";
import { RegisterScreen } from "../../screens/RegisterScreen/RegisterScreen";
import { SearchPostScreen } from "../../screens/SearchPostScreen/SearchPostScreen";
import { RootStackParamList } from "./RootStackParamList";
import { PlatformMainParamList } from "./platformMainParamList";
import { StackTabsParamList } from "./stackTabsParamsList";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<StackTabsParamList>();
const PlatformMainStack = createNativeStackNavigator<PlatformMainParamList>();

function HomeStackScreen() {
  return (
    <PlatformMainStack.Navigator initialRouteName="Posts">
      <PlatformMainStack.Screen name="Posts" component={PlatformMainScreen} />
      <PlatformMainStack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
      />
    </PlatformMainStack.Navigator>
  );
}

const MainTabs = () => (
  <Tabs.Navigator initialRouteName="PlatformMain">
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
        tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />,
      }}
    />
    <Tabs.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{
        tabBarLabel: "Create post",
        tabBarIcon: () => (
          <MaterialIcons name="post-add" size={24} color="black" />
        ),
      }}
    />
    <Tabs.Screen
      name="MyTimeLine"
      component={MyTimeLine}
      options={{
        tabBarLabel: "My timeline",
        tabBarIcon: () => (
          <FontAwesome name="user-circle-o" size={24} color="black" />
        ),
      }}
    />
  </Tabs.Navigator>
);
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
