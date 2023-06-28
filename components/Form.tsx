"use client";

import Link from "next/link";

interface Ipost {
  tag: string;
  prompt: string;
}

type Props = {
  type: string;
  post: Ipost;
  submitting: boolean;
  setPost: Function;
  handleSubmit: React.FormEventHandler;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  return (
    <section className="w-full max-w-full flex items-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the wold and let your imagination
        run wild with an AI powered platform.
      </p>
      <form
        className="mt-10 max-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
        </label>
        <textarea
          className="form_textarea"
          value={post.prompt}
          placeholder="Write your prompt here..."
          onChange={(e) => {
            setPost((oldVal: Ipost) => ({ ...oldVal, prompt: e.target.value }));
          }}
          required
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#creativitiy, #sales, #development...)
            </span>
          </span>
        </label>
        <input
          className="form_input"
          value={post.tag}
          placeholder="#tag"
          onChange={(e) => {
            setPost((oldVal: Ipost) => ({ ...oldVal, tag: e.target.value }));
          }}
          required
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
