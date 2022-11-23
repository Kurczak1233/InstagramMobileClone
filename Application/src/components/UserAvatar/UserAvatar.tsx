import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../apiCalls/getCurrentUser";
import { UserAvatarTemplate } from "./UserAvatarTemplate";

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
    queryKey: ["userAvatar", userId],
    queryFn: ({ queryKey }) => getCurrentUser(queryKey[1]),
  });

  return (
    <UserAvatarTemplate
      imageSize={imageSize}
      showUserName={showUserName}
      imageUrl={imageUrl}
    />
  );
};
