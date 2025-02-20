import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { MdOutlineMenuBook } from "react-icons/md";
import supabase from "../supabaseClient.jsx";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedNews, setSelectedNews] = useState(null); // State for selected news item
  const [imagesData, setImages] = useState([]); // Store image data in state

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
      setImages(data); // Store image data array correctly
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
      <div className="mb-10 p-5">
        {/* Responsive Carousel */}
        <div className="carousel w-full rounded overflow-hidden mb-8">
          {imagesData.length > 0 ? (
            imagesData.map((image, index) => (
              <div
                key={index}
                className={`carousel-item w-full ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                <img
                  src={image.picture}
                  className="w-full max-h-[calc(100vh-150px)] h-auto object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <p>Loading images...</p> // Fallback if images are still loading
          )}
        </div>

        <div className="divider my-5 text-black text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-center">
          News and Updates
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {newsData.map((news, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 overflow-hidden"
            >
              <figure className="w-full h-52">
                <img
                  src={news.picture}
                  className="w-full h-full object-cover"
                  alt="News"
                />
              </figure>
              <div className="p-5 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-gray-800">
                  {news.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">{news.summary}</p>
                <div className="flex justify-center mt-5">
                  <button
                    className="btn btn-neutral flex w-1/2 items-center justify-center gap-2 rounded-full"
                    onClick={() => handleReadMore(news)}
                  >
                    <MdOutlineMenuBook size={20} />
                    <span>Read More</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="modal modal-open">
              <div className="modal-box relative flex flex-col items-center">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-3 right-4 font-bold text-black"
                >
                  ✕
                </button>

                <h2 className="font-bold text-lg mb-3">
                  {selectedNews?.title}
                </h2>
                <img
                  src={selectedNews?.picture}
                  alt="Selected News"
                  className="w-full max-w-md h-auto object-cover mb-4 mx-auto"
                />
                <p className="break-words text-justify">{selectedNews?.body}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
