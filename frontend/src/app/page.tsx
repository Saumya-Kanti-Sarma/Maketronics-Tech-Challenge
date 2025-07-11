'use client';

import { useState } from 'react';

export default function HomePage() {
  const [search, setSearch] = useState(''); //stores search values
  const [clickedAsideBtn, setclickedAsidebtn] = useState(false); // Checks if aside Btn is clicked
  const handleAside = () => setclickedAsidebtn((prev) => !prev)
  const suggestions = [
    "Java Books",
    "Python Books",
    "Java books Under 2000",
    "JavaScript Books"
  ];

  const filtered = suggestions.filter(item =>
    item.toLowerCase().includes(search.toLowerCase()) && search.length > 0
  );

  return (
    <div className={`bg-[#202120] w-full h-[100dvh] flex justify-center items-center relative`}>
      <div className={`absolute left-1 top-1 transision duration-220 ease-in-out  ${clickedAsideBtn ? 'left-[220px]' : ''}`}>
        <button
          className={`bg-transparent border-none cursor-pointer opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100 `}
          onClick={handleAside}
        >
          <img
            src="/menu.svg"
            alt="menu-btn"
            className={`w-[30px] aspect-square transition-transform duration-300 ease-in-out
        ${clickedAsideBtn ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
      <aside
        className={` absolute h-full bg-[#0e0e0e67] transition-all duration-300 ease-in-out overflow-hidden z-100 w-[220px]
  ${clickedAsideBtn ? "left-[0]" : "left-[-220px]"}`}
      >
      </aside>

      <section className={`flex-1 h-full flex flex-col justify-center gap-[10vh] items-center`}>

        {/* Title */}
        <div className="flex flex-col w-full gap-3 justify-center items-center">
          <h1 className="text-6xl font-bold text-white text-center
          max-lg:text-5xl max-md:text-3xl max-sm:text-[18px]
          ">
            Welcome to Universal <b className="text-[#ee6868] underline underline-offset-9 decoration-3">Book Search</b>
          </h1>
          <p className="text-2xl text-white text-center
          max-lg:text-[18px] max-md:text-[16px] max-sm:text-[14px]
          ">Get access to 1000+ books across variety of topics</p>
        </div>

        {/* Input Area */}
        <div className="w-[98%] max-w-[1200px] relative mb-20">
          {/* Input */}
          <input
            type="text"
            name="searchbox"
            id="search-bar"
            placeholder="Search any books"
            className="bg-[#303131] h-[80px] w-full rounded-3xl border-none text-white pl-5 text-[18px] outline-none"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Search Button */}
          <button className="absolute border-none right-[3%] h-full bg-transparent">
            <img src="/search.svg" alt="search" id="search-img"
              className="w-[25px] aspect-square object-cover invert-100" />
          </button>

          {/* Suggestions */}
          {
            filtered.length > 0 && (
              <div className="w-[98%] max-w-[1200px] absolute left-2 top-[88px] z-10" style={{ display: filtered[0] == search ? "none" : "" }}>
                <ul className="text-[#ffffff94] w-full">
                  {
                    filtered.map((item, index) => (
                      <li
                        key={index}
                        className="border-[1px] border-transparent px-5 py-3 w-full rounded-[4px] opacity-60
                        transition duration-220 hover:bg-[#ffffff04] hover:border-[#ffffff2f] hover:opacity-100"
                        onClick={() => setSearch(item)}
                      >
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
}
