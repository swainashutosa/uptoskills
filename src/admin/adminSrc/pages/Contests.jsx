import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SectionTitle = ({ children }) => (
  <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-8 text-gray-700 tracking-tight">
    {children}
  </h1>
);

const Contests = () => {
  const navigate = useNavigate();

  const handleCreateContest = () => {
    navigate("/admin/create-contest");
  };

  return (
    <>
      <SectionTitle>Contests Management</SectionTitle>

      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl">
        <button
          onClick={handleCreateContest}
          className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg inline-flex items-center w-full sm:w-auto transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-300 text-sm sm:text-base"
        >
          <FaPlus className="mr-2 sm:mr-3 text-base sm:text-lg" /> Create New
          Contest
        </button>

        <div className="bg-white rounded-lg overflow-x-auto border border-gray-100">
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 border-b border-indigo-200">
                <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-indigo-800 uppercase tracking-wider">
                  Contest Name
                </th>
                <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-indigo-800 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-indigo-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 sm:p-4 font-bold text-xs sm:text-sm text-indigo-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 transition duration-150 ease-in-out hover:bg-yellow-50/50">
                <td className="p-3 sm:p-4 font-medium text-gray-700 text-sm">
                  Weekly Challenge 45
                </td>
                <td className="p-3 sm:p-4 text-gray-600 text-xs sm:text-sm">
                  2025-07-01 10:00 AM
                </td>
                <td className="p-3 sm:p-4">
                  <span className="text-green-700 font-bold bg-green-50/50 px-2 py-0.5 rounded-full text-center text-xs">
                    Ongoing
                  </span>
                </td>

                <td className="px-3 sm:px-4 py-3 align-middle">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 text-xs sm:text-sm focus:outline-none">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium transition duration-150 text-xs sm:text-sm focus:outline-none">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Contests;
