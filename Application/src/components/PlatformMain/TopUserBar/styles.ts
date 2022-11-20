import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.sm,
    flex: 1,
    minHeight: 45,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "space-around",
  },
});
