import { CameraCapturedPicture } from "expo-camera";

import { ICreatePost } from "../screens/CreatePostScreen/CreatePostScreen";
import { supaBaseclient } from "../utilities/supabaseClient";

export const createPost = async (
  image: CameraCapturedPicture | undefined,
  data: ICreatePost
) => {
  await supaBaseclient
    .from("posts")
    .insert({
      description: data.title,
      image_url: image?.uri,
    })
    .limit(1)
    .single();
};
