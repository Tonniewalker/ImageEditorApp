import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    padding: 25,
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 10,
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
    marginHorizontal: 2,
  },
});

export default styles;
