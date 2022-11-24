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
    borderRadius: 10,
    borderWidth: 1,
    margin: theme.spacing.sm,
  },
  description: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
