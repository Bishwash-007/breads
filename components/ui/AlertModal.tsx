import { Modal, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

export type AlertModalProps = {
  isVisible: boolean;
  onDiscard: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const AlertModal: React.FC<AlertModalProps> = ({
  isVisible,
  onDiscard,
  onSave,
  onCancel,
}) => {
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <BlurView
        intensity={50}
        tint="dark"
        className="flex-1 justify-center items-center"
      >
        <View className="w-[80%] bg-white dark:bg-neutral-800 rounded-xl py-6 px-4">
          <Text className="text-center text-lg font-semibold mb-4 text-black dark:text-white">
            Discard Thread?
          </Text>
          <View className="space-y-2 gap-2">
            <TouchableOpacity
              onPress={onDiscard}
              className="py-3 bg-red-100 rounded-lg"
            >
              <Text className="text-center text-red-600 font-semibold">
                Discard
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onSave}
              className="py-3 bg-gray-100 rounded-lg"
            >
              <Text className="text-center text-gray-800">Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onCancel}
              className="py-3 bg-gray-100 rounded-lg"
            >
              <Text className="text-center text-gray-800">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default AlertModal;
