import { StyleSheet } from "react-native";

import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    width: 200,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  welcomeContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 30,
  },
  introductionButton: {
    marginTop: theme.spacing.sm,
  },
});
