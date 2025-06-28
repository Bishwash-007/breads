import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type Params = {
  biostring: string;
  linkstring: string;
  userId: string;
  imageUrl: string;
};

export function useEditProfileForm(params: Params) {
  const { biostring, linkstring, userId, imageUrl } = params;

  const [bio, setBio] = useState(biostring);
  const [link, setLink] = useState(linkstring);
  const [image, setImage] = useState(imageUrl);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const updateUser = useMutation(api.users.updateUser);

  const onDone = async () => {
    await updateUser({
      _id: userId as Id<"users">,
      bio,
      websiteUrl: link,
    });
  };

  const handleImagePicked = (uri: string) => {
    setNewImage(uri);
    setImage(uri);
  };

  return {
    bio,
    setBio,
    link,
    setLink,
    image,
    setImage,
    newImage,
    setNewImage,
    showModal,
    setShowModal,
    onDone,
    handleImagePicked,
  };
}
