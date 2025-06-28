import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EditAvatarModalProps } from "@/types/types";
import { useAvatarPicker } from "@/hooks/threads/useSingleMedia";

const EditAvatarModal = ({ visible, onClose, onImagePicked }: EditAvatarModalProps) => {
  const { handleCamera, handleLibrary } = useAvatarPicker(onImagePicked, onClose);

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
            <Ionicons name="camera-outline" size={24} color="#555" />
            <Text className="text-lg text-black dark:text-white">Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4 px-2 gap-1"
            onPress={handleLibrary}
          >
            <Ionicons name="image-outline" size={24} color="#555" />
            <Text className="text-lg text-black dark:text-white">Choose from Library</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="mt-4 py-3 items-center bg-gray-200 dark:bg-gray-700 rounded-xl"
          >
            <Text className="text-black text-lg font-semibold dark:text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditAvatarModal;