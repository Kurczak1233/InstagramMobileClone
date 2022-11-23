import { CameraType, Camera, CameraCapturedPicture } from "expo-camera";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

import { INewPostComponent } from "../../../screens/CreatePostScreen/CreatePostScreen";
import { styles } from "./styles";
type ICameraComponent = {
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
  changeVisibleComponent: (component: INewPostComponent) => void;
  cameraRef: React.RefObject<Camera>;
};

export const CameraComponent = ({
  setImage,
  changeVisibleComponent,
  cameraRef,
}: ICameraComponent) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (cameraRef && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setImage(photo);
      changeVisibleComponent(INewPostComponent.overview);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonsWrapper}>
            <Button title="Take Picture" onPress={takePicture} />
            <Button title="Flip Camera" onPress={toggleCameraType} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
