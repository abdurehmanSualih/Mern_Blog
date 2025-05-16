import image from '../assets/pexels.jpg';
function Post() {
  return (
    <div className="p-4 sm:flex  gap-4">
      <img src={image} alt="" className="sm:w-[50%]" />
      <div>
        <h2 className="text-2xl font-bold mb-5">
          How Chat Gpt And Other Ai Tools Can Transform Our World
        </h2>
        <div className="flex gap-5 text-sm mb-5">
          <span className="">name</span>
          <span>2023-01-07 11:03:14</span>
        </div>
        <p className="text-gray-700 ">
          AI tools like ChatGPT are revolutionizing the way we interact with
          technology and shaping the future across multiple industries. Here are
          some key ways they are transforming our world: ChatGPT, in particular,
          has played a major role in bringing generative AI into mainstream
          awareness, prompting businesses and individuals to explore its
          potential
        </p>
      </div>
    </div>
  );
}

export default Post;
