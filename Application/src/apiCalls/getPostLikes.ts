import { supaBaseclient } from "../utilities/supabaseClient";

export const getPostLikes = async (postId: number) => {
  const response = await supaBaseclient
    .from("likes")
    .select("*", { count: "exact" })
    .eq("post_id", postId);
  return response.data;
};
