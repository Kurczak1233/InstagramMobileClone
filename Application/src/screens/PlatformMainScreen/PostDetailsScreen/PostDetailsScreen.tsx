import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { View, Image, Text } from "react-native";

import { supaBaseclient } from "../../../utilities/supabaseClient";
import { styles } from "./styles";

type PostDetailsScreenRouteParams = {
  id: number;
};

export const PostDetailsScreen = () => {
  const route =
    useRoute<RouteProp<Record<string, PostDetailsScreenRouteParams>, string>>();
  const { id } = route.params;

  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ["postData"],
    queryFn: async () => {
      const response = await supaBaseclient
        .from("posts")
        .select(
          "id, created_at, description, creator_uuid, image_url, comments ( body, creator_uuid, id )"
        )
        .eq("id", id)
        .is("archived_at", null)
        .single();
      return response.data;
    },
  });

  console.log(post);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: post?.image_url,
        }}
      />
      {/* <View>
        <View>
          <Text>Image</Text>
          <Text>Somebody</Text>
        </View>
        <View>
          <Text>Image</Text>
          <Text>{post?.description}</Text>
        </View>
      </View> */}
    </View>
  );
};
