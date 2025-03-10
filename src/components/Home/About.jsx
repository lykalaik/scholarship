import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
              About Our Department
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-base-content/80 max-w-2xl mx-auto">
              
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
            {/* Left Column - Department Info */}
            <div>
              <div className="card bg-base-100 shadow-xl transition-all duration-300 border border-primary/10 hover:shadow-primary/10 overflow-hidden">
                <figure className="relative">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src="butuan.png"
                      alt="City of Butuan"
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
                    <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
                      City Government of Butuan
                    </h2>
                  </div>
                </figure>
                
                <div className="card-body p-4 sm:p-6">
                  <h2 className="card-title text-lg sm:text-xl font-bold text-primary">
                    City Education Development Department
                  </h2>
                  <p className="text-base-content/70 italic mb-4 text-sm sm:text-base">
                    City Library Bldg., J.P. Rosales Ave., Doongan, Butuan City
                  </p>
                  
                  <div className="divider my-2 before:bg-primary/20 after:bg-primary/20">
                    Contact Information
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm sm:text-base">(085) 225-6743</span>
                    </div>
                    
                    <div className="flex items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:cedd@butuan.gov.ph" className="hover:text-primary transition-colors text-sm sm:text-base truncate">
                        cedd@butuan.gov.ph
                      </a>
                    </div>
                    
                    <div className="flex items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href="http://www.butuan.gov.ph" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-sm sm:text-base truncate">
                        www.butuan.gov.ph
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Vision, Mission, Mandate */}
            <div className="space-y-6 sm:space-y-8">
              {/* Vision Card */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl border-l-4 border-primary transition-all duration-300">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h2 className="card-title text-xl sm:text-2xl font-bold text-primary">Vision</h2>
                  </div>
                  <div className="bg-primary/5 p-4 sm:p-5 rounded-lg">
                    <p className="text-base-content/80 leading-relaxed italic text-sm sm:text-base">
                      "Provide quality education service that will foster a competitive, skilled, and efficient workforce to support the development of Butuan"
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mission Card */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl border-l-4 border-yellow-400 transition-all duration-300">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-400/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="card-title text-xl sm:text-2xl font-bold text-yellow-400">Mission</h2>
                  </div>
                  <div className="bg-yellow-400/5 p-4 sm:p-5 rounded-lg">
                    <p className="text-base-content/80 leading-relaxed text-sm sm:text-base">
                      Involve, engage, and empower Butuanons to create a community that will deliver substantial, inclusive and sustainable quality of life for all. Committed to providing communities with an alternative means of acquiring lifelong learning to support innovators through maker space, preserve and promote cultural heritage, and provide targeted services and programs for capacity and competency building.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mandate Card */}
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl border-l-4 border-green-400 transition-all duration-300">
                <div className="card-body p-4 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-400/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="card-title text-xl sm:text-2xl font-bold text-green-400">Mandate</h2>
                  </div>
                  <div className="bg-green-400/5 p-4 sm:p-5 rounded-lg">
                    <p className="text-base-content/80 leading-relaxed text-sm sm:text-base">
                      The City Education Development Department is mandated to undertake operations in formulating, implementing, and coordinating policies, plans, programs, and projects in formal and non-formal education regardless of social sectors and ages in support of basic education services, sports development, and community well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;