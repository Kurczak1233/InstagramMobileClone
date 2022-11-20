import { Avatar } from "@react-native-material/core";
import { useQuery } from "@tanstack/react-query";
import { View, Text } from "react-native";

import { supaBaseclient } from "../../utilities/supabaseClient";

type IUserAvatar = {
  userId?: string;
  showUserName?: boolean;
  imageUrl?: string;
  imageSize: "tiny" | "small" | "large";
};

export const UserAvatar = ({
  userId,
  imageSize,
  imageUrl,
  showUserName = true,
}: IUserAvatar) => {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["userAvatar"],
    queryFn: async () => {
      const response = await supaBaseclient
        .from("users")
        .select()
        .eq("uuid", userId)
        .single();
      return response.data;
    },
  });

  return (
    <View style={{ minHeight: imageSize === "large" ? 100 : 50 }}>
      <Avatar
        size={imageSize === "large" ? 100 : 50}
        image={{ uri: imageUrl }}
        label={showUserName ? "Somebody" : ""}
      />
      {showUserName && <Text>Somebody</Text>}
    </View>
  );
};
