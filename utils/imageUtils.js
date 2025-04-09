import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const rotateImage = async (uri, direction = 'right') => {
  const rotateDegree = direction === 'left' ? -90 : 90;

  const result = await ImageManipulator.manipulateAsync(
    uri,
    [
      { rotate: rotateDegree },
      { resize: { width: 300 } },
    ],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  return result.uri;
};

export const applyFilter = async () => {
  Alert.alert('ฟิลเตอร์', 'ทำไม่ได้');
};

export const saveImage = async (uri, hasPermission) => {
  if (!uri || !hasPermission) {
    Alert.alert("ไม่สามารถบันทึกได้", "ต้องขอสิทธิ์เข้าถึงคลังภาพก่อน");
    return;
  }

  try {
    await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert("สำเร็จ", "บันทึกรูปภาพเรียบร้อยแล้ว!");
  } catch (error) {
    Alert.alert("ผิดพลาด", "ไม่สามารถบันทึกภาพได้");
  }
};