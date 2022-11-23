import { supaBaseclient } from "../utilities/supabaseClient";

export const deleteComment = async (commentId: number) => {
  await supaBaseclient.from("comments").delete().eq("id", commentId);
};
