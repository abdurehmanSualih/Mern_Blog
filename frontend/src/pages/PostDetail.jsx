import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";

function PostDetail() {
  const [postInfo, setPostInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch(`http://localhost:8000/post/${id}`);
      const info = await response.json();
      setPostInfo(info);
    };
    fetchInfo();
  }, [id]);

  const handleDelete = async () => {

    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:8000/post/${id}`, {
          method: "DELETE",
          headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        if (response.ok) {
          navigate("/home");
        } else {
          alert("Failed to delete the post.");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred while deleting the post.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        {postInfo.title}
      </h1>
      <div className="flex flex-wrap gap-3 sm:gap-5 text-sm text-gray-500 mb-4">
        <span className="font-medium">{postInfo?.user?.userName}</span>
        <span>
          {postInfo?.createdAt
            ? formatISO9075(new Date(postInfo.createdAt))
            : "No timestamp available"}
        </span>
        <div className="ml-auto flex gap-3">
          <Link
            to={`/edit/${id}`}
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Delete Post
          </button>
        </div>
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
