import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    padding: theme.spacing.lg,
    height: 300,
    flex: 1,
  },
  imageContainer: {
    padding: theme.spacing.sm,
  },
  commentsWrapper: {
    paddingHorizontal: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    color: theme.colors.primary,
    maxWidth: "80%",
  },
  commentTextWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
