import { Avatar } from "@react-native-material/core";
import { useQuery } from "@tanstack/react-query";
import { View, Text } from "react-native";

import { supaBaseclient } from "../../utilities/supabaseClient";

type IUserAvatar = {
  userId: string;
  imageSize: "small" | "large";
};

export const UserAvatar = ({ userId, imageSize }: IUserAvatar) => {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["postData"],
    queryFn: async () => {
      const response = await supaBaseclient
        .from("users")
        .select()
        .eq("uuid", userId)
        .single();
      return response.data;
    },
  });

  console.log(user);

  return (
    <View>
      <Avatar size={imageSize === "large" ? 100 : 50} label={"Somebody"} />
      <Text>Somebody</Text>
    </View>
  );
};
