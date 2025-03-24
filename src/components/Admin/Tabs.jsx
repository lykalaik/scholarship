import { useState } from "react";
import Sidebar from "./Sidebar";
import ScholarStatusChart from "./ScholarStatusChart";
import GenderDistributionChart from "./GenderDistributionChart";
import ScholarshipTypeChart from "./ScholarshipTypeChart";
import ByStatusAndCategory from "./ByStatusAndCategory";
import ByStatusAndGender from "./ByStatusAndGender";
import ApplicantsByGenderandCategory from "./ApplicantsByGenderandCategory";
import ApplicantsByStatusAndCategory from "./ApplicantsByStatusAndCategory";
import TotalCountPerBrgy from "./TotalCountPerBrgy";
import TotalCountFundsPerSchool from "./TotalCountFundsPerSchool";
import TotalCountFundsPerStudent from "./TotalCountFundsPerStudent";
import TotalCountFundsPerSemester from "./TotalCountFundsPerSemester";

const Tabs = () => {
  const tabs = [
    { name: "Scholars", component: (props) => <ScholarsTab {...props} /> },
    { name: "Applicants", component: (props) => <ApplicantsTab {...props} /> },
    { name: "FOF", component: (props) => <FOFTab {...props} /> },
    { name: "SOF", component: (props) => <SOFTab {...props} /> },
  ];

const [semester, setSemester] = useState("1st Sem");
const [year, setYear] = useState("2025-2026");
const [appliedSemester, setAppliedSemester] = useState(semester);
const [appliedYear, setAppliedYear] = useState(year);
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

            {activeTab !== 3 && (
  <div className="flex space-x-4">
    <select 
      className="px-6 py-3 text-lg border rounded"
      value={semester}
      onChange={(e) => setSemester(e.target.value)}
    >
      <option value="1st Sem">1st Semester</option>
      <option value="2nd Sem">2nd Semester</option>
    </select>

    <select 
      className="px-6 py-3 text-lg border rounded"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    >
      <option value="2025-2026">2025-2026</option>
      <option value="2024-2025">2024-2025</option>
      <option value="2023-2024">2023-2024</option>
    </select>

    <button 
      className="px-6 py-3 text-lg bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={() => {
        setAppliedSemester(semester);
        setAppliedYear(year);
      }}
    >
      Apply
    </button>
  </div>
)}

          </div>

          {/* Content Section */}
          <div className="mt-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {tabs[activeTab].component({ semester: appliedSemester, year: appliedYear })}
          </div>
        </div>
      </main>
    </div>
  );
};

// Scholars Tab Component
const ScholarsTab = ({ semester, year }) => (
  <div>
    <div className="mb-6">
      <ScholarStatusChart semester={semester} year={year}/>
    </div>
    <div className="mb-6">
      <GenderDistributionChart semester={semester} year={year} />
    </div>
    <div className="mb-6">
      <ScholarshipTypeChart semester={semester} year={year} />
    </div>
    <div className="mb-6">
      <ByStatusAndCategory semester={semester} year={year} />
    </div>
    <div className="mb-6">
      <ByStatusAndGender  semester={semester} year={year}/>
    </div>
  </div>
);
const ApplicantsTab = ({ semester, year }) => (
  <div>
    <div className="mb-6">
      <ApplicantsByGenderandCategory semester={semester} year={year} />
    </div>
    <div className="mb-6">
      <ApplicantsByStatusAndCategory semester={semester} year={year} />
    </div>
    <div className="mb-6">
      <TotalCountPerBrgy semester={semester} year={year} />
    </div>
  </div>
);
const FOFTab = ({ semester, year }) => (
  <div>
    <div className="mb-6">
      <TotalCountFundsPerSchool semester={semester} year={year}/>
    </div>
    <div className="mb-6">
      <TotalCountFundsPerStudent semester={semester} year={year}/>
    </div>
  </div>
);
const SOFTab = ({ semester, year }) => (
  <div className="mb-6">
    <TotalCountFundsPerSemester semester={semester} year={year} />
  </div>
);

export default Tabs;
