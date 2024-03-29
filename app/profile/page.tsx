"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { Ipost } from "@interfaces/interfaces";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    // @ts-ignore
    if (session?.user.id) fetchPosts();
  }, [session]);

  const handleEdit = (post: Ipost) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: Ipost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id?.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter(
          (elem: Ipost, index: number) => elem._id !== post._id
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.log("== error ==", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized page!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
