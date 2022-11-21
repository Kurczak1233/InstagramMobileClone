import { supaBaseclient } from "../utilities/supabaseClient";

export const getPostsData = async () => {
  const response = await supaBaseclient
    .from("posts")
    .select("*")
    .is("archived_at", null);
  return response.data;
};
