import { useState } from "react";
import Sidebar from "./Sidebar";
import ScholarStatusChart from "./ScholarStatusChart";
import GenderDistributionChart from "./GenderDistributionChart";
import ScholarshipTypeChart from "./ScholarshipTypeChart";
import ByStatusAndCategory from "./ByStatusAndCategory";
import ByStatusAndGender from "./ByStatusAndGender";
import ApplicantsByGenderandCategory from "./ApplicantsByGenderandCategory";
import ApplicantsByStatusAndCategory from "./ApplicantsByStatusAndCategory";

const Tabs = () => {
  const tabs = [
    { name: "Scholars", component: <ScholarsTab /> },
    { name: "Applicants", component: <ApplicantsTab /> },
    { name: "FOF", component: <FOFTab /> },
    { name: "SOF", component: <SOFTab /> },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 ml-0 lg:ml-64 transition-all duration-300 overflow-hidden">
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <div className="flex flex-col lg:flex-row justify-between border-b sticky top-0 bg-white z-10">
            <div className="flex">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 text-lg font-bold transition-colors ${
                    activeTab === index
                      ? "border-b-4 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="flex space-x-4">
              <select className="px-6 py-3 text-lg">
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
              </select>
              <select className="px-6 py-3 text-lg">
                <option value="year 1">2024-2025</option>
                <option value="year 2">2023-2024</option>
              </select>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-6 overflow-y-auto max-h-[calc(100vh-160px)]">
            {tabs[activeTab].component}
          </div>
        </div>
      </main>
    </div>
  );
};

// Scholars Tab Component
const ScholarsTab = () => (
  <div>
    <div className="mb-6">
      <ScholarStatusChart />
    </div>
    <div className="mb-6">
      <GenderDistributionChart />
    </div>
    <div className="mb-6">
      <ScholarshipTypeChart />
    </div>
    <div className="mb-6">
      <ByStatusAndCategory />
    </div>
    <div className="mb-6">
      <ByStatusAndGender />
    </div>
  </div>
);
const ApplicantsTab = () => (
  <div>
    <div className="mb-6">
      <ApplicantsByGenderandCategory />
    </div>
    <div className="mb-6">
      <ApplicantsByStatusAndCategory />
    </div>
  </div>
);
const FOFTab = () => <div>FOF Content</div>;
const SOFTab = () => <div>SOF Content</div>;

export default Tabs;
