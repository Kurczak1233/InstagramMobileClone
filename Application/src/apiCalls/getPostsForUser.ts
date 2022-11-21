import { supaBaseclient } from "../utilities/supabaseClient";

export const getPostsForUser = async (userId: string) => {
  const response = await supaBaseclient
    .from("posts")
    .select("*")
    .eq("creator_uuid", userId)
    .is("archived_at", null);
  return response.data;
};
