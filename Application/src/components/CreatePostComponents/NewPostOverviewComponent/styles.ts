import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 12,
  },
  imageWrapper: {
    minHeight: 300,
  },
  image: {
    padding: theme.spacing.lg,
    minHeight: 300,
    flex: 1,
    borderRadius: 20,
  },
  container: {
    padding: theme.spacing.sm,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
});
