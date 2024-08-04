import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNoteImg from "../../assets/images/add-note.svg";
import NoDataImg from "../../assets/images/no-data.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showTokenMsg, setShowTokenMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEdit = (noteDetails) => {
    if (!isLoggedIn) {
      alert("Please log in to edit notes.");
      return;
    }
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showTokenMessage = (message, type) => {
    setShowTokenMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowTokenMsg({
      isShown: false,
      message: "",
    });
  };

  // Get user Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
      }
    }
  };

  const getAllNotes = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Delete Notes
  const deleteNote = async (data) => {
    if (!isLoggedIn) {
      alert("Please log in to delete notes.");
      return;
    }
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showTokenMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Search For Notes
  const onSearchNotes = async (query) => {
    if (!isLoggedIn) return;
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    if (!isLoggedIn) {
      alert("Please log in to pin notes.");
      return;
    }
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );
      if (response.data && response.data.note) {
        showTokenMessage("Note Update Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const handleAddNote = () => {
    if (!isLoggedIn) {
      alert("Please log in to add notes.");
      return;
    }
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getAllNotes();
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-white shadow">
        <Navbar
          userInfo={userInfo}
          onSearchNotes={onSearchNotes}
          handleClearSearch={handleClearSearch}
        />
      </div>

      <main className="container mx-auto px-4 py-5">
        {isLoggedIn ? (
          allNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allNotes.map((item) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updateIsPinned(item)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-fit">
              <EmptyCard
                imgSrc={isSearch ? NoDataImg : AddNoteImg}
                message={
                  isSearch
                    ? `Oops! No notes found matching your search.`
                    : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
                }
              />
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-fit">
            <EmptyCard
              imgSrc={AddNoteImg}
              message="Welcome! Please log in to view and manage your notes."
            />
          </div>
        )}
      </main>

      <button
        className="fixed right-6 bottom-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
        onClick={handleAddNote}
      >
        <MdAdd className="text-3xl" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "55%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0",
            border: "none",
            borderRadius: "0.5rem",
            maxWidth: "90%",
            width: "600px",
          },
        }}
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showTokenMessage={showTokenMessage}
        />
      </Modal>

      <Toast
        isShown={showTokenMsg.isShown}
        message={showTokenMsg.message}
        type={showTokenMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
