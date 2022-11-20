import { CameraType, Camera, CameraCapturedPicture } from "expo-camera";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

import { INewPostComponent } from "../../../screens/CreatePostScreen/CreatePostScreen";
import { styles } from "./styles";

type ICameraComponet = {
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
  changeVisibleComponent: (component: INewPostComponent) => void;
};

export const CameraComponent = ({
  setImage,
  changeVisibleComponent,
}: ICameraComponet) => {
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
      console.log(photo);
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
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
            <Button title="Take Picture" onPress={() => takePicture()} />
            {/* {image && (
              <Image source={{ uri: image as any }} style={{ flex: 1 }} />
            )} */}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
