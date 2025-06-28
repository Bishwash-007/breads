import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export function useLikeToggle(messageId: Id<"messages">) {
  const toggleLike = useMutation(api.messages.toggleLike);
  const hasLiked = useQuery(api.messages.hasLiked, { messageId });

  const [likePending, setLikePending] = useState(false);

  const handleToggleLike = async () => {
    if (likePending) return;
    setLikePending(true);
    try {
      await toggleLike({ messageId });
    } catch (err) {
      console.error("Failed to toggle like:", err);
    } finally {
      setLikePending(false);
    }
  };

  return {
    hasLiked,
    handleToggleLike,
    likePending,
  };
}