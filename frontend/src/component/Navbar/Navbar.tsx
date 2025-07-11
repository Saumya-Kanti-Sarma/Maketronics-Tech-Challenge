const Navbar = () => {
  return (
    <nav className="bg-blue-600 h-[60px] text-white px-4 py-0 flex gap-2  items-center justify-between shadow-md">
      <h1 className="text-xl font-bold  align-middle max-md:text-[14px]">Big Books</h1>

      <div className="flex flex-1 h-full max-w-[1200px] items-center gap-2 ">
        <input
          type="text"
          placeholder="Search..."
          className=" bg-white w-[90%] h-[90%] px-3 py-1 rounded-md text-black text-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 max-md:h-[70%] max-md:text-[16px]"
        />
        <button className="bg-white h-[90%] px-5 rounded-md hover:bg-blue-100 max-md:h-[70%]">
          <img src="/search.svg" alt="Search" className="w-4 h-4" />
        </button>
      </div>

      <ul className="flex justify-center sm:justify-end max-md:hidden">
        <li>
          <a
            href="https://github.com/Saumya-Kanti-Sarma/Maketronics-Tech-Challenge"
            target="_blank"
            className="text-white hover:underline text-sm sm:text-base"
          >
            Source code
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
