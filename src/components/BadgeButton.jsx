const BadgeButton = ({ label = "View Badge", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 mt-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
    >
      {label}
    </button>
  );
};

export default BadgeButton;
