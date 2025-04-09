import React, { useState, useEffect } from "react";
import { View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import { rotateImage, applyFilter, saveImage, flipImage } from "../../utils/imageUtils";
import { requestMediaPermission } from "../../utils/permissions";

export default function ImageEditor() {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const granted = await requestMediaPermission();
      setHasMediaPermission(granted);
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

  const handleRotate = async (direction) => {
    if (!image) return;
    const newUri = await rotateImage(image, direction);
    setImage(newUri);
    const degree = direction === "left" ? -90 : 90;
    setRotation((rotation + degree + 360) % 360);
  };

  const handleFlip = async (direction) => {
    if (!image) return;
    const newUri = await flipImage(image, direction);
    setImage(newUri);
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonSpacing}>
        <Button title="เลือกรูปภาพ" onPress={pickImage} />
      </View>

      <View style={[styles.row, styles.buttonSpacing]}>
        <View style={styles.buttonInRow}>
          <Button title="หมุนซ้าย 90°" onPress={() => handleRotate("left")} disabled={!image} />
        </View>
        <View style={styles.buttonInRow}>
          <Button title="หมุนขวา 90°" onPress={() => handleRotate("right")} disabled={!image} />
        </View>
      </View>

      <View style={[styles.row, styles.buttonSpacing]}>
        <View style={styles.buttonInRow}>
          <Button title="Flip ซ้ายขวา" onPress={() => handleFlip("horizontal")} disabled={!image} />
      </View>
        <View style={styles.buttonInRow}>
          <Button title="Flip บนล่าง" onPress={() => handleFlip("vertical")} disabled={!image} />
        </View>
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="ใส่ฟิลเตอร์ไม่ได้" onPress={applyFilter} disabled={!image} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="บันทึกรูปภาพ" onPress={() => saveImage(image, hasMediaPermission)} disabled={!image} />
      </View>
    </View>
  );
}
