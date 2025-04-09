import React, { useState, useEffect } from "react";
import { View, Image, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";

export default function ImageEditor() {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setRotation(0);
    }
  };

  const rotateImage = async (direction = "right") => {
    if (!image) return;

    const rotateDegree = direction === "left" ? -90 : 90;
    const nextRotation = (rotation + rotateDegree + 360) % 360;

    const manipResult = await ImageManipulator.manipulateAsync(
      image,
      [
        { rotate: rotateDegree },
        { resize: { width: 300 } },
      ],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    setImage(manipResult.uri);
    setRotation(nextRotation);
  };

  const applyFilter = async () => {
    Alert.alert("ฟิลเตอร์", "ทำไม่ได้");
  };

  const saveImage = async () => {
    if (!image || !hasMediaPermission) {
      Alert.alert("ไม่สามารถบันทึกได้", "ต้องขอสิทธิ์เข้าถึงคลังภาพก่อน");
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert("สำเร็จ", "บันทึกรูปภาพเรียบร้อยแล้ว!");
    } catch (error) {
      Alert.alert("ผิดพลาด", "ไม่สามารถบันทึกภาพได้");
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonSpacing}>
        <Button title="เลือกรูปภาพ" onPress={pickImage} />
      </View>

      <View style={[styles.row, styles.buttonSpacing]}>
        <View style={styles.buttonInRow}>
          <Button title="หมุนซ้าย 90°" onPress={() => rotateImage("left")} disabled={!image} />
        </View>
        <View style={styles.buttonInRow}>
          <Button title="หมุนขวา 90°" onPress={() => rotateImage("right")} disabled={!image} />
        </View>
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="ใส่ฟิลเตอร์ไม่ได้" onPress={applyFilter} disabled={!image} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="บันทึกรูปภาพ" onPress={saveImage} disabled={!image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  buttonSpacing: {
    marginBottom: 10,
    width: 250,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonInRow: {
    flex: 1,
    marginHorizontal: 5,
  },
});
