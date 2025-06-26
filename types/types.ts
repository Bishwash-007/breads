import { Id } from "@/convex/_generated/dataModel";

export type ThreadComposerProps = {
  isPreview?: boolean;
  isReply?: boolean;
  threadId: Id<"messages">;
};
