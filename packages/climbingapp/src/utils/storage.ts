import AsyncStorage from '@react-native-async-storage/async-storage';
import { isJsonString } from './isJsonString';

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (isJsonString(value)) {
        return JSON.parse(value);
      } else {
        return value;
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
