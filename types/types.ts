import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

export type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId?: Id<"messages">;
};

export type ThreadItemProps = {
  _id: Id<"messages">;
  content: string;
  creator: {
    first_name?: string;
    last_name?: string;
    username: string | null;
    imageUrl?: string;
  };
  mediaFiles: string[];
  likeCount: number;
  retweetCount: number;
  commentCount: number;
  _creationTime: number;
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
