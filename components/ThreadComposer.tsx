import {
  View,
  ScrollView,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  InputAccessoryView,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Stack, useRouter } from "expo-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "./ui/ModalHeader";
import { Ionicons } from "@expo/vector-icons";

type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId: Id<"messages">;
};

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
  const inputAccessoryViewID = "uniqueInputAccessory";

  const addThread = useMutation(api.messages.addThread);

  const handleSubmit = async () => {
    await addThread({
      threadId,
      content: threadContent,
    });
    setThreadContent("");
    setMediaFiles([]);
    router.dismiss();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust for header if needed
    >
      <View className="flex-1 px-4 pt-8 bg-white dark:bg-black">
        <Header
          title="Create Post"
          leftText="Cancel"
          rightText="Post"
          onPressLeft={() => router.dismiss()}
          onPressRight={handleSubmit}
        />

        <ScrollView className="pt-2 px-2" keyboardShouldPersistTaps="handled">
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
              <Text className="text-gray-500">@{userProfile?.username}</Text>

              <View className="mt-3 rounded-lg pl-3 py-2 bg-gray-50 dark:bg-neutral-900 flex-row items-end space-x-2">
                <TextInput
                  value={threadContent}
                  onChangeText={setThreadContent}
                  inputAccessoryViewID={
                    Platform.OS === "ios" ? inputAccessoryViewID : undefined
                  }
                  placeholder="What's on your mind?"
                  multiline
                  className="flex-1 text-base text-black dark:text-white"
                  placeholderTextColor="#888"
                />
                <TouchableOpacity
                  onPress={() => console.log("Replied")}
                  className="p-2"
                >
                  <Ionicons name="send-outline" size={20} color="#555" />
                </TouchableOpacity>
              </View>

              <View className="flex flex-row gap-4 pt-2">
                <TouchableOpacity>
                  <Ionicons name="image-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="camera-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="videocam-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="mic-outline" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* iOS Only Input Accessory */}
        {Platform.OS === "ios" && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View className="bg-white border-t px-4 py-2 dark:bg-neutral-900 flex-row justify-end">
              <Button
                title="Clear text"
                onPress={() => setThreadContent("")}
                color="#007aff"
              />
            </View>
          </InputAccessoryView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ThreadComposer;
