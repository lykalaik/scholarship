import Sidebar from "./Sidebar";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState("news");

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    fetch_news();
    fetch_announcements();
  }, []);

  const fetch_news = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*");
      if (error) throw error;
      setNewsData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching news:", error.message);
    }
  };

  const fetch_announcements = async () => {
    try {
      const { data, error } = await supabase.from("announcements").select("*");
      if (error) throw error;
      setAnnouncements(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching announcements:", error.message);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleEditItem = (item, tabType) => {
    setSelectedItem(item);
    setTitle(item.title);
    setBody(item.body);
    setPicture(item.picture);
    setType(tabType);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const tableName = type === "news" ? "news" : "announcements";
      const { error } = await supabase
        .from(tableName)
        .update({
          title,
          body,
          picture,
        })
        .eq("id", selectedItem.id);

      if (error) throw error;

      alert(
        `${type === "news" ? "News" : "Announcement"} updated successfully!`
      );
      setShowModal(false);
      type === "news" ? fetch_news() : fetch_announcements();
    } catch (error) {
      console.error("Error updating data:", error.message);
      alert("An error occurred while saving the updates.");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowAddModal = (tabType) => {
    setType(tabType);
    setTitle("");
    setBody("");
    setPicture("");
    setShowAddModal(true);
  };

  const handleAddSubmit = async () => {
    try {
      const submittedPicture = picture?.trim()
        ? picture
        : "https://obscdhexpvekqdutdiiy.supabase.co/storage/v1/object/public/Applicant_Storage/butuan.png";

      const { error } = await supabase.from(type).insert([
        {
          title,
          body,
          picture: submittedPicture,
        },
      ]);
      if (error) throw error;

      alert(`${type === "news" ? "News" : "Announcement"} added successfully!`);
      setShowAddModal(false);
      type === "news" ? fetch_news() : fetch_announcements();
    } catch (error) {
      alert("Error adding data");
      console.error("Error adding data:", error.message);
    }
  };

  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("News")
          .upload(filePath, selectedFile);
        if (error) throw error;

        const { data: publicURL, error: urlError } = supabase.storage
          .from("News")
          .getPublicUrl(filePath);
        if (urlError) throw urlError;

        setPicture(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const confirmDelete = (item, tabType) => {
    setSelectedItem(item);
    setType(tabType);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const tableName = type === "news" ? "news" : "announcements";
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("id", selectedItem.id);

      if (error) throw error;

      alert(
        `${type === "news" ? "News" : "Announcement"} deleted successfully!`
      );
      setShowConfirmDeleteModal(false);
      type === "news" ? fetch_news() : fetch_announcements();
    } catch (error) {
      console.error("Error deleting data:", error.message);
      alert("An error occurred while deleting the item.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-inter">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex justify-start border-b border-gray-300">
            <button
              className={`px-4 py-2 font-bold ${
                activeTab === "news"
                  ? "border-b-2 border-neutral text-neutral"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabSwitch("news")}
            >
              News
            </button>
            <button
              className={`px-4 py-2 font-bold ${
                activeTab === "announcements"
                  ? "border-b-2 border-neutral text-neutral"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabSwitch("announcements")}
            >
              Announcements
            </button>
          </div>

          {activeTab === "news" ? (
            <div>
              <div className="flex justify-between mb-4">
                <h1 className="lg:text-2xl font-extrabold mt-2">
                  News Section
                </h1>
                <button
                  className="btn btn-neutral"
                  onClick={() => handleShowAddModal("news")}
                >
                  Add News
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {newsData.map((item) => (
                  <div
                    key={item.id}
                    className="card rounded shadow-lg p-4 bg-white"
                  >
                    {item.picture && (
                      <img
                        src={item.picture}
                        alt={item.title}
                        className="w-full h-52 object-cover rounded"
                      />
                    )}
                    <h2 className="text-l font-semibold mb-2">{item.title}</h2>
                    <div className="divider"></div>
                    <div className="flex justify-center">
                      <button
                        className="btn btn-error text-white btn-sm mr-2"
                        onClick={() => confirmDelete(item, "news")}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-neutral btn-sm w-1/4"
                        onClick={() => handleEditItem(item, "news")}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-4">
                <h1 className="lg:text-2xl font-extrabold mt-2">
                  Announcements Section
                </h1>
                <button
                  className="btn btn-neutral"
                  onClick={() => handleShowAddModal("announcements")}
                >
                  Add Announcement
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="card rounded shadow-lg p-4 bg-white"
                  >
                    {item.picture && (
                      <img
                        src={item.picture}
                        alt={item.title}
                        className="w-full h-52 object-cover rounded"
                      />
                    )}
                    <h2 className="text-l font-semibold mb-2">{item.title}</h2>
                    <div className="divider"></div>
                    <div className="flex justify-center">
                      <button
                        className="btn btn-error text-white btn-sm mr-2"
                        onClick={() => confirmDelete(item, "announcements")}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-neutral btn-sm w-1/4"
                        onClick={() => handleEditItem(item, "announcements")}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="modal modal-open">
                <div className="modal-box flex flex-col">
                  <h1 className="text-2xl font-bold">
                    Edit {type === "news" ? "News" : "Announcement"}
                  </h1>
                  <label className="label">
                    <span className="label-text text-xl">Cover Picture</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImage}
                  />
                  <label className="label">
                    <span className="label-text text-xl">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    className="input input-bordered w-full"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="label">
                    <span className="label-text text-xl">Body</span>
                  </label>
                  <textarea
                    value={body}
                    className="textarea textarea-bordered w-full"
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <div className="modal-action">
                    <button className="btn" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="modal modal-open">
                <div className="modal-box flex flex-col">
                  <h1 className="text-2xl font-bold">
                    Add {type === "news" ? "News" : "Announcement"}
                  </h1>
                  <label className="label">
                    <span className="label-text text-xl">Cover Picture</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImage}
                  />
                  <label className="label">
                    <span className="label-text text-xl">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    className="input input-bordered w-full"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="label">
                    <span className="label-text text-xl">Body</span>
                  </label>
                  <textarea
                    value={body}
                    className="textarea textarea-bordered w-full"
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <div className="modal-action">
                    <button
                      className="btn"
                      onClick={() => setShowAddModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-neutral"
                      onClick={handleAddSubmit}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showConfirmDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="modal modal-open">
                <div className="modal-box">
                  <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                  <p>
                    Are you sure you want to delete this{" "}
                    {type === "news" ? "news" : "announcement"}?
                  </p>
                  <div className="modal-action">
                    <button
                      className="btn"
                      onClick={() => setShowConfirmDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default News;
