import {
  View,
  ScrollView,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Stack, useRouter } from "expo-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "./ui/ModalHeader";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ThreadComposerProps } from "@/types/types";

const ThreadComposer: React.FC<ThreadComposerProps> = ({
  isPreview,
  isReply,
  threadId,
}) => {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const [threadContent, setThreadContent] = useState("");
  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addThread = useMutation(api.messages.addThread);

  const onImagePicked = (uri: string) => {
    setMediaFiles([uri]);
  };

  const clearMediaPicked = () => {
    setMediaFiles([]);
  };

  const handleSubmit = async () => {
    await addThread({
      threadId,
      content: threadContent,
      mediaFiles,
    });

    setThreadContent("");
    setMediaFiles([]);
    router.dismiss();
  };

  const handleCamera = async () => {
    setLoading(true);
    setError(null);

    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        setError("Camera permission denied.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ["images", "videos"],
      });

      if (!result.canceled && result.assets?.length) {
        onImagePicked(result.assets[0].uri);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLibrary = async () => {
    setLoading(true);
    setError(null);

    try {
      const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!granted) {
        console.log("Media Picker permission Denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ["images", "videos"],
      });

      if (!result.canceled && result.assets?.length) {
        onImagePicked(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="px-4 pt-6 justify-items-stretch flex flex-1 justify-between">
          <View className="flex flex-col">
            <Header
              title="Create Post"
              leftText="Cancel"
              rightText="Post"
              onPressLeft={() => router.dismiss()}
              onPressRight={handleSubmit}
            />

            {/* Main scrollable content */}
            <ScrollView
              className="pt-2 px-2"
              keyboardShouldPersistTaps="handled"
            >
              <View className="border-hairline flex-row p-4 rounded-xl bg-white dark:bg-black dark:border-white">
                <Image
                  source={
                    userProfile?.imageUrl
                      ? { uri: userProfile.imageUrl }
                      : undefined
                  }
                  className="size-12 rounded-full"
                />
                <View className="flex-1 flex-col px-4">
                  <Text className="font-semibold text-base text-black dark:text-white">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </Text>
                  <Text className="text-gray-500">
                    @{userProfile?.username}
                  </Text>

                  {/* Input section */}
                  <View className="flex space-y-3">
                    {mediaFiles.length > 0 && (
                      <View className="relative h-16 w-16">
                        <Image
                          source={{ uri: mediaFiles[0] }}
                          className="h-full w-full rounded-md"
                        />
                        <TouchableOpacity
                          onPress={clearMediaPicked}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md"
                        >
                          <Entypo
                            name="circle-with-cross"
                            size={18}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Single instance of the text input */}
                    <View className="rounded-lg pl-3 py-2 bg-gray-50 dark:bg-neutral-900 flex-row items-end space-x-2">
                      <TextInput
                        value={threadContent}
                        onChangeText={setThreadContent}
                        placeholder={"What's on your mind?"}
                        multiline
                        numberOfLines={4}
                        className="flex-1 text-base text-black dark:text-white"
                        placeholderTextColor="#888"
                      />
                      <TouchableOpacity
                        onPress={() => {
                          if (isReply) {
                            console.log("replied");
                          } else {
                            handleSubmit();
                          }
                        }}
                        className="p-2"
                      >
                        <Ionicons name="send-outline" size={20} color="#555" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Icons row */}
                  <View className="flex flex-row gap-4 pt-2">
                    <TouchableOpacity onPress={() => handleLibrary()}>
                      <Ionicons name="image-outline" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCamera()}>
                      <Ionicons name="camera-outline" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCamera()}>
                      <Ionicons name="videocam-outline" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Fixed bottom input */}
          {/* reply  */}
          <View className="border-hairline rounded-lg py-2 px-3 mx-2 dark:bg-neutral-900">
            <View className="flex-row items-center space-x-2">
              <TextInput
                value={threadContent}
                onChangeText={setThreadContent}
                placeholder={
                  isReply ? "Write a reply..." : "What's on your mind?"
                }
                multiline
                className="flex-1 text-base text-black dark:text-white py-1"
                placeholderTextColor="#888"
              />
              <TouchableOpacity onPress={handleSubmit} className="p-2">
                <Ionicons name="send-outline" size={24} color="#555" />
              </TouchableOpacity>
            </View>
          </View>

          {/* end  */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ThreadComposer;
