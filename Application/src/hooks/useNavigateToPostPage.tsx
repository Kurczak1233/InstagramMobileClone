import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PlatformMainParamList } from "../components/Navigation/platformMainParamList";

const useNavigateToPostPage = () => {
  const navigation =
    useNavigation<StackNavigationProp<PlatformMainParamList>>();
  const navigateToPostPage = (postId: number) => {
    console.log(postId);
    navigation.navigate("PostDetails", { id: postId });
  };

  return { navigateToPostPage };
};

export default useNavigateToPostPage;
