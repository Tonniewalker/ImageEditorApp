import * as MediaLibrary from 'expo-media-library';

export const requestMediaPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
};