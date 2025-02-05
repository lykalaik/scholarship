import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-xl transition-all duration-300 border border-gray-300 hover:shadow-2xl">
                <figure className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src="butuan.png"
                      alt="City Education Development Department"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t to-transparent opacity-20"></div>
                </figure>
                <div className="card-body">
                  <h1 className="card-title text-3xl flex justify-center font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    City Government of Butuan
                  </h1>
                  <div className="space-y-4">
                    <div className="p-4 bg-base-200 rounded-lg">
                      <h2 className="text-xl font-semibold mb-2 text-base-content">
                        City Education Development Department
                      </h2>
                      <p className="text-base-content/70 italic">
                        City Library Bldg., J.P. Rosales Ave., Doongan, Butuan
                        City
                      </p>
                    </div>
                    <div className="divider before:bg-primary/20 after:bg-primary/20">
                      Contact Information
                    </div>
                    <div className="space-y-4 p-4 bg-base-200 rounded-lg">
                      <div className="space-y-3">
                        <div className="group hover:translate-x-1 transition-transform">
                          <p className="text-base-content/70">
                            <span className="font-semibold text-primary">
                              Phone:
                            </span>{" "}
                            (085) 225-6743
                          </p>
                        </div>
                        <div className="group hover:translate-x-1 transition-transform">
                          <a
                            href="mailto:cedd@butuan.gov.ph"
                            className="block link link-primary no-underline hover:underline"
                          >
                            <span className="font-semibold">Email: </span>
                            cedd@butuan.gov.ph
                          </a>
                        </div>
                        <div className="group hover:translate-x-1 transition-transform">
                          <a
                            href="http://www.butuan.gov.ph"
                            className="block link link-primary no-underline hover:underline"
                          >
                            <span className="font-semibold">Website: </span>
                            www.butuan.gov.ph
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-300 card bg-base-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="card-body">
                  <h2 className="card-title text-xl font-bold text-primary before:content-['★'] before:mr-2">
                    Vision
                  </h2>
                  <div className="p-4 bg-base-200 rounded-lg">
                    <p className="text-base-content/70 leading-relaxed">
                      Provide quality education service that will foster a
                      competitive, skilled, and efficient workforce to support
                      the development of Butuan
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 card bg-base-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="card-body">
                  <h2 className="card-title text-xl font-bold text-yellow-400 before:content-['◆'] before:mr-2">
                    Mission
                  </h2>
                  <div className="p-4 bg-base-200 rounded-lg">
                    <p className="text-base-content/70 leading-relaxed">
                      Involve, engage, and empower Butuanons to create a
                      community that will deliver substantial, inclusive and
                      sustainable quality of life for all. Committed to
                      providing communities with an alternative means of
                      acquiring lifelong learning to support innovators through
                      maker space, preserve and promote cultural heritage, and
                      provide targeted services and programs for capacity and
                      competency building.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 card bg-base-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="card-body">
                  <h2 className="card-title text-xl font-bold text-green-400 before:content-['■'] before:mr-2">
                    Mandate
                  </h2>
                  <div className="p-4 bg-base-200 rounded-lg">
                    <p className="text-base-content/70 leading-relaxed">
                      The City Education Development Department is mandated to
                      undertake operations in formulating, implementing, and
                      coordinating policies, plans, programs, and projects in
                      formal and non-formal education regardless of social
                      sectors and ages in support of basic education services,
                      sports development, and community well-being.
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
