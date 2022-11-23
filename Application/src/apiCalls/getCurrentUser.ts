import { supaBaseclient } from "../utilities/supabaseClient";

export const getCurrentUser = async (userId: string | undefined) => {
  if (userId) {
    const response = await supaBaseclient
      .from("users")
      .select()
      .eq("uuid", userId)
      .single();

    if (response.data) {
      return response.data;
    }
    return null;
  }
};
