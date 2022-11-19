import SecureStore from "expo-secure-store";

export const saveSecuredItem = async (key: string, value: any) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("Setting secure item went wrong", error);
  }
};

export async function getValueFor(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Setting secure item went wrong", error);
  }
}
