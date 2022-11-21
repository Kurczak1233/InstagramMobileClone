import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingVertical: 20,
  },
  imagesWrapper: {
    padding: theme.spacing.sm,
    flex: 1,
  },
  imageContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  smallImage: {
    height: 100,
    width: "100%",
  },
});
