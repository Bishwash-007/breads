import { View, Text, FlatList } from "react-native";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-expo";
import { ListHeaderComponent } from "./ProfileHeader";
import EmptyState from "./EmptyState";

export type ProfileProps = {
  userId?: Id<"users">;
  showBackButton: boolean;
};

const Profile: React.FC<ProfileProps> = ({ userId, showBackButton }) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <View className="flex-1 pt-12 bg-white">
      <FlatList
        data={[]}
        renderItem={() => <Text>This is renderItem</Text>}
        keyExtractor={(_, i) => String(i)}
        ListEmptyComponent={<EmptyState />}
        ListHeaderComponent={
          <ListHeaderComponent
            handleSignOut={handleSignOut}
            showBackButton={true}
          />
        }
      />
    </View>
  );
};

export default Profile;
