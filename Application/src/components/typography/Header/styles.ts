import { StyleSheet } from "react-native";

import theme from "../../../theme/theme";

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.body,
  },
  header: {
    fontSize: theme.fontSizes.bodyLarge,
    fontWeight: "700",
  },
  h1: {
    fontSize: theme.fontSizes.h1,
  },
  h2: {
    fontSize: theme.fontSizes.h2,
  },
  h3: {
    fontSize: theme.fontSizes.h3,
  },
  h4: {
    fontSize: theme.fontSizes.h4,
  },
  h5: {
    fontSize: theme.fontSizes.h5,
  },
});

export default styles;
