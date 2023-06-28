"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PromptCard from "./PromptCard";

import {
  Ipost,
  IpostCreator,
  PromptCardListType,
} from "@interfaces/interfaces";

const PromptCardList = ({
  data,
  handleTagClick,
  handleUserProfile,
}: PromptCardListType) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Ipost, i: number) => (
        <PromptCard
          key={i}
          post={post}
          handleTagClick={handleTagClick}
          handleUserProfile={handleUserProfile}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (elem: Ipost) =>
          elem.prompt.includes(searchText) ||
          elem.tag.includes(searchText) ||
          elem.creator.username.includes(searchText)
      )
    );
  }, [searchText, posts]);

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  const handleUserProfile = (user: IpostCreator) => {
    router.push(`profile/${user._id}/${user.username}`);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex items-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
        handleUserProfile={handleUserProfile}
      />
    </section>
  );
};

export default Feed;
