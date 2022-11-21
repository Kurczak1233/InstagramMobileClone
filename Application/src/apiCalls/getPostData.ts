import { supaBaseclient } from "../utilities/supabaseClient";

export const getPostData = async (itemId: number) => {
  const response = await supaBaseclient
    .from("posts")
    .select(
      "id, created_at, description, creator_uuid, image_url, comments ( body, creator_uuid, id )"
    )
    .eq("id", itemId)
    .is("archived_at", null)
    .single();
  return response.data;
};
