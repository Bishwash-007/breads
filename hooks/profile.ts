import { Ionicons } from "@expo/vector-icons";

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export type FieldProps = {
  key: string;
  label: string;
  value: string;
  setter: (text: string) => void;
  placeholder: string;
  icon: IoniconName | null;
};

export const getProfileFields = (
  bio: string,
  setBio: (text: string) => void,
  link: string,
  setLink: (text: string) => void
): FieldProps[] => [
  {
    key: "bio",
    label: "Bio",
    value: bio,
    setter: setBio,
    placeholder: "Tell us about yourself",
    icon: null,
  },
  {
    key: "link",
    label: "Website",
    value: link,
    setter: setLink,
    placeholder: "https://yourwebsite.com",
    icon: "globe-outline",
  },
];
