import Feed from "@components/Feed";

type Props = {};

const Home = (props: Props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-powered prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool which allows users to
        discover and share fun and interesting AI prompts!
      </p>

      <Feed />
    </section>
  );
};

export default Home;
