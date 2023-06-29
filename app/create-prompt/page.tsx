"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = JSON.stringify({
        prompt: post.prompt,
        // @ts-ignore
        userId: session?.user.id,
        tag: post.tag,
      });

      const res = await fetch("/api/prompt/new", {
        method: "POST",
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
