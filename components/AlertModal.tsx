import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type EditAvatarModalProps = {
  visible: boolean;
  onClose: () => void;
  onImagePicked: (uri: string) => void;
};

const EditAvatarModal = ({
  visible,
  onClose,
  onImagePicked,
}: EditAvatarModalProps) => {
  const handleCamera = async () => {
    onClose();
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      mediaTypes: ["images", "videos"],
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  const handleLibrary = async () => {
    onClose();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      mediaTypes: ["images", "videos"],
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white dark:bg-neutral-900 p-6 rounded-t-2xl">
          <Text className="text-xl font-semibold mb-6 text-center text-black dark:text-white">
            Update Profile Picture
          </Text>

          <TouchableOpacity
            className="flex-row items-center py-4 px-2 gap-1"
            onPress={handleCamera}
          >
            <Ionicons
              name="camera-outline"
              size={24}
              className="mr-3"
              color="#555"
            />
            <Text className="text-lg text-black dark:text-white">
              Take Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4 px-2 gap-1"
            onPress={handleLibrary}
          >
            <Ionicons
              name="image-outline"
              size={24}
              className="mr-3"
              color="#555"
            />
            <Text className="text-lg text-black dark:text-white">
              Choose from Library
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="mt-4 py-3 items-center bg-gray-200 dark:bg-gray-700 rounded-xl"
          >
            <Text className="text-black text-lg font-semibold dark:text-white">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditAvatarModal;
