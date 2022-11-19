import React from "react";
import { Text } from "react-native";

interface IBodyChildren {
  children: React.ReactNode;
}

// - Paragraph
//     - Should take `color` prop, default `#070B11`
//     - Font size `12px`
//     - Font weight `600`
//     - Font family - TBD

export default function Paragraph({ children }: IBodyChildren) {
  return <Text>{children}</Text>;
}
