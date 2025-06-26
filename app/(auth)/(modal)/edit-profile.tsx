import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Header } from "@/components/ui/ModalHeader";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EditAvatarModal from "@/components/AlertModal";
import { getProfileFields } from "@/hooks/profile";

const EditProfile = () => {
  const { biostring, linkstring, userId, imageUrl } = useLocalSearchParams<{
    biostring: string;
    linkstring: string;
    userId: string;
    imageUrl: string;
  }>();

  const [bio, setBio] = useState(biostring);
  const [link, setLink] = useState(linkstring);
  const [image, setImage] = useState(imageUrl);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const updateUser = useMutation(api.users.updateUser);

  const onDone = async () => {
    await updateUser({
      _id: userId as Id<"users">,
      bio,
      websiteUrl: link,
    });
    router.dismiss();
  };

  const handleImagePicked = (uri: string) => {
    setNewImage(uri);
    setImage(uri);
  };

  const fields = getProfileFields(bio, setBio, link, setLink);

  return (
    <View className="px-5 mt-6 bg-white dark:bg-black flex-1">
      <Header
        title="Edit-Profile"
        leftText="Cancel"
        rightText="Done"
        onPressRight={onDone}
        onPressLeft={() => router.dismiss()}
      />

      <View className="relative items-center justify-center mt-12">
        <Image source={{ uri: image }} className="size-36 rounded-full mb-12" />

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="absolute bottom-8 right-[34%] bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-2xl p-2"
        >
          <Ionicons name="pencil-outline" size={16} color="#555" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={fields}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View className="w-full justify-center mb-4">
            <Text className="text-lg text-gray-700 dark:text-gray-300 py-2 px-1">
              {item.label}
            </Text>
            <View
              className={`border border-neutral-200 dark:border-neutral-700 rounded-lg w-full h-16 px-2 flex flex-row items-center bg-white dark:bg-neutral-900 ${
                item.icon ? "space-x-2" : ""
              }`}
            >
              {item.icon && (
                <Ionicons
                  name={item.icon}
                  size={20}
                  color="#555"
                  className="px-2"
                />
              )}
              <TextInput
                value={item.value}
                onChangeText={item.setter}
                placeholder={item.placeholder}
                placeholderTextColor="#999"
                numberOfLines={2}
                className="flex-1 text-gray-800 dark:text-gray-200 text-base"
              />
            </View>
          </View>
        )}
        ListFooterComponent={<View className="mb-12" />}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />

      <EditAvatarModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onImagePicked={handleImagePicked}
      />
    </View>
  );
};

export default EditProfile;
