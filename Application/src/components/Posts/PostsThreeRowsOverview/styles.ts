import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  imagesWrapper: {
    padding: theme.spacing.sm,
    flex: 1,
  },
  imageContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1 / 3,
  },
  smallImage: {
    height: 100,
    width: "100%",
    maxWidth: 100,
  },
  listContainer: {
    paddingVertical: 20,
  },
});
