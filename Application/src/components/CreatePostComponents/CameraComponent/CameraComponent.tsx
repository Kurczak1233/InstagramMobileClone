import { CameraType, Camera, CameraCapturedPicture } from "expo-camera";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

import { INewPostComponent } from "../../../screens/CreatePostScreen/CreatePostScreen";
import { styles } from "./styles";
type ICameraComponent = {
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
  changeVisibleComponent: (component: INewPostComponent) => void;
};

export const CameraComponent = ({
  setImage,
  changeVisibleComponent,
}: ICameraComponent) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (cameraRef && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo);
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
