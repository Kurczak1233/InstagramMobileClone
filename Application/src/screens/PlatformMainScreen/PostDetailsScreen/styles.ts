import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    padding: theme.spacing.lg,
    minHeight: 300,
    flex: 1,
  },
  imageContainer: {
    padding: theme.spacing.sm,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  saveAreaContainer: {
    flex: 1,
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
});
