const InputField = ({ icon: Icon, label, id, type = "text", value, onChange }) => (
<div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-gray-500" />
      </span>
      <input type={type} id={id} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" value={value} onChange={onChange} />
    </div>
  </div>
);

export default InputField;