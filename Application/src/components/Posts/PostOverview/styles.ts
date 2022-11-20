import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    padding: theme.spacing.lg,
    height: 300,
    flex: 1,
  },
  imageContainer: {
    paddingHorizontal: theme.spacing.sm,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    margin: theme.spacing.sm,
  },
});
