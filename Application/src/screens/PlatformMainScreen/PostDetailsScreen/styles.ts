import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

export const styles = StyleSheet.create({
  image: {
    padding: theme.spacing.lg,
    height: 250,
  },
  imageContainer: {
    padding: theme.spacing.sm,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    minHeight: 50,
    padding: 12,
    borderRadius: 8,
    borderColor: "#000ede",
    borderWidth: 1,
    marginBottom: 12,
  },
  likesAndAvatarsContainer: {
    paddingVertical: theme.spacing.sm,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  likesAndDescription: {
    marginLeft: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    marginLeft: theme.spacing.sm,
  },
  imageDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
