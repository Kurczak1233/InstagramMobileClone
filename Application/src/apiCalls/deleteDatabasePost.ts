import { supaBaseclient } from "../utilities/supabaseClient";

export const deleteDatabasePost = async (postId: number) => {
  const response = await supaBaseclient
    .from("posts")
    .update({
      archived_at: new Date().toISOString(),
    })
    .eq("id", postId);
  return response.data;
};
