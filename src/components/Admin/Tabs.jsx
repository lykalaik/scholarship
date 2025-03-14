import { useState } from "react";
import Sidebar from "./Sidebar";
import ScholarStatusChart from "./ScholarStatusChart";
import GenderDistributionChart from "./GenderDistributionChart";
import ScholarshipTypeChart from "./ScholarshipTypeChart";

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
      <main className="flex-1 p-8 lg:p-12 ml-0 lg:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <div className="flex border-b">
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
          <div className="mt-6">{tabs[activeTab].component}</div>
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
  </div>
);

// Placeholder Components for Other Tabs
const ApplicantsTab = () => <div>Applicants Content</div>;
const FOFTab = () => <div>FOF Content</div>;
const SOFTab = () => <div>SOF Content</div>;

export default Tabs;
