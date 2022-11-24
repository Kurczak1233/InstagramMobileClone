import { NavigatorScreenParams } from "@react-navigation/native";

import { PlatformMainParamList } from "./platformMainParamList";

export type StackTabsParamList = {
  PlatformMain: NavigatorScreenParams<PlatformMainParamList>;
  SearchPosts: undefined;
  CreatePost: undefined;
  MyTimeLine: { userId: string };
};
