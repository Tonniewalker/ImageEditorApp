import React from "react";
import { SafeAreaView } from "react-native";
import ImageEditor from "./components/ImageEditor";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageEditor />
    </SafeAreaView>
  );
}
