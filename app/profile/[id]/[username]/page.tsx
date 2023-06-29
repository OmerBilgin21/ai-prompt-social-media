"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";

interface paramObject {
  id: string;
  username: string;
}

interface IdynamicParams {
  params: paramObject;
}

const UserProfilePage = ({ params }: IdynamicParams) => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setposts(data);
    };

    if (params.id) fetchPosts();
  }, [params]);

  return (
    <Profile
      name={`${params.username}'s`}
      desc={`Welcome to ${params.username}'s profile page.`}
      data={posts}
    />
  );
};

export default UserProfilePage;
