import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    padding: theme.spacing.lg,
    flex: 1,
    minHeight: 250,
  },
  imageContainer: {
    padding: theme.spacing.sm,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  saveAreaContainer: {
    flex: 1,
  },
  textInput: {
    minHeight: 50,
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
});
