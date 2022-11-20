import React from "react";
import { Text } from "react-native";

import styles from "./styles";

interface IBodyChildren {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5";
  color?: string;
  size: `60px` | `48px` | `44px` | `32px` | `25px`;
}

export default function Header({
  children,
  variant,
  color = "#070B11",
}: IBodyChildren) {
  return (
    <Text style={[styles.header, styles[variant], { color }]}>{children}</Text>
  );
}
