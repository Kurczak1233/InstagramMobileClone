import { supaBaseclient } from "../utilities/supabaseClient";

export const giveLike = async (postId: number) => {
  const response = await supaBaseclient
    .from("likes")
    .insert({
      post_id: postId,
    })
    .limit(1)
    .single();

  return response.data;
};
