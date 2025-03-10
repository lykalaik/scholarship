import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./Navbar.jsx";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import supabase from "../supabaseClient.jsx";
const LazyCarousel = lazy(() => import("./Carousel.jsx"));

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [imagesData, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetch_news(), fetch_newsimage()]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetch_news = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order('created_at', { ascending: false });
      
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

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section with Carousel */}
        <section className="rounded-xl overflow-hidden shadow-lg mb-12">
          <Suspense fallback={
            <div className="w-full h-96 bg-gray-200 animate-pulse flex items-center justify-center">
              <p className="text-gray-500">Loading carousel...</p>
            </div>
          }>
            <LazyCarousel imagesData={imagesData} />
          </Suspense>
        </section>

        {/* News Section Header */}
        <section className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <IoNewspaperOutline size={28} className="text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">News and Updates</h2>
          </div>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </section>

        {/* News Cards */}
        <section className="mb-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(item => (
                <div key={item} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                  <div className="w-full h-52 bg-gray-300"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.map((news, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden"
                >
                  <div className="relative">
                    <figure className="w-full h-56">
                      <img
                        src={news.picture}
                        className="w-full h-full object-cover"
                        alt={news.title}
                        loading="lazy"
                      />
                    </figure>
                    {news.created_at && (
                      <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium flex items-center gap-1">
                        <BsCalendarDate />
                        <span>{formatDate(news.created_at)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{news.summary}</p>
                    
                    <button
                      className="btn bg-blue-600 hover:bg-blue-700 text-white border-none flex items-center justify-center gap-2 rounded-full self-center px-6 transform transition-transform hover:scale-105"
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
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal with improved styling */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 p-4">
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="p-6">
              <h2 className="font-bold text-2xl text-gray-800 mb-4">
                {selectedNews?.title}
              </h2>
              
              {selectedNews?.created_at && (
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <BsCalendarDate />
                  <span>{formatDate(selectedNews.created_at)}</span>
                </div>
              )}
              
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedNews?.picture}
                  alt={selectedNews?.title}
                  className="w-full max-h-[400px] object-cover"
                />
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedNews?.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;