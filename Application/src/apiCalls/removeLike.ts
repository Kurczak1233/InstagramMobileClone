import { supaBaseclient } from "../utilities/supabaseClient";

export const removeLike = async (likeId: number) => {
  await supaBaseclient.from("likes").delete().eq("id", likeId);
};
