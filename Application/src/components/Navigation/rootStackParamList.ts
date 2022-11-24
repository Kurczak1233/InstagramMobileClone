import type { NavigatorScreenParams } from "@react-navigation/native";

import { StackTabsParamList } from "./stackTabsParamsList";

export type RootStackParamList = {
  Introduction: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: NavigatorScreenParams<StackTabsParamList>;
};
