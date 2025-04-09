import { StyleSheet } from "react-native";

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

export default styles;
