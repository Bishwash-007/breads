import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

export type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId?: Id<"messages">;
};

export type ThreadItemProps = {
  _id: Id<"messages">;
  _creationTime: number;
  content: string;
  commentCount: number;
  likeCount: number;
  retweetCount: number;
  mediaFiles: string[];
  userId: string;
  creator: {
    _id: string;
    _creationTime: number;
    clerkId: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    imageUrl: string;
    bio: string;
    location: string;
    websiteUrl: string;
    followersCount: number;
  };
  disableProfileLink?: boolean;
  disableThreadLink?: boolean;
  disableMediaLink?: boolean;
};

export type ProfileProps = {
  userId?: Id<"users">;
  showBackButton: boolean;
};

export type AlertModalProps = {
  isVisible: boolean;
  onDiscard: () => void;
  onSave: () => void;
  onCancel: () => void;
};

export type ModalHeaderProps = {
  title: string;
  leftText: string;
  rightText: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
};

export type EditAvatarModalProps = {
  visible: boolean;
  onClose: () => void;
  onImagePicked: (uri: string) => void;
};

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export type FieldProps = {
  key: string;
  label: string;
  value: string;
  setter: (text: string) => void;
  placeholder: string;
  icon: IoniconName | null;
};

export type ThemeState = {
  theme: "light" | "dark" | "system";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
};

export interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
  focused?: boolean;
}

export type UserProfile = {
  _id: string;
  _creationTime: number;
  bio: string;
  clerkId: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  imageUrl: string;
  location: string;
  websiteUrl: string;
  followersCount: number;
};
