import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  onClose,
  getAllNotes,
  showTokenMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || "");

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showTokenMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showTokenMessage("Note Update Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the Title");
      return;
    }

    if (!content) {
      setError("Please enter the Content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 relative flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {type === "edit" ? "Edit Note" : "Create New Note"}
        </h2>
        <button
          className=" text-white hover:text-indigo-200 transition-colors"
          onClick={onClose}
        >
          <MdClose className="text-2xl" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full text-xl text-gray-800 border-b-2 border-gray-200 focus:border-indigo-500 transition-colors duration-300 outline-none py-2"
            placeholder="Enter note title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            className="w-full text-gray-800 border-2 border-gray-200 rounded-lg focus:border-indigo-500 transition-colors duration-300 outline-none p-3 resize-none"
            placeholder="Enter note content"
            rows={4}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          className="w-fit bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 text-lg font-semibold"
          onClick={handleAddNote}
        >
          {type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </div>
  );
};
export default AddEditNotes;
