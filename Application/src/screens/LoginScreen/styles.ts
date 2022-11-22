import { StyleSheet } from "react-native";

import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  inner: {
    justifyContent: "center",
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
  buttons: {
    paddingVertical: theme.spacing.sm,
    marginBottom: 50,
    paddingBottom: 50,
  },
  loginButton: {
    marginBottom: theme.spacing.sm,
  },
});
