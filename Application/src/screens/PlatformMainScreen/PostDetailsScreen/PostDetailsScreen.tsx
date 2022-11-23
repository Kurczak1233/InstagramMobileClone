import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";

import { queryClient } from "../../../../App";
import { createCommentForPost } from "../../../apiCalls/createCommentForPost";
import { deleteDatabasePost } from "../../../apiCalls/deleteDatabasePost";
import { getPostData } from "../../../apiCalls/getPostData";
import { getPostLikes } from "../../../apiCalls/getPostLikes";
import { giveLike } from "../../../apiCalls/giveLike";
import { removeLike } from "../../../apiCalls/removeLike";
import { PlatformMainParamList } from "../../../components/Navigation/platformMainParamList";
import { PostComment } from "../../../components/Posts";
import { UserAvatar } from "../../../components/UserAvatar";
import Header from "../../../components/typography/Header";
import Paragraph from "../../../components/typography/Paragraph";
import theme from "../../../theme/theme";
import { getItem } from "../../../utilities/storage";
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
  commentId: number;
};

const schema = yup.object().shape({
  description: yup.string().required(),
});

export const PostDetailsScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<PlatformMainParamList>>();
  const route =
    useRoute<RouteProp<Record<string, PostDetailsScreenRouteParams>, string>>();
  const { id } = route.params;

  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ["postData", id],
    queryFn: ({ queryKey }) => getPostData(+queryKey[1]),
  });

  const {
    isLoading: likesLoading,
    error: likesError,
    data: postLikes,
  } = useQuery({
    queryKey: ["postLikes", id],
    queryFn: ({ queryKey }) => getPostLikes(+queryKey[1]),
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
      queryClient.invalidateQueries({ queryKey: ["postData"] });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      await deleteDatabasePost(post?.id);
      navigation.navigate("Posts");
      queryClient.invalidateQueries({ queryKey: ["postsData"] });
    } catch (err) {
      console.log("Deleting post went wrong", err);
    }
  };

  const giveLikeToPost = async () => {
    try {
      const userId = await getItem("userId");
      const postLikesArray = postLikes as any[];

      if (userId) {
        const parsedJsonUserId = JSON.parse(userId);

        const alreadyGivenLike = postLikesArray.find((item) => {
          const creator_uuid: string = item.creator_uuid;
          return creator_uuid === parsedJsonUserId;
        });
        console.log(
          `alreadyGivenLike`,
          alreadyGivenLike,
          `postLikesArray`,
          postLikesArray,
          `userId`,
          userId
        );
        if (!alreadyGivenLike) {
          await giveLike(post?.id);
          return queryClient.invalidateQueries({ queryKey: ["postLikes"] });
        }
        await removeLike(alreadyGivenLike.id);
        return queryClient.invalidateQueries({ queryKey: ["postLikes"] });
      }
    } catch (err) {
      console.log("Giving like went wrong", err);
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
    <View style={[styles.container]}>
      <Image
        style={[styles.image]}
        source={{
          uri: post?.image_url,
        }}
      />
      <View style={styles.imageDetails}>
        <View style={styles.likesAndAvatarsContainer}>
          <UserAvatar userId={post?.creator_uuid} imageSize="small" />
          <View style={styles.likesAndDescription}>
            <View>
              <Header variant="h5">{postLikes?.length} Likes</Header>
              <Paragraph>Title: {post?.description}</Paragraph>
            </View>
            <TouchableOpacity
              style={styles.likeButton}
              onPress={giveLikeToPost}
            >
              <AntDesign name="like2" size={36} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={deletePost}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={post?.comments as any[]}
        scrollEnabled
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostComment
            body={item.body}
            creator_uuid={item.creator_uuid}
            commentId={item.id}
          />
        )}
      />
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
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
