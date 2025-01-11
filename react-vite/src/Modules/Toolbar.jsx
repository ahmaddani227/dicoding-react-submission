const Toolbar = ({ onOpen, setQuery }) => {
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <section className="container flex flex-col justify-between gap-4 py-2 mt-5 md:items-center md:flex-row md:gap-0">
      <button
        onClick={onOpen}
        className="px-3 py-2 text-white bg-blue-500 rounded-md w-max"
      >
        Create Note
      </button>

      <input
        onChange={handleSearch}
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        className="w-full px-2 py-2 text-sm border rounded-md outline-none md:w-96"
      />
    </section>
  );
};

export default Toolbar;
