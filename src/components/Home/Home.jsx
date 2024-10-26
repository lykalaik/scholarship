import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { MdOutlineMenuBook } from "react-icons/md";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current slide
  const autoScrollInterval = 1500; // Time between each slide (in ms)

  const carouselImages = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
  ];

  const totalSlides = carouselImages.length;

  // Function to auto-scroll through the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides); // Loop back to first image
    }, autoScrollInterval);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [totalSlides]);

  // Real data about scholarships in the Philippines
  const scholarships = [
    {
      title: "CHED Scholarship Program",
      image:
        "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
      desc: "The Commission on Higher Education (CHED) offers scholarships for academically excellent students. CHED's scholarship program provides partial to full tuition coverage for undergraduate studies.",
      link: "https://ched.gov.ph/scholarships/",
    },
    {
      title: "DOST-SEI Undergraduate Scholarship",
      image:
        "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
      desc: "The Department of Science and Technology – Science Education Institute (DOST-SEI) provides scholarships for students pursuing science and technology courses. It covers tuition fees, book allowances, and stipends.",
      link: "https://sei.dost.gov.ph/",
    },
    {
      title: "Landbank Gawad Patnubay Scholarship",
      image:
        "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
      desc: "Landbank's Gawad Patnubay Scholarship Program supports deserving students pursuing agriculture-related courses. It provides tuition assistance, allowances, and mentoring opportunities.",
      link: "https://www.landbank.com/scholarship",
    },
    {
      title: "Megaworld Foundation Scholarship",
      image:
        "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
      desc: "Megaworld Foundation offers scholarships to students taking up any degree in its partner universities. The scholarship covers tuition, allowances, and career development opportunities.",
      link: "https://megaworldfoundation.com/scholarships",
    },
    {
      title: "SM Foundation College Scholarship",
      image:
        "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
      desc: "The SM Foundation provides financial aid to underprivileged students studying in fields like engineering, IT, and education. It covers tuition fees, monthly allowances, and employment opportunities within the SM group.",
      link: "https://www.sm-foundation.org/",
    },
    {
      title: "Ayala Foundation Educational Grants",
      image:
        "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp",
      desc: "Ayala Foundation offers educational grants to financially challenged students, providing assistance with tuition and educational resources. The grant also includes leadership training opportunities.",
      link: "https://www.ayalafoundation.org/",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto mb-10 p-5">
        {/* Carousel for scholarships */}
        <div className="carousel w-full rounded">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-item w-full ${
                index === currentIndex ? "block" : "hidden"
              }`} // Show the current slide, hide others
            >
              <img src={image} className="w-full" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex w-full justify-center gap-2 py-2 mb-8">
          {carouselImages.map((_, index) => (
            <a
              key={index}
              href={`#item${index + 1}`}
              className={`btn btn-xs ${
                index === currentIndex ? "btn-active" : ""
              }`}
              onClick={() => setCurrentIndex(index)} // Allow manual navigation
            >
              {index + 1}
            </a>
          ))}
        </div>

        {/* Cards with Scholarship Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="card card-side bg-base-100 shadow-xl p-2 border border-gray-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <figure>
                <img src={scholarship.image} alt="Scholarship" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">New article is released!</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
                    <MdOutlineMenuBook size={20} />
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
