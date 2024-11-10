import Sidebar from "./Sidebar";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";
import { RiFileExcel2Fill } from "react-icons/ri";

const News = () => {
    const [newsData, setNewsData] = useState([]);

    const [announcements, setAnnouncements] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [showAddModal, setShowAddModal] = useState(false); 
    const [selectedNews, setSelectedNews] = useState(null);
    const [type, setType] = useState('');
    const [file, setFile] = useState("");

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [picture, setPicture] = useState('');

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
            console.error("Error during fetching news:", error.message);
        }
    };

    const handleSubmit = async () => {
        try {
          const { data } = await supabase
          .from(type)
          .insert([
            {
             title,
             body,
             picture,
            },
          ]);
          window.location.reload();
        } catch (error) {
          alert("Error Adding Fund");
        }
      };
    

    const handleReadMore = (news) => {
        setSelectedNews(news);
        console.log(news);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleAddCloseModal = () => setShowAddModal(false);

    const handleShowAddModalN = () => {
        setType('news');
        setShowAddModal(true);
    }

    const handleShowAddModalA = () => {
        setType('announcements')
        setShowAddModal(true);
    }

    const handleImage = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
          try {
            const filePath = `${selectedFile.name}`;
            const { data, error } = await supabase.storage
              .from("News")
              .upload(filePath, selectedFile);
            if (error) {
              throw error;
            }
            const { data: publicURL, error: urlError } = supabase.storage
              .from("News")
              .getPublicUrl(filePath);
            if (urlError) {
              throw urlError;
            }
            console.log("Image URL:", publicURL.publicUrl);
            setPicture(publicURL.publicUrl);
          } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image: " + error.message);
          }
        }
      };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-mono">
            <Sidebar />  
            <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First column */}
                    <div className="space-y-5">
                        <div className="flex justify-between mb-4">
                            <h1 className="lg:text-2xl font-extrabold">News Section</h1>
                            <button className="btn btn-primary" onClick={() => handleShowAddModalN()}>Add News</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {newsData.map((item) => (
                                <div key={item.id} className="card rounded shadow-lg p-4 bg-white">
                                    {item.picture && (
                                        <img 
                                        src={item.picture ? item.picture : "butuan.jpg"} 
                                        alt={item.title} 
                                        className="w-full h-48 object-cover rounded" 
                                      />
                                      
                                    )}
                                     <h2 className="text-l font-semibold mb-2">{item.title}</h2>
                                     <button className="btn btn-primary"  onClick={() => handleReadMore(item)}>Read More</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second column */}
                    <div className="space-y-5">
                        <div className="flex justify-between mb-4">
                            <h1 className="lg:text-2xl font-extrabold">Announcements Section</h1>
                            <button className="btn btn-primary" onClick={() => handleShowAddModalA()}>Add Announcements</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {announcements.map((item) => (
                                <div key={item.id} className="card rounded shadow-lg p-4 bg-white">
                                    {item.picture && (
                                        <img src={item.picture} alt={item.title} className="w-full h-48 object-cover rounded" />
                                    )}
                                    <h2 className="text-l font-semibold mb-2">{item.title}</h2>
                                    <button className="btn btn-primary"  onClick={() => handleReadMore(item)}>Read More</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="modal modal-open">
                        <div className="modal-box flex flex-col items-center">
                        <h2 className="font-bold text-lg">{selectedNews?.title}</h2>
                        <img src={selectedNews?.picture} alt="Selected News" className="w-80 h-80 object-cover mb-4 mx-auto" />
                        <p className="break-words text-justify">{selectedNews?.body}</p>
                        <div className="modal-action">
                            <button className="btn" onClick={handleCloseModal}>Close</button>
                        </div>
                        </div>
                    </div>
                    </div>        
                    )}

                    {showAddModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="modal modal-open">
                        <div className="modal-box flex flex-col">
                            <h1 className="text-2xl font-bold">Create a {type} Update</h1>
                    <div>
                    <div>
                    <label className="label">
                    <span className="label-text text-xl">
                       Cover Picture
                    </span>
                    </label>
                    <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImage}
                    />
                     {picture ? (
                    <p className="text-green-500 mt-2">
                    A picture has been selected.
                    </p>
                    ) : (
                        <p className="text-red-500 mt-2">
                        No image selected. 
                        </p>
                    )}
                    </div>
                            <label className="label">
                        <span className="label-text text-xl">Title</span>
                        </label>
                        <input
                        type="text"
                        placeholder="Enter title here..."
                        className="input input-bordered w-full"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                    <label className="label">
                        <span className="label-text text-xl">Body</span>
                    </label>
                    <textarea
                        placeholder="Enter body content here..."
                        className="textarea textarea-bordered w-full"
                        required
                        onChange={(e) => setBody(e.target.value)}
                    />
                    </div>
                                            <div className="modal-action">
                            <button className="btn" onClick={handleAddCloseModal}>Close</button>
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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
