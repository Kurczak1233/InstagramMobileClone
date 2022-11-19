import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key: string) => {
  try {
    const storeData = await AsyncStorage.getItem(key);
    return storeData;
  } catch (error) {
    console.log("Getting item went wrong", error);
  }
};

export const setItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log("Setting item went wrong", error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
