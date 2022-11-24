import { StyleSheet } from "react-native";

import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarWrapper: {
    paddingTop: theme.spacing.lg,
    alignItems: "center",
  },
  myName: {
    padding: theme.spacing.sm,
  },
  post: {
    flex: 1,
  },
  toggleWrapper: {
    paddingHorizontal: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
