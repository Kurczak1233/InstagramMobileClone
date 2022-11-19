import * as SecureStore from "expo-secure-store";

export const saveSecuredItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
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
