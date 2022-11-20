import { yupResolver } from "@hookform/resolvers/yup";
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
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as yup from "yup";

import { PostComment } from "../../../components/Posts";
import { supaBaseclient } from "../../../utilities/supabaseClient";
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
  const route =
    useRoute<RouteProp<Record<string, PostDetailsScreenRouteParams>, string>>();
  const { id } = route.params;

  const {
    isLoading,
    error,
    data: post,
    refetch,
  } = useQuery({
    queryKey: ["postData"],
    queryFn: async () => {
      const response = await supaBaseclient
        .from("posts")
        .select(
          "id, created_at, description, creator_uuid, image_url, comments ( body, creator_uuid, id )"
        )
        .eq("id", id)
        .is("archived_at", null)
        .single();
      return response.data;
    },
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

  console.log(post?.comments);

  const createPostComment = async (body: ICreateComment) => {
    // create a comment
    const response = await supaBaseclient
      .from("comments")
      .insert({
        body: body.description,
        post_id: id,
      })
      .limit(1)
      .single();
    refetch();
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.saveAreaContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: post?.image_url,
            }}
          />
          <View>
            <View>
              <Text>Image</Text>
              <Text>Somebody</Text>
            </View>
            <View>
              <Text>14 Likes</Text>
              <Text>Title: {post?.description}</Text>
            </View>
          </View>
          <FlatList
            data={post?.comments as any[]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostComment
                body={item.body}
                creator_uuid={item.creator_uuid}
                id={item.id}
              />
            )}
          />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
