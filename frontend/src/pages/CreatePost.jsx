import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  console.log(title);
  console.log(summary);
  console.log(image);
  console.log(description);
  const handleModelChange = (event) => {
    setDescription(event);
  };

  return (
    <form className=" flex flex-col justify-center items-center h-lvh">
      <div className="flex flex-col bg-sky-100 p-6 gap-1 w-2xl rounded-2xl">
        <input
          type="text"
          placeholder="title"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="summery"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={(e) => setImage(e.target.value)}
        />
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
          }}
        />
        <button className="px-7 py-3 border bg-blue-400 rounded-2xl outline-0 text-amber-50 font-semibold">
          Create Post
        </button>
      </div>
    </form>
  );
}

export default CreatePost;
