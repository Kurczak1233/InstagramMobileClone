import { StyleSheet } from "react-native";

import theme from "../../theme/theme";

export const styles = StyleSheet.create({
  textInput: {
    minHeight: 50,
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
  smallPadding: {
    padding: theme.spacing.sm,
  },
  imagesWrapper: {
    padding: theme.spacing.sm,
    flex: 1,
  },
  imageContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  smallImage: {
    height: 100,
    width: "100%",
  },
  listContainer: {
    paddingVertical: 20,
  },
});
