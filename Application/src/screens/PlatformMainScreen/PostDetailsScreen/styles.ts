import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    padding: theme.spacing.lg,
    height: 5,
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
});
