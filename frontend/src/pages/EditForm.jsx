import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

function EditForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching post with ID:", id);
        const response = await fetch(`http://localhost:8000/post/${id}`, {
          credentials: "include",
        });
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        try {
          const post = JSON.parse(text);
          setTitle(post.title || "");
          setSummary(post.summary || "");
          setDescription(post.description || "");
        } catch (Error) {
          throw new Error("Invalid JSON response from server");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error.message);
        setError(`Failed to load post: ${error.message}`);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleModelChange = (event) => {
    setDescription(event);
  };

  async function updatePost(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      console.log("Sending PUT request for post ID:", id);
      const response = await fetch(`http://localhost:8000/post/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      console.log("PUT response status:", response.status);
      if (response.ok) {
        setRedirect(true);
      } else {
        const text = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { error: "Invalid response from server" };
        }
        console.error(
          "Failed to update post:",
          JSON.stringify(errorData, null, 2)
        );
        setError(
          `Failed to update post: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={updatePost}
      className="flex justify-center items-start min-h-screen bg-gray-100 py-8 px-4 sm:px-6"
    >
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Edit Post
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Summary"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={loading}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={loading}
          />
          <div className="border border-gray-300 rounded-lg">
            <FroalaEditorComponent
              tag="textarea"
              model={description}
              onModelChange={handleModelChange}
              config={{
                placeholderText: "Edit your post content here...",
                toolbarButtons: [
                  "bold",
                  "italic",
                  "insertImage",
                  "|",
                  "undo",
                  "redo",
                ],
                imageUpload: true,
                heightMin: 200,
                heightMax: 400,
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditForm;
