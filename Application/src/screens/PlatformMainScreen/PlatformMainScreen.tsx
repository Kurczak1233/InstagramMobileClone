import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { View, FlatList, Text } from "react-native";

import { RootStackParamList } from "../../components/Navigation/RootStackParamList";
import { TopUserBar } from "../../components/PlatformMain";
import { PostOverview } from "../../components/Posts/PostOverview/PostOverview";
import { supaBaseclient } from "../../utilities/supabaseClient";
import { styles } from "./styles";

export const PlatformMainScreen = () => {
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: async () => {
      const response = await supaBaseclient
        .from("posts")
        .select("*")
        .is("archived_at", null);
      return response.data;
    },
  });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const createPost = useCallback(async () => {
    // const response = await supaBaseclient
    //   .from("posts")
    //   .insert({
    //     description: "test description 2",
    //     image_url:
    //       "https://cdn3s.com/wp-content/uploads/2022/03/This-Expressive-Disabled-Cat-Is-Here-To-Spread-Positivity-In-Our-World-Today01.jpg",
    //   })
    //   .limit(1)
    //   .single();
    // console.log(response);
  }, []);

  useEffect(() => {
    createPost();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <TopUserBar />
      <View style={styles.post}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostOverview
              description={item.description}
              imageUrl={item.image_url}
            />
          )}
        />
      </View>
    </View>
  );
};
