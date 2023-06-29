"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { Ipost } from "@interfaces/interfaces";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data: Ipost = await res.json();

      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return `Prompt with id: ${promptId} not found!`;

    try {
      const formData = JSON.stringify({
        prompt: post.prompt,
        tag: post.tag,
      });

      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) router.push("/");
    } catch (error) {
      console.log("== error ==", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
