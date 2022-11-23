import { ICreatePost } from "../screens/CreatePostScreen/CreatePostScreen";
import { supaBaseclient } from "../utilities/supabaseClient";

export const createPost = async (imageUrl: string, data: ICreatePost) => {
  await supaBaseclient
    .from("posts")
    .insert({
      description: data.title,
      image_url: imageUrl,
    })
    .limit(1)
    .single();
};
