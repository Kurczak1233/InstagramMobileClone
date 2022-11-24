import { StyleSheet } from "react-native";

import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  imageBackground: {
    height: 250,
    width: 200,
    position: "absolute",
    right: 100,
    bottom: 0,
    zIndex: 10,
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: "white",
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
  pawImage: {
    width: 200,
    height: 330,
    position: "absolute",
    right: 80,
    bottom: -140,
    zIndex: 20,
  },
});
