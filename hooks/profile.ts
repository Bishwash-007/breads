import { FieldProps } from "@/types/types";

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
