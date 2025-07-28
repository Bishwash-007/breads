import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "./ui/ModalHeader";
import { Entypo, Ionicons } from "@expo/vector-icons";
import AlertModal from "./ui/AlertModal";
import { ThreadComposerProps } from "@/types/types";
import { useMediaManager } from "@/hooks/threads/useMediaManager";

const ThreadComposer: React.FC<ThreadComposerProps> = ({
  isPreview,
  isReply,
  threadId,
}) => {
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const [threadContent, setThreadContent] = useState("");
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const addThread = useMutation(api.messages.addThread);

  const {
    mediaFiles,
    setMediaFiles,
    loading,
    handleCamera,
    handleLibrary,
    uploadMediaFiles,
  } = useMediaManager();

  const handleSubmit = async () => {
    if (loading) return;
    try {
      const ids = mediaFiles.length ? await uploadMediaFiles() : [];
      await addThread({ threadId, content: threadContent, mediaFiles: ids });
      setThreadContent("");
      setMediaFiles([]);
      router.dismiss();
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-4 pt-6 justify-between">
          {!isPreview && (
            <Header
              title={isReply ? "Write a Reply" : "Create Post"}
              leftText="Cancel"
              rightText={isReply ? "Reply" : "Post"}
              onPressLeft={() => setShowDiscardModal(true)}
              onPressRight={handleSubmit}
            />
          )}
          <ScrollView keyboardShouldPersistTaps="handled">
            <View className="border-hairline flex-row px-4 py-4 rounded-2xl bg-white dark:bg-black dark:border-white">
              <Image
                source={
                  userProfile?.imageUrl
                    ? { uri: userProfile.imageUrl }
                    : undefined
                }
                className="size-12 rounded-full"
              />
              <View className="flex-1 px-4">
                <Text className="font-semibold text-base text-black dark:text-white">
                  {userProfile?.first_name} {userProfile?.last_name}
                </Text>
                <Text className="text-gray-500 pb-2">@{userProfile?.username}</Text>

                {mediaFiles.length > 0 && (
                  <View className="flex-row flex-wrap mt-2">
                    {mediaFiles.map((uri, idx) => (
                      <View key={idx} className="relative h-20 w-20 m-1">
                        <Image
                          source={{ uri }}
                          className="h-full w-full rounded-md"
                        />
                        <TouchableOpacity
                          onPress={() =>
                            setMediaFiles((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          className="absolute top-0 right-0 bg-white rounded-full p-0.5 shadow-md"
                        >
                          <Entypo
                            name="circle-with-cross"
                            size={18}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                <View className="flex-row items-end rounded-lg pl-3 py-2 bg-gray-50 dark:bg-neutral-900 space-x-2">
                  <TextInput
                    value={threadContent}
                    onChangeText={setThreadContent}
                    placeholder={
                      isReply ? "Write a reply..." : "What's on your mind?"
                    }
                    multiline
                    numberOfLines={isReply ? 2 : 4}
                    className="flex-1 text-base text-black dark:text-white"
                    placeholderTextColor="#888"
                  />
                  {isPreview && (
                    <TouchableOpacity onPress={handleSubmit} className="p-2">
                      <Ionicons name="send-outline" size={20} color="#555" />
                    </TouchableOpacity>
                  )}
                </View>

                <View className="flex-row gap-6 pt-4">
                  <TouchableOpacity onPress={()=>handleLibrary()}>
                    <Ionicons name="image-outline" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCamera}>
                    <Ionicons name="camera-outline" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCamera}>
                    <Ionicons name="videocam-outline" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {showDiscardModal && (
            <AlertModal
              isVisible={showDiscardModal}
              onDiscard={() => {
                router.dismiss();
                setThreadContent("");
                setMediaFiles([]);
                setShowDiscardModal(false);
              }}
              onSave={() => setShowDiscardModal(false)}
              onCancel={() => setShowDiscardModal(false)}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ThreadComposer;
