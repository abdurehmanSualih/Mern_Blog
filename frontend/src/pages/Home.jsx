import { useEffect, useState } from "react";
import Post from "./Post";
function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/post/");
        const data = await response.json();
        setPost(data.post);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {post.length > 0
        ? post.map((item) => <Post key={item._id} {...item} />)
        : null}
    </>
  );
}

export default Home;
