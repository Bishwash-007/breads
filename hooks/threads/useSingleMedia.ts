import * as ImagePicker from "expo-image-picker";

export function useAvatarPicker(onImagePicked: (uri: string) => void, onClose: () => void) {
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

    if (!result.canceled && result.assets?.length) {
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

    if (!result.canceled && result.assets?.length) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return { handleCamera, handleLibrary };
}