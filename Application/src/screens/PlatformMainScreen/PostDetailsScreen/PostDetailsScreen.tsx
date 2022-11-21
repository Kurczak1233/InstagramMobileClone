import { yupResolver } from "@hookform/resolvers/yup";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";

import { createCommentForPost } from "../../../apiCalls/createCommentForPost";
import { getPostData } from "../../../apiCalls/getPostData";
import { PostComment } from "../../../components/Posts";
import { UserAvatar } from "../../../components/UserAvatar";
import useKeyboardVisible from "../../../hooks/useIsKeyboardVisible";
import { styles } from "./styles";
type PostDetailsScreenRouteParams = {
  id: number;
};

type ICreateComment = {
  description: string;
};

export type IPostComment = {
  body: string;
  creator_uuid: string;
  id: number;
};

const schema = yup.object().shape({
  description: yup.string().required(),
});

export const PostDetailsScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { isKeyboardVisible } = useKeyboardVisible();
  const route =
    useRoute<RouteProp<Record<string, PostDetailsScreenRouteParams>, string>>();
  const { id } = route.params;

  const {
    isLoading,
    error,
    refetch,
    data: post,
  } = useQuery({
    queryKey: ["postData", id],
    queryFn: ({ queryKey }) => getPostData(+queryKey[1]),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateComment>({
    defaultValues: {
      description: "",
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const createPostComment = async (body: ICreateComment) => {
    try {
      await createCommentForPost(body.description, post?.id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { marginBottom: !isKeyboardVisible ? tabBarHeight : 0 },
      ]}
    >
      <Image
        style={[styles.image]}
        source={{
          uri: post?.image_url,
        }}
      />
      <UserAvatar userId={post?.creator_uuid} imageSize="small" />
      <View>
        <Text>14 Likes</Text>
        <Text>Title: {post?.description}</Text>
      </View>
      <FlatList
        data={post?.comments as any[]}
        scrollEnabled
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostComment
            body={item.body}
            creator_uuid={item.creator_uuid}
            id={item.id}
          />
        )}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textInput}
                value={value}
                onSubmitEditing={handleSubmit(createPostComment)}
                autoCapitalize="words"
                autoComplete="off"
                onChangeText={onChange}
                blurOnSubmit={false}
                returnKeyType="next"
                placeholder="Comment..."
              />
            )}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};
