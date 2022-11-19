import React from "react";
import { Text } from "react-native";

import theme from "../../../theme/theme";
import styles from "./styles";

interface IBodyChildren {
  children: React.ReactNode;
  variant: "large" | "small";
  color?: string;
}

export default function Body({
  children,
  variant,
  color = theme.colors.primary,
}: IBodyChildren) {
  return (
    <Text style={[styles.text, styles[variant], { color }]}>{children}</Text>
  );
}
