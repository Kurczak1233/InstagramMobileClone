import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { CameraCapturedPicture } from "expo-camera";
import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, FlatList, TouchableHighlight } from "react-native";

import { INewPostComponent } from "../../../screens/CreatePostScreen/CreatePostScreen";
import theme from "../../../theme/theme";
import { styles } from "./styles";

type ICameraaRollComponent = {
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
  changeVisibleComponent: (component: INewPostComponent) => void;
};

export const CameraRollComponent = ({
  setImage,
  changeVisibleComponent,
}: ICameraaRollComponent) => {
  const [availableImages, setAvailableImages] = useState<any[]>();

  const getAvailablePhotos = useCallback(() => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos",
    })
      .then((r) => {
        setAvailableImages(r.edges);
      })
      .catch((err) => {
        console.log("Getting images went wrong", err);
      });
  }, []);

  useEffect(() => {
    getAvailablePhotos();
  }, []);

  return (
    <View>
      <Text>CameraRoll</Text>
      {/* {this.state.photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })} */}

      <FlatList
        data={availableImages as any[]}
        scrollEnabled
        style={[styles.container]}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor={theme.colors.overlay}
            //   onPress={() => handleImageClick(item.id)}
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
  );
};
