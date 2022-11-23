import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { decode } from "base64-arraybuffer";
import { Camera, CameraCapturedPicture } from "expo-camera";
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, TextInput } from "react-native";
import * as yup from "yup";

import { queryClient } from "../../../App";
import { createPost } from "../../apiCalls/createPost";
import {
  CameraComponent,
  NewPostOverviewComponent,
} from "../../components/CreatePostComponents";
import { StackTabsParamList } from "../../components/Navigation/stackTabsParamsList";
import { supaBaseclient } from "../../utilities/supabaseClient";
import { styles } from "./styles";
const schema = yup.object().shape({
  title: yup.string().required(),
});

export type ICreatePost = {
  title: string;
};

export enum INewPostComponent {
  overview,
  newPicture,
}

export const CreatePostScreen = () => {
  const [componentVisibility, setComponentVisibility] =
    useState<INewPostComponent>(INewPostComponent.overview);
  const navigation = useNavigation<StackNavigationProp<StackTabsParamList>>();

  const ref_title_input = useRef<TextInput>(null);
  const cameraRef = useRef<Camera>(null);
  const [image, setImage] = useState<CameraCapturedPicture>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreatePost>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = async (data: ICreatePost) => {
    try {
      if (image && image.base64) {
        await supaBaseclient.storage
          .from("images")
          .upload(data.title, decode(image.base64), {
            cacheControl: "3600",
            upsert: false,
          });

        const imageUrl = await supaBaseclient.storage
          .from("images")
          .getPublicUrl(data.title);

        await createPost(imageUrl.data.publicUrl, data);
        navigation.navigate("PlatformMain");
        queryClient.invalidateQueries({ queryKey: ["postsData"] });
        reset();
        setImage(undefined);
      }
    } catch (error) {
      console.log("Register went wrong", error);
    }
  };

  const changeVisibleComponent = (component: INewPostComponent) => {
    setComponentVisibility(component);
  };

  useEffect(() => {
    ref_title_input.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      {componentVisibility === INewPostComponent.overview && (
        <NewPostOverviewComponent
          control={control}
          ref_title_input={ref_title_input}
          image={image}
          changeVisibleComponent={changeVisibleComponent}
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          setImage={setImage}
        />
      )}
      {componentVisibility === INewPostComponent.newPicture && (
        <CameraComponent
          setImage={setImage}
          changeVisibleComponent={changeVisibleComponent}
          cameraRef={cameraRef}
        />
      )}
    </View>
  );
};
