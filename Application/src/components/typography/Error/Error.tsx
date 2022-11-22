import React from "react";
import { Text } from "react-native";

import theme from "../../../theme/theme";
import styles from "./styles";

interface IBodyChildren {
  children: React.ReactNode;
  variant: "large" | "small";
}

export function Error({ children, variant }: IBodyChildren) {
  return (
    <Text style={[styles.text, styles[variant], { color: theme.colors.error }]}>
      {children}
    </Text>
  );
}
