const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">ZenSpace</h1>
      <div className="flex items-center gap-3">
        <button className=" text-gray-500 hover:text-gray-800 transition">
          🌓
        </button>
        <img
          src="src/assets/Profile-image.jpg"
          alt="Profile-Image"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
