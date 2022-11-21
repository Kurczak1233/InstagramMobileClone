import { CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Button,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";

import { INewPostComponent } from "../../../screens/CreatePostScreen/CreatePostScreen";
import theme from "../../../theme/theme";
import { styles } from "./styles";

type ICameraaRollComponent = {
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
  changeVisibleComponent: (component: INewPostComponent) => void;
};

export const CameraRollComponent = ({
  setImage,
  changeVisibleComponent,
}: ICameraaRollComponent) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0] as any);
      changeVisibleComponent(INewPostComponent.overview);
    }
  };

  return (
    <View>
      <Text>CameraRoll</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
};
