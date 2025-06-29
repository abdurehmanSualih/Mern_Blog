import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetail() {
  const [postInfo, setPostInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(`http://localhost:8000/post/${id}`);
      const info = await response.json();
      setPostInfo(info);
    };
    fetchInfo();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md">
      
      
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        {postInfo.title || "Loading..."}
      </h1>
      <div className="flex flex-wrap gap-3 sm:gap-5 text-sm text-gray-500 mb-4">
        <span className="font-medium">
          {postInfo.author || "Unknown Author"}
        </span>
        <span>
          {postInfo.createdAt
            ? new Date(postInfo.createdAt).toLocaleDateString()
            : "Unknown Date"}
        </span>
        <Link
          to={`/edit/${id}`}
          className="ml-auto text-blue-500 hover:text-blue-600 font-medium transition-colors"
        >
          Edit Post
        </Link>
      </div>
      <div className="mb-6">
        {postInfo.image && (
          <img
            src={`http://localhost:8000${postInfo.image}`}
            alt={postInfo.title || "Post image"}
            className="w-full h-64 sm:h-96 object-cover rounded-lg"
          />
        )}
      </div>

      <div
        className="prose prose-sm sm:prose-base max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: postInfo.description || "" }}
      />
    </div>
  );
}

export default PostDetail;
