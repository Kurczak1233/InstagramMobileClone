import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";

import { queryClient } from "../../../App";
import { getPostsData } from "../../apiCalls/getPostsData";
import Header from "../../components/typography/Header";
import useNavigateToPostPage from "../../hooks/useNavigateToPostPage";
import theme from "../../theme/theme";
import { styles } from "./styles";

type ISearchPosts = {
  searchPhrase: string;
};

type IMockedUsers = {
  id: number;
  name: string;
};

export const SearchPostScreen = () => {
  const { navigateToPostPage } = useNavigateToPostPage();
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: getPostsData,
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<ISearchPosts>({
    defaultValues: {
      searchPhrase: "",
    },
  });

  //There is no endpoint ready for that.
  const mockedUsers: IMockedUsers[] = [
    {
      id: 1,
      name: "test",
    },
    {
      id: 2,
      name: "user",
    },
    {
      id: 3,
      name: "black",
    },
  ];

  const filteredPosts = useMemo(() => {
    const postsAsArray = posts as any[];
    const filteredItems = postsAsArray.filter((item) =>
      item.description
        .toLowerCase()
        .includes(watch("searchPhrase").toLowerCase())
    );
    return filteredItems ? filteredItems : [];
  }, [posts, watch("searchPhrase")]);

  const fiteredUsers = useMemo(() => {
    const mockedUsersArray = mockedUsers as IMockedUsers[];
    const filteredItems = mockedUsersArray.filter((item) =>
      item.name.toLowerCase().includes(watch("searchPhrase").toLowerCase())
    );
    return filteredItems ? filteredItems : [];
  }, [posts, watch("searchPhrase")]);

  const handleImageClick = (itemId: number) => {
    navigateToPostPage(itemId);
    queryClient.invalidateQueries({
      queryKey: ["postData", itemId],
    });
  };

  // queryFn: () => getPostData(itemId),

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.smallPadding]}
          >
            <Controller
              control={control}
              name="searchPhrase"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInput}
                  value={value}
                  autoCapitalize="words"
                  autoComplete="off"
                  onChangeText={onChange}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder="Search..."
                />
              )}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.imagesWrapper}>
        <Header variant="h5" color={theme.colors.primary}>
          Posts
        </Header>
        <FlatList
          data={filteredPosts as any[]}
          scrollEnabled
          style={[styles.container]}
          contentContainerStyle={styles.listContainer}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor={theme.colors.overlay}
              onPress={() => handleImageClick(item.id)}
              style={[styles.container]}
            >
              <View style={[styles.container, styles.imageContainer]}>
                <Image
                  style={styles.smallImage}
                  source={{ uri: item.image_url }}
                />
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
      <View style={styles.imagesWrapper}>
        <Header variant="h5" color={theme.colors.primary}>
          Users
        </Header>
        <FlatList
          data={fiteredUsers as any[]}
          scrollEnabled
          style={[styles.container]}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
    </View>
  );
};
