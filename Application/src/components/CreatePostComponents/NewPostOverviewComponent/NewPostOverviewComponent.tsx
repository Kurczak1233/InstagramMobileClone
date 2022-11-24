import { CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import {
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView,
} from "react-native";

import {
  ICreatePost,
  INewPostComponent,
} from "../../../screens/CreatePostScreen/CreatePostScreen";
import { styles } from "./styles";

type INewPostOverviewComponent = {
  control: Control<ICreatePost, any>;
  ref_title_input: React.RefObject<TextInput>;
  image: CameraCapturedPicture | undefined;
  changeVisibleComponent: (component: INewPostComponent) => void;
  handleSubmit: UseFormHandleSubmit<ICreatePost>;
  submitForm: (data: ICreatePost) => Promise<void>;
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
};

export const NewPostOverviewComponent = ({
  control,
  ref_title_input,
  image,
  changeVisibleComponent,
  handleSubmit,
  submitForm,
  setImage,
}: INewPostOverviewComponent) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result as any);
      changeVisibleComponent(INewPostComponent.overview);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <Image
            style={styles.image}
            source={{
              uri: image
                ? image.uri
                : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg",
            }}
          />

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textInput}
                ref={ref_title_input}
                value={value}
                onSubmitEditing={() => {
                  if (ref_title_input.current) {
                    ref_title_input.current.focus();
                  }
                }}
                autoCapitalize="words"
                onChangeText={onChange}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder="Title..."
              />
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.footerButtons}>
        <Button
          title="Take picture"
          onPress={() => changeVisibleComponent(INewPostComponent.newPicture)}
        />
        <Button title="Save post" onPress={handleSubmit(submitForm)} />
        <Button title="Camera roll" onPress={pickImage} />
      </View>
    </View>
  );
};
