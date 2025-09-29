import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SectionTitle = ({ children }) => (
  <h1 className="text-3xl font-bold mb-6 text-gray-800">{children}</h1>
);

const Contests = () => {
  const navigate = useNavigate();

  const handleCreateContest = () => {
    navigate("/admin/create-contest");
  };

  return (
    <>
      <SectionTitle>Contests Management</SectionTitle>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={handleCreateContest}
          className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaPlus className="mr-2" /> Create New Contest
        </button>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 font-semibold">Contest Name</th>
                <th className="p-4 font-semibold">Start Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">Weekly Challenge 45</td>
                <td className="p-4">2025-07-01 10:00 AM</td>
                <td className="p-4 text-green-600 font-semibold">Ongoing</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
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
