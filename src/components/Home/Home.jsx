import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./Navbar.jsx";
import { MdOutlineMenuBook } from "react-icons/md";
import supabase from "../supabaseClient.jsx";
const LazyCarousel = lazy(() => import("./Carousel.jsx"));

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [imagesData, setImages] = useState([]);

  useEffect(() => {
    fetch_news();
    fetch_newsimage();
  }, []);

  const fetch_news = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*");
      if (error) throw error;
      setNewsData(data);
    } catch (error) {
      console.error("Error fetching news:", error.message);
    }
  };

  const fetch_newsimage = async () => {
    try {
      const { data, error } = await supabase.from("news").select("picture");
      if (error) throw error;
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mb-10 p-5">
        {/* Lazy Load Carousel */}
        <Suspense fallback={<p>Loading carousel...</p>}>
          <LazyCarousel imagesData={imagesData} />
        </Suspense>

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
                    onClick={() => {
                      setSelectedNews(news);
                      setShowModal(true);
                    }}
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
                  onClick={() => setShowModal(false)}
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
