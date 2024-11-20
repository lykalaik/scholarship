import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { MdOutlineMenuBook } from "react-icons/md";
import supabase from "../supabaseClient.jsx";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedNews, setSelectedNews] = useState(null); // State for selected news item
  const [imagesData, setImages] = useState([]);  // Store image data in state

  const autoScrollInterval = 1500;

  useEffect(() => {
    fetch_news();
    fetch_newsimage();
  }, []);

  // Fetch news data
  const fetch_news = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*");
      if (error) throw error;
      setNewsData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error fetching news:", error.message);
    }
  };

  // Fetch image URLs for the carousel
  const fetch_newsimage = async () => {
    try {
      const { data, error } = await supabase.from("news").select("picture");
      if (error) throw error;
      setImages(data);  // Store image data array correctly
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error fetching images:", error.message);
    }
  };

  // Auto-scroll functionality for the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [imagesData.length]);

  // Modal handling for selected news
  const handleReadMore = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mb-10 p-5">
        <div className="carousel w-full rounded">
          {imagesData.length > 0 ? (
            imagesData.map((image, index) => (
              <div
                key={index}
                className={`carousel-item w-full ${index === currentIndex ? "block" : "hidden"}`}
              >
                <img src={image.picture} className="w-full h-64" alt={`Slide ${index + 1}`} />
              </div>
            ))
          ) : (
            <p>Loading images...</p> // Fallback if images are still loading
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsData.map((news, index) => (
            <div
              key={index}
              className="card card-side bg-base-100 shadow-xl p-2 border border-gray-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <figure className="w-40 h-full flex-shrink-0 ml-2">
                <img 
                  src={news.picture} 
                  className="w-full h-full object-cover ml-5"
                  alt="News" 
                />
              </figure>
              <div className="card-body flex items-start">
                <h2 className="card-title">{news.title}</h2>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary flex items-center"
                    onClick={() => handleReadMore(news)}
                  >
                    <MdOutlineMenuBook size={20} />
                    <span className="ml-2">Read More</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DaisyUI Modal Component */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="modal modal-open">
              <div className="modal-box flex flex-col items-center">
                <h2 className="font-bold text-lg">{selectedNews?.title}</h2>
                <img 
                  src={selectedNews?.picture} 
                  alt="Selected News" 
                  className="w-80 h-80 object-cover mb-4 mx-auto" 
                />
                <p className="break-words text-justify">{selectedNews?.body}</p>
                <div className="modal-action">
                  <button className="btn" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            </div>
          </div>        
        )}
      </div>
    </>
  );
};

export default Home;
