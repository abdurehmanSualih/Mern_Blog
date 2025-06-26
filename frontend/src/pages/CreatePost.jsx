import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleModelChange = (event) => {
    setDescription(event);
  };

  async function createPost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8000/post/", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={createPost}
      className="flex justify-center items-start min-h-screen bg-gray-100 py-8 px-4 sm:px-6"
    >
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="border border-gray-300 rounded-lg">
            <FroalaEditorComponent
              tag="textarea"
              model={description}
              onModelChange={handleModelChange}
              config={{
                placeholderText: "Write your post content here...",
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
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
