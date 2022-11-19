import React from "react";
import { Text } from "react-native";

interface IBodyChildren {
  children: React.ReactNode;
}

// - Header
//     - Should take variant `h1` `h2` `h3` `h4` `h5` props
//     - Should take `color` prop, default `#070B11`
//     - Font size `60px` `48px` `44px` `32px` `25px`
//     - Font weight `700`
//     - Font family - TBD

export default function Header({ children }: IBodyChildren) {
  return <Text>{children}</Text>;
}
