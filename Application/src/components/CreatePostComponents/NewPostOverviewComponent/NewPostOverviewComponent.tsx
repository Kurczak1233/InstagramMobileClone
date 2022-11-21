import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import {
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Button,
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
};

export const NewPostOverviewComponent = ({
  control,
  ref_title_input,
  image,
  changeVisibleComponent,
  handleSubmit,
  submitForm,
}: INewPostOverviewComponent) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? image.uri
            : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
      </KeyboardAvoidingView>
      <View style={styles.footerButtons}>
        <Button
          title="Change picture"
          onPress={() => changeVisibleComponent(INewPostComponent.newPicture)}
        />
        <Button title="Save post" onPress={handleSubmit(submitForm)} />
      </View>
    </View>
  );
};
