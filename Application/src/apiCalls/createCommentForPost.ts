import { supaBaseclient } from "../utilities/supabaseClient";

export const createCommentForPost = async (
  description: string,
  postId: number
) => {
  await supaBaseclient
    .from("comments")
    .insert({
      body: description,
      post_id: postId,
    })
    .limit(1)
    .single();
};
