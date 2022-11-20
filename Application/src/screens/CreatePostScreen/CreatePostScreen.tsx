import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraCapturedPicture } from "expo-camera";
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, TextInput } from "react-native";
import * as yup from "yup";

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
  const [image, setImage] = useState<CameraCapturedPicture>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePost>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const submitForm = async (data: ICreatePost) => {
    try {
      await supaBaseclient
        .from("posts")
        .insert({
          description: data.title,
          image_url: image?.uri,
        })
        .limit(1)
        .single();
      navigation.navigate("PlatformMain");
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
        />
      )}
      {componentVisibility === INewPostComponent.newPicture && (
        <CameraComponent
          setImage={setImage}
          changeVisibleComponent={changeVisibleComponent}
        />
      )}
    </View>
  );
};
