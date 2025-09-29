const SectionTitle = ({ children }) => (
  <h1 className="text-3xl font-bold mb-6 text-gray-800">{children}</h1>
);

const GenericPage = ({ title }) => (
  <>
    <SectionTitle>{title}</SectionTitle>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p>UI for {title} will be here.</p>
    </div>
  </>
);

export default GenericPage;
